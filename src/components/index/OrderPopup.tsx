import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"

interface OrderPopupProps {
  visible: boolean
  onClose: () => void
  name: string
  setName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  details: string
  setDetails: (v: string) => void
  sending: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function OrderPopup({ visible, onClose, name, setName, phone, setPhone, details, setDetails, sending, onSubmit }: OrderPopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl"
          >
            <button onClick={onClose} aria-label="Закрыть"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors">
              <Icon name="X" size={16} className="text-white" />
            </button>

            <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
            <p className="text-white/80 text-sm mb-6">Перезвоним за 5 минут и всё рассчитаем</p>

            <form onSubmit={onSubmit} className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel"
                className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Что перевезти, откуда и куда (необязательно)" rows={3}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}