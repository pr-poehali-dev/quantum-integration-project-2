import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export const TARIFFS: Record<string, number> = {
  "Газель (до 1,5 т)": 1400,
  "Газель усиленная (до 2,5 т)": 1800,
}

interface CalculatorPopupProps {
  visible: boolean
  onClose: () => void
  carType: string
  setCarType: (v: string) => void
  hours: number
  setHours: (v: number) => void
  movers: number
  setMovers: (v: number) => void
  estimated: number
  sending: boolean
  onOrderCalc: () => void
}

export default function CalculatorPopup({
  visible, onClose, carType, setCarType, hours, setHours, movers, setMovers, estimated, sending, onOrderCalc,
}: CalculatorPopupProps) {
  const carTypeRef = useRef<HTMLSelectElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const moversRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!visible) return
    const elements = [carTypeRef.current, hoursRef.current, moversRef.current].filter(Boolean) as HTMLElement[]
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
    }
    elements.forEach((el) => el.addEventListener("wheel", handleWheel, { passive: false }))
    return () => elements.forEach((el) => el.removeEventListener("wheel", handleWheel))
  }, [visible])

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
            className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <button onClick={onClose} aria-label="Закрыть"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
              <Icon name="X" size={16} />
            </button>

            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Calculator" size={24} className="text-orange-500" /> Калькулятор стоимости
            </h3>

            <label className="block text-sm text-gray-400 mb-2">Тип автомобиля</label>
            <select ref={carTypeRef} value={carType} onChange={(e) => setCarType(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 mb-5 text-white focus:border-orange-500 outline-none">
              {Object.keys(TARIFFS).map((t) => <option key={t}>{t}</option>)}
            </select>

            <label className="block text-sm text-gray-400 mb-2">Время работы: {hours} ч <span className="text-gray-500">(минимум 2 ч)</span></label>
            <input ref={hoursRef} type="range" min={2} max={10} value={hours} onChange={(e) => setHours(+e.target.value)}
              className="w-full mb-5 accent-orange-500" />

            <label className="block text-sm text-gray-400 mb-2">Грузчиков: {movers}</label>
            <input ref={moversRef} type="range" min={0} max={5} value={movers} onChange={(e) => setMovers(+e.target.value)}
              className="w-full mb-6 accent-orange-500" />

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5 text-center mb-5">
              <div className="text-gray-400 text-sm mb-1">Примерная стоимость</div>
              <div className="text-3xl font-bold text-orange-500">{estimated.toLocaleString("ru")} ₽</div>
              <div className="text-gray-500 text-xs mt-1">Без учёта скидок и промокодов</div>
            </div>

            <button onClick={onOrderCalc} disabled={sending}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
              {sending ? "Отправляем..." : "Заказать по этой цене"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}