import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const services = [
  { icon: "Home", title: "Квартирные переезды", desc: "Упакуем, перевезём и расставим мебель на новом месте" },
  { icon: "Building2", title: "Офисные переезды", desc: "Быстро перевезём офис без остановки бизнеса" },
  { icon: "Package", title: "Доставка грузов", desc: "Доставим любой груз по Уфе" },
  { icon: "Users", title: "Грузчики и рабочие", desc: "Аккуратная погрузка, сборка мебели, демонтаж и подсобные работы" },
  { icon: "Truck", title: "Грузоперевозки", desc: "Газели и грузовики до 2,5 тонн по городу" },
  { icon: "Trash2", title: "Вывоз строительного мусора", desc: "Вывезем строительный мусор и хлам с погрузкой и утилизацией" },
]

const guarantees = [
  { icon: "ShieldCheck", title: "Груз в сохранности", desc: "Упаковываем, крепим и страхуем — каждая вещь доедет целой. Несём материальную ответственность" },
  { icon: "CalendarCheck", title: "Приедем вовремя", desc: "Подача от 20 минут по Уфе. Опаздываем — сообщим заранее, не исчезаем" },
  { icon: "FileText", title: "Всё официально", desc: "Договор, акты, закрывающие документы. Работаем с физлицами и юрлицами" },
  { icon: "Headphones", title: "На связи 24/7", desc: "Звоните, пишите в любое время — ответим и поможем с любым вопросом по заказу" },
  { icon: "Settings2", title: "Решаем попутные задачи", desc: "Нужно разобрать мебель, поднять на этаж или вывезти мусор? Сделаем всё за один выезд" },
  { icon: "CreditCard", title: "Удобная оплата", desc: "Наличные, карта, онлайн, безнал для юрлиц — без предоплаты и скрытых доплат" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

export function ServicesSection() {
  return (
    <section id="uslugi" className="py-14 px-6 max-w-6xl mx-auto scroll-mt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">Наши <span className="text-orange-500">услуги</span></h2>
        <p className="text-gray-400">Всё что нужно для переезда и доставки — в одном месте</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.a href="#zayavka" key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="relative block bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-orange-500/50 hover:bg-gray-900/80 transition-all group overflow-hidden">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 shrink-0 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <Icon name={s.icon} size={20} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{s.desc}</p>
            <span className="absolute bottom-3 right-4 flex items-center gap-1 text-orange-500 font-semibold text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              Заказать
              <Icon name="ArrowRight" size={14} />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export function GuaranteesSection() {
  return (
    <section id="cennost" className="py-14 px-6 bg-gray-900/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
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
  )
}