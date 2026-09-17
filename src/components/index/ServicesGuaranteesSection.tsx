import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const services = [
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/6bd14e6a-c443-49b0-ad39-86eb1737286c.jpg", title: "Квартирные переезды", desc: "Упакуем, перевезём и расставим мебель на новом месте", price: "от 2 800 ₽" },
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/3300c9c1-e164-4746-86ad-d568e2ea08bf.jpg", title: "Офисные переезды", desc: "Быстро перевезём офис без остановки бизнеса", price: "от 3 600 ₽" },
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/98206348-b168-4966-a033-c2eaef539334.jpg", title: "Доставка грузов", desc: "Доставим любой груз по Уфе", price: "от 1 400 ₽" },
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/8a969e0f-d07c-4cf1-8d94-24beecdca66f.jpg", title: "Грузчики и рабочие", desc: "Аккуратная погрузка, сборка мебели, демонтаж и подсобные работы", price: "от 600 ₽/ч" },
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/851a2e6c-d9b9-441a-82c0-283f78257d47.jpg", title: "Грузоперевозки", desc: "Газели и грузовики до 2,5 тонн по городу", price: "от 1 400 ₽/ч" },
  { image: "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/892f1afa-466a-4432-aeb2-309771b835a2.jpg", title: "Вывоз строительного мусора", desc: "Вывезем строительный мусор и хлам с погрузкой и утилизацией", price: "от 2 500 ₽" },
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
            className="relative block rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all group h-64">
            <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-950/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <span className="text-orange-400 font-bold text-sm shrink-0 ml-2">{s.price}</span>
              </div>
              <p className="text-gray-300 text-sm">{s.desc}</p>
            </div>

            <div className="absolute inset-0 bg-orange-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-2 text-white font-bold text-lg">
                <Icon name="ArrowRight" size={22} />
                Заказать
              </span>
            </div>
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