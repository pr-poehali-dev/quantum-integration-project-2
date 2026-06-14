import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Truck" size={20} className="text-orange-500" />
            <span className="font-semibold">ГрузМастер</span>
          </Link>
          <Link to="/" className="text-sm text-orange-500 hover:underline flex items-center gap-1">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Политика конфиденциальности</h1>
        <p className="text-gray-400 text-sm">Дата последнего обновления: 15.06.2026</p>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">1. Общие положения</h2>
          <p>
            Настоящая Политика конфиденциальности персональных данных (далее — Политика)
            действует в отношении всей информации, которую сайт «ГрузМастер» (далее — Сайт)
            может получить о Пользователе во время использования Сайта и его сервисов.
            Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ
            «О персональных данных».
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">2. Состав персональных данных</h2>
          <p>
            При отправке заявки на Сайте Пользователь предоставляет следующие данные:
            имя, номер телефона, тип услуги и описание заказа. Эти данные используются
            исключительно для обработки заявки и связи с Пользователем.
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">3. Цели обработки данных</h2>
          <p>
            Персональные данные обрабатываются с целью: связи с Пользователем для уточнения
            деталей заказа, расчёта стоимости услуг, выполнения договорных обязательств
            по перевозке и доставке грузов.
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">4. Согласие на обработку</h2>
          <p>
            Нажимая кнопку «Отправить заявку», Пользователь даёт своё согласие на обработку
            персональных данных в соответствии с настоящей Политикой и ФЗ от 27.07.2006 №152-ФЗ.
            Согласие действует с момента отправки заявки и до момента его отзыва.
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">5. Защита и хранение данных</h2>
          <p>
            Мы принимаем необходимые организационные и технические меры для защиты
            персональных данных от неправомерного доступа, уничтожения, изменения,
            блокирования, копирования и распространения. Данные не передаются третьим
            лицам, за исключением случаев, предусмотренных законодательством РФ.
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">6. Права пользователя</h2>
          <p>
            Пользователь вправе в любой момент отозвать согласие на обработку персональных
            данных, направив соответствующий запрос по контактному телефону{" "}
            <a href="tel:+79177775020" className="text-orange-500 hover:underline">+7 917 777-50-20</a>.
          </p>
        </section>

        <section className="space-y-3 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-semibold text-white">7. Контакты</h2>
          <p>
            По всем вопросам, связанным с обработкой персональных данных, Вы можете
            обратиться по телефону{" "}
            <a href="tel:+79177775020" className="text-orange-500 hover:underline">+7 917 777-50-20</a>.
          </p>
        </section>

        <div className="pt-6">
          <Link to="/" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105">
            <Icon name="ArrowLeft" size={18} />
            Вернуться на главную
          </Link>
        </div>
      </main>
    </div>
  )
}
