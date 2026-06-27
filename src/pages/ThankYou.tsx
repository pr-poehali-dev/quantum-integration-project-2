import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircle" size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Заявка принята!</h1>
        <p className="text-gray-400 mb-2">Наш менеджер свяжется с вами в ближайшее время.</p>
        <p className="text-gray-400 mb-8">Если нужно срочно — позвоните нам напрямую:</p>
        <a
          href="tel:+79177775020"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-full transition mb-4"
        >
          <Icon name="Phone" size={20} />
          +7 917 777-50-20
        </a>
        <div className="mt-6">
          <Link to="/" className="text-gray-400 hover:text-orange-500 transition text-sm underline underline-offset-4">
            Вернуться на главную
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
