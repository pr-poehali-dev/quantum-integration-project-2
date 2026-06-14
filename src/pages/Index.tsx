import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast"

const REQUESTS_URL = "https://functions.poehali.dev/4e286ec5-b1c9-4760-bd3d-7b601766e226"

const heroImage = "https://avatars.mds.yandex.net/get-autoru-vos/5484094/845675ce00bd3d4fc0ec773ff6b8da23/1200x900"

const services = [
  { icon: "Home", title: "Квартирные переезды", desc: "Упакуем, перевезём и расставим мебель на новом месте" },
  { icon: "Building2", title: "Офисные переезды", desc: "Быстро перевезём офис без остановки бизнеса" },
  { icon: "Package", title: "Доставка грузов", desc: "Доставим любой груз по Уфе и всей России" },
  { icon: "Users", title: "Грузчики и рабочие", desc: "Аккуратная погрузка, сборка мебели, демонтаж и подсобные работы" },
  { icon: "Truck", title: "Грузоперевозки", desc: "Газели и грузовики до 2,5 тонн по городу и России" },
  { icon: "Trash2", title: "Вывоз строительного мусора", desc: "Вывезем строительный мусор и хлам с погрузкой и утилизацией" },
]

const advantages = [
  { icon: "Clock", value: "60 мин", label: "Подача автомобиля" },
  { icon: "Shield", value: "100%", label: "Сохранность груза" },
  { icon: "ThumbsUp", value: "12 лет", label: "На рынке" },
  { icon: "Star", value: "6000+", label: "Выполненных заказов" },
]

const guarantees = [
  { icon: "ShieldCheck", title: "Груз в сохранности", desc: "Упаковываем, крепим и страхуем — каждая вещь доедет целой. Несём материальную ответственность" },
  { icon: "CalendarCheck", title: "Приедем вовремя", desc: "Подача за 60 минут по Уфе. Опаздываем — сообщим заранее, не исчезаем" },
  { icon: "FileText", title: "Всё официально", desc: "Договор, акты, закрывающие документы. Работаем с физлицами и юрлицами" },
  { icon: "Headphones", title: "На связи 24/7", desc: "Звоните, пишите в любое время — ответим и поможем с любым вопросом по заказу" },
  { icon: "Settings2", title: "Решаем попутные задачи", desc: "Нужно разобрать мебель, поднять на этаж или вывезти мусор? Сделаем всё за один выезд" },
  { icon: "CreditCard", title: "Удобная оплата", desc: "Наличные, карта, онлайн, безнал для юрлиц — без предоплаты и скрытых доплат" },
]

const TARIFFS: Record<string, number> = {
  "Газель (до 1,5 т)": 1400,
  "Газель усиленная (до 2,5 т)": 1800,
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

export default function Index() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("Квартирный переезд")
  const [details, setDetails] = useState("")
  const [sending, setSending] = useState(false)

  // Калькулятор
  const [carType, setCarType] = useState("Газель (до 1,5 т)")
  const [hours, setHours] = useState(2)
  const [movers, setMovers] = useState(0)
  const moverRate = 600
  const estimated = TARIFFS[carType] * hours + movers * moverRate * hours

  // Плавающая кнопка "Позвонить": вверху на калькуляторе, внизу — везде
  const calcRef = useRef<HTMLElement | null>(null)
  const [callTop, setCallTop] = useState(false)
  useEffect(() => {
    const el = calcRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setCallTop(entry.isIntersecting),
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Заполните имя и телефон", variant: "destructive" })
      return
    }
    setSending(true)
    try {
      const res = await fetch(REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, details }),
      })
      if (!res.ok) throw new Error()
      toast({ title: "Заявка отправлена!", description: "Перезвоним вам в ближайшее время" })
      setName(""); setPhone(""); setDetails("")
    } catch {
      toast({ title: "Ошибка отправки", description: "Позвоните нам напрямую", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  const orderCalc = async () => {
    if (!phone.trim()) {
      toast({ title: "Укажите телефон в форме ниже", description: "Чтобы мы могли с вами связаться" })
      document.getElementById("zayavka")?.scrollIntoView({ behavior: "smooth" })
      return
    }
    setSending(true)
    try {
      await fetch(REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Расчёт с сайта",
          phone,
          service: `Расчёт: ${carType}`,
          details: `${hours} ч, грузчиков: ${movers}`,
          estimated_price: `${estimated} ₽`,
        }),
      })
      toast({ title: "Заявка на расчёт отправлена!", description: `Примерно ${estimated} ₽ — уточним детали по телефону` })
    } catch {
      toast({ title: "Ошибка отправки", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/85 via-gray-950/60 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2 text-orange-400 text-sm mb-6"
          >
            <Icon name="Zap" size={14} />
            Подача за 60 минут по Уфе
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            Груз<span className="text-orange-500">Мастер</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-light"
          >
            Профессионалы дела
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-gray-400 mb-10 max-w-xl mx-auto"
          >
            Переезды · Доставка · Грузчики · Подсобные рабочие · Вывоз мусора<br />По Уфе, Башкортостану и всей России
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#zayavka"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              <Icon name="Calculator" size={20} />
              Рассчитать стоимость
            </a>
            <div className="flex justify-center gap-4">
              <a href="https://wa.me/79177775020" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white p-4 rounded-full transition-all hover:scale-105">
                <Icon name="MessageCircle" size={24} />
              </a>
              <a href="https://t.me/+79177775020" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white p-4 rounded-full transition-all hover:scale-105">
                <Icon name="Send" size={24} />
              </a>
              <a href="https://max.ru/u/79177775020" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-500 text-white p-4 rounded-full transition-all hover:scale-105">
                <Icon name="MessageSquare" size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Icon name="ChevronDown" size={28} className="text-orange-500 animate-bounce" />
        </motion.div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {advantages.map((a, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Icon name={a.icon} size={28} className="mx-auto mb-2 text-white/80" />
              <div className="text-3xl font-bold text-white">{a.value}</div>
              <div className="text-white/80 text-sm mt-1">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">Наши <span className="text-orange-500">услуги</span></h2>
          <p className="text-gray-400">Всё что нужно для переезда и доставки — в одном месте</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-orange-500/50 hover:bg-gray-900/80 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 shrink-0 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <Icon name={s.icon} size={20} className="text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">Почему с нами <span className="text-orange-500">работают</span></h2>
            <p className="text-gray-400">12 лет на рынке — знаем, что важно клиенту</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 shrink-0 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Icon name={g.icon} size={20} className="text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{g.title}</h3>
                </div>
                <p className="text-gray-400 text-sm">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR + FORM */}
      <section id="zayavka" ref={calcRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Калькулятор */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Calculator" size={24} className="text-orange-500" /> Калькулятор стоимости
            </h3>

            <label className="block text-sm text-gray-400 mb-2">Тип автомобиля</label>
            <select value={carType} onChange={(e) => setCarType(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 mb-5 text-white focus:border-orange-500 outline-none">
              {Object.keys(TARIFFS).map((t) => <option key={t}>{t}</option>)}
            </select>

            <label className="block text-sm text-gray-400 mb-2">Время работы: {hours} ч <span className="text-gray-500">(минимум 2 ч)</span></label>
            <input type="range" min={2} max={10} value={hours} onChange={(e) => setHours(+e.target.value)}
              className="w-full mb-5 accent-orange-500" />

            <label className="block text-sm text-gray-400 mb-2">Грузчиков: {movers}</label>
            <input type="range" min={0} max={5} value={movers} onChange={(e) => setMovers(+e.target.value)}
              className="w-full mb-6 accent-orange-500" />

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 text-center mb-5">
              <div className="text-gray-400 text-sm mb-1">Примерная стоимость</div>
              <div className="text-3xl font-bold text-orange-500">{estimated.toLocaleString("ru")} ₽</div>
            </div>

            <button onClick={orderCalc} disabled={sending}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
              Заказать по этой цене
            </button>
          </motion.div>

          {/* Форма заявки */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
            <p className="text-white/80 text-sm mb-6">Перезвоним за 5 минут и всё рассчитаем</p>

            <form onSubmit={submit} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel"
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
              <select value={service} onChange={(e) => setService(e.target.value)}
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none">
                <option>Квартирный переезд</option>
                <option>Офисный переезд</option>
                <option>Доставка груза</option>
                <option>Грузчики и подсобные рабочие</option>
                <option>Грузоперевозка по России</option>
                <option>Вывоз строительного мусора</option>
              </select>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Что перевезти, откуда и куда" rows={3}
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500 resize-none" />
              <button type="submit" disabled={sending}
                className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
              <p className="text-xs text-white/70 text-center leading-relaxed">
                Нажимая кнопку «Отправить заявку», Вы даёте согласие на обработку персональных данных согласно{" "}
                <Link to="/privacy" className="underline hover:text-white">Политике конфиденциальности</Link>. ФЗ от 27.07.2006 №152-ФЗ
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 text-gray-400 text-sm px-6 pt-12 pb-28 md:pb-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Icon name="Truck" size={24} className="text-orange-500" />
            <span className="text-white font-semibold text-lg">ГрузМастер</span>
          </button>
          <p className="text-orange-500 mb-6">Профессионалы дела</p>

          <div className="space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Icon name="MapPin" size={16} className="text-orange-500" />
              <span>г. Уфа, Республика Башкортостан</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={16} className="text-orange-500" />
              <a href="tel:+79177775020" className="hover:text-orange-500">+7 917 777-50-20</a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={16} className="text-orange-500" />
              <a href="mailto:support@gruzufa.ru" className="hover:text-orange-500">support@gruzufa.ru</a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Clock" size={16} className="text-orange-500" />
              <span>Ежедневно, круглосуточно</span>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          © 2014–2026 ГрузМастер · Все права защищены |{" "}
          <Link to="/privacy" className="hover:text-orange-500 hover:underline">Политика конфиденциальности</Link>
        </div>
      </footer>

      {/* FLOATING CALL BUTTON — перемещается наверх на калькуляторе */}
      <a href="tel:+79177775020"
        className={`fixed left-4 right-4 md:left-auto md:right-6 md:w-auto z-50 flex items-center justify-center gap-2 text-white font-semibold py-4 md:px-7 rounded-full shadow-lg transition-all duration-500 ${callTop ? "top-4 bg-black/40 backdrop-blur-md border border-white/20 shadow-black/30" : "bottom-4 md:bottom-6 bg-orange-500 hover:bg-orange-400 shadow-orange-500/40"}`}>
        <Icon name="Phone" size={20} />
        Позвонить +7 917 777-50-20
      </a>
    </div>
  )
}