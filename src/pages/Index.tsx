import { useState } from "react"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast"

const REQUESTS_URL = "https://functions.poehali.dev/4e286ec5-b1c9-4760-bd3d-7b601766e226"

const heroImage = "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/832f0d4d-737b-4e36-83c7-f2eaf8ef0100.jpg"

const services = [
  { icon: "Home", title: "Квартирные переезды", desc: "Упакуем, перевезём и расставим мебель на новом месте" },
  { icon: "Building2", title: "Офисные переезды", desc: "Быстро перевезём офис без остановки бизнеса" },
  { icon: "Package", title: "Доставка грузов", desc: "Доставим любой груз по Уфе и всей России" },
  { icon: "Users", title: "Грузчики", desc: "Профессиональные грузчики — аккуратно и быстро" },
  { icon: "Hammer", title: "Разнорабочие", desc: "Сборка мебели, демонтаж, подсобные работы" },
  { icon: "Truck", title: "Грузоперевозки", desc: "Газели и грузовики до 2,5 тонн по городу и России" },
]

const advantages = [
  { icon: "Clock", value: "60 мин", label: "Подача автомобиля" },
  { icon: "Shield", value: "100%", label: "Сохранность груза" },
  { icon: "ThumbsUp", value: "5 лет", label: "На рынке Уфы" },
  { icon: "Star", value: "500+", label: "Довольных клиентов" },
]

const guarantees = [
  { icon: "ShieldCheck", title: "Гарантия сохранности", desc: "Бережно упакуем и довезём ваш груз в целости — отвечаем за каждую вещь" },
  { icon: "FileText", title: "Работаем по договору", desc: "Официальный договор и закрывающие документы для физлиц и компаний" },
  { icon: "CreditCard", title: "Оплата любым способом", desc: "Наличные, карта, перевод, безнал для юрлиц — как вам удобно" },
]

const TARIFFS: Record<string, number> = {
  "Газель (до 1,5 т)": 1400,
  "Газель (до 2,5 т)": 1800,
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
            Переезды · Доставка · Грузчики · Разнорабочие<br />По Уфе, Башкортостану и всей России
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
              <a href="tel:+79177775020" className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full transition-all hover:scale-105">
                <Icon name="Phone" size={24} />
              </a>
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
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-gray-900/80 transition-all group">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Icon name={s.icon} size={24} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-3">Почему нам <span className="text-orange-500">доверяют</span></h2>
            <p className="text-gray-400">Работаем честно и без скрытых доплат</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-gray-950 border border-gray-800 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon name={g.icon} size={28} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{g.title}</h3>
                <p className="text-gray-400 text-sm">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR + FORM */}
      <section id="zayavka" className="py-20 px-6">
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
                <option>Грузчики</option>
                <option>Разнорабочие</option>
                <option>Грузоперевозка по России</option>
              </select>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Что перевезти, откуда и куда" rows={3}
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500 resize-none" />
              <button type="submit" disabled={sending}
                className="w-full bg-gray-950 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
                {sending ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm px-6 pb-28 md:pb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon name="Truck" size={18} className="text-orange-500" />
          <span className="text-white font-semibold">ГрузМастер</span>
        </div>
        <p>Уфа и вся Россия · <a href="tel:+79177775020" className="text-orange-500 hover:underline">+7 917 777-50-20</a></p>
      </footer>

      {/* FIXED MOBILE CALL BUTTON */}
      <a href="tel:+79177775020"
        className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-4 rounded-full shadow-lg shadow-orange-500/40">
        <Icon name="Phone" size={20} />
        Позвонить +7 917 777-50-20
      </a>
    </div>
  )
}