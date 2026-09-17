import { AnimatePresence, motion } from "framer-motion"
import Icon from "@/components/ui/icon"

interface ExitIntentPopupProps {
  visible: boolean
  onClose: () => void
  name: string
  setName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  sending: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function ExitIntentPopup({ visible, onClose, name, setName, phone, setPhone, sending, onSubmit }: ExitIntentPopupProps) {
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
            className="relative w-full max-w-md bg-gray-900 border border-orange-500/30 rounded-3xl p-8 shadow-2xl"
          >
            <button onClick={onClose} aria-label="Закрыть"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
              <Icon name="X" size={16} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-1.5 text-orange-400 text-sm mb-4">
                <Icon name="Percent" size={14} />
                Скидка до 20% по промокоду «ЯНДЕКС»
              </div>
              <h3 className="text-2xl font-bold mb-2">Уже уходите?</h3>
              <p className="text-gray-400 text-sm">Оставьте телефон — посчитаем стоимость и дадим скидку до 20% по промокоду «ЯНДЕКС».</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
                className="w-full bg-gray-950 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none placeholder:text-gray-500 focus:border-orange-500" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel"
                className="w-full bg-gray-950 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none placeholder:text-gray-500 focus:border-orange-500" />
              <button type="submit" disabled={sending}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
                {sending ? "Отправляем..." : "Получить скидку"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}