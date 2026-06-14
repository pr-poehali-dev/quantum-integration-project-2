import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const heroImage = "https://cdn.poehali.dev/projects/8f085890-d695-4439-aeb7-e47a3f336429/files/9c205f0f-f3bf-40ff-ac9d-1d66e15455c3.jpg"

const services = [
  { icon: "Home", title: "Квартирные переезды", desc: "Упакуем, перевезём и расставим мебель на новом месте" },
  { icon: "Building2", title: "Офисные переезды", desc: "Быстро перевезём офис без остановки бизнеса" },
  { icon: "Package", title: "Доставка грузов", desc: "Доставим любой груз по Уфе и всей России" },
  { icon: "Users", title: "Грузчики", desc: "Профессиональные грузчики — аккуратно и быстро" },
  { icon: "Hammer", title: "Разнорабочие", desc: "Сборка мебели, демонтаж, подсобные работы" },
  { icon: "Truck", title: "Грузоперевозки", desc: "Газели и грузовики до 2,5 тонн по городу и России" },
]

const advantages = [
  { icon: "Clock", value: "30 мин", label: "Подача автомобиля" },
  { icon: "Shield", value: "100%", label: "Сохранность груза" },
  { icon: "ThumbsUp", value: "5 лет", label: "На рынке Уфы" },
  { icon: "Star", value: "500+", label: "Довольных клиентов" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-2 text-orange-400 text-sm mb-6"
          >
            <Icon name="Zap" size={14} />
            Подача за 30 минут по Уфе
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
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="tel:+79177775020"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              <Icon name="Phone" size={20} />
              +7 917 777-50-20
            </a>
            <a
              href="https://wa.me/79177775020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white p-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
            >
              <Icon name="MessageCircle" size={24} />
            </a>
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
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Icon name={a.icon} size={28} className="mx-auto mb-2 text-white/80" />
              <div className="text-3xl font-bold text-white">{a.value}</div>
              <div className="text-white/80 text-sm mt-1">{a.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold mb-3">Наши <span className="text-orange-500">услуги</span></h2>
          <p className="text-gray-400">Всё что нужно для переезда и доставки — в одном месте</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-gray-900/80 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Icon name={s.icon} size={24} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы к переезду?</h2>
          <p className="text-white/80 mb-8 text-lg">Звоните — подадим машину уже через 30 минут</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+79177775020"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Icon name="Phone" size={20} />
              Позвонить
            </a>
            <a
              href="https://wa.me/79177775020"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white p-4 rounded-full transition-all hover:scale-105"
            >
              <Icon name="MessageCircle" size={24} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon name="Truck" size={18} className="text-orange-500" />
          <span className="text-white font-semibold">ГрузМастер</span>
        </div>
        <p>Уфа и вся Россия · <a href="tel:+79177775020" className="text-orange-500 hover:underline">+7 917 777-50-20</a></p>
      </footer>
    </div>
  )
}