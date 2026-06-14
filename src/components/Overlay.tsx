import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export default function Overlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute top-8 left-0 right-0 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex items-center gap-2 text-white"
        >
          <Icon name="Truck" size={28} />
          <span className="font-sans text-2xl md:text-3xl font-light tracking-wide">
            ГрузМастер
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-3 text-sm md:text-base text-white/70 font-light max-w-md"
        >
          Переезды · Доставка · Грузчики · Разнорабочие · Грузоперевозки по Уфе и всей России
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-5 flex flex-wrap justify-center gap-3 md:hidden"
        >
          <a
            href="tel:+79177775020"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            <Icon name="Phone" size={18} />
            Позвонить
          </a>
          <a
            href="https://wa.me/79177775020"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-green-500 px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            <Icon name="MessageCircle" size={18} />
            WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/70 text-sm">
          <span className="flex items-center gap-2"><Icon name="Clock" size={16} /> Подача 30 минут</span>
          <span className="flex items-center gap-2"><Icon name="Users" size={16} /> Грузчики и разнорабочие</span>
          <span className="flex items-center gap-2"><Icon name="MapPin" size={16} /> По городу и всей России</span>
        </div>
        <div className="hidden md:flex flex-wrap justify-center gap-3">
          <a
            href="tel:+79177775020"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            <Icon name="Phone" size={18} />
            Позвонить
          </a>
          <a
            href="https://wa.me/79177775020"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-green-500 px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            <Icon name="MessageCircle" size={18} />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}