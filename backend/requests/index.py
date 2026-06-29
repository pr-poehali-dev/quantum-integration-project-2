import json
import os
import smtplib
import urllib.request
import urllib.parse
import psycopg2
from email.mime.text import MIMEText


def handler(event: dict, context) -> dict:
    '''
    Принимает заявки на грузоперевозки с лендинга ГрузМастер.
    Сохраняет в базу данных, отправляет уведомление на email и в Telegram (если настроен).
    '''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    service = (body.get('service') or '').strip()
    details = (body.get('details') or '').strip()
    estimated_price = (body.get('estimated_price') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO requests (name, phone, service, details, estimated_price) "
        "VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (name, phone, service, details, estimated_price),
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    smtp_password = os.environ.get('YANDEX_SMTP_PASSWORD')
    if smtp_password:
        try:
            from_email = 'wertonj@yandex.ru'
            to_email = 'wertonj@yandex.ru'
            subject = f'Новая заявка ГрузМастер #{request_id}'
            text = (
                f'Новая заявка #{request_id}\n\n'
                f'Имя: {name}\n'
                f'Телефон: {phone}\n'
                f'Услуга: {service or "—"}\n'
                f'Расчёт: {estimated_price or "—"}\n'
                f'Детали: {details or "—"}'
            )
            msg = MIMEText(text, 'plain', 'utf-8')
            msg['Subject'] = subject
            msg['From'] = from_email
            msg['To'] = to_email

            with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as smtp:
                smtp.login(from_email, smtp_password)
                smtp.sendmail(from_email, to_email, msg.as_string())
        except Exception:
            pass

    token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    if token and chat_id:
        text = (
            f"🚚 Новая заявка ГрузМастер #{request_id}\n\n"
            f"👤 Имя: {name}\n"
            f"📞 Телефон: {phone}\n"
            f"🛠 Услуга: {service or '—'}\n"
            f"💰 Расчёт: {estimated_price or '—'}\n"
            f"📝 Детали: {details or '—'}"
        )
        try:
            url = f"https://api.telegram.org/bot{token}/sendMessage"
            data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
            urllib.request.urlopen(urllib.request.Request(url, data=data), timeout=5)
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'id': request_id}),
    }
