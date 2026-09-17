import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const heroImageMobile = "https://avatars.mds.yandex.net/get-autoru-vos/5484094/845675ce00bd3d4fc0ec773ff6b8da23/456x342"
const heroImageDesktop = "https://avatars.mds.yandex.net/get-autoru-vos/5484094/845675ce00bd3d4fc0ec773ff6b8da23/1200x900"

const advantages = [
  { icon: "Shield", value: "100%", label: "Сохранность груза" },
  { icon: "ThumbsUp", value: "12 лет", label: "На рынке" },
  { icon: "Star", value: "6136", label: "Выполненных заказов" },
  { icon: "Handshake", value: "Без", label: "Посредников" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

interface HeroSectionProps {
  onOpenCalculator: () => void
}

export default function HeroSection({ onOpenCalculator }: HeroSectionProps) {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-gray-950/70 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <Icon name="Truck" size={22} className="text-orange-500" />
          <span className="font-semibold text-lg">Груз<span className="text-orange-500">Мастер</span></span>
        </div>
        <a href="tel:+79177775020"
          onClick={() => { if (typeof ym !== 'undefined') ym(110197782, 'reachGoal', 'phone_click') }}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all">
          <Icon name="Phone" size={16} />
          <span className="hidden sm:inline">+7 917 777-50-20</span>
          <span className="sm:hidden">Позвонить</span>
        </a>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${heroImageMobile})` }}
        />
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url(${heroImageDesktop})` }}
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
            Подача от 20 минут по Уфе
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            Груз<span className="text-orange-500">Мастер</span>
            <span className="sr-only"> — грузоперевозки, переезды и грузчики в Уфе</span>
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
            Газель · Грузчики · Переезды · Доставка · Вывоз мусора<br />По Уфе и Башкортостану
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onOpenCalculator}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
            >
              <Icon name="Calculator" size={20} />
              Рассчитать стоимость
            </button>
            <a href="https://max.ru/u/f9LHodD0cOKus7gIRSgKjl8vNAd8EQDi-Lk7lDShgN2n2qeq-sLJprZ_HHA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-4 rounded-full transition-all hover:scale-105 font-semibold">
              <Icon name="MessageSquare" size={22} />
              Написать в Макс
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
      <section className="py-10 bg-orange-500">
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
    </>
  )
}