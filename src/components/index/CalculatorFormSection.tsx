import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

export const TARIFFS: Record<string, number> = {
  "Газель (до 1,5 т)": 1400,
  "Газель усиленная (до 2,5 т)": 1800,
}

interface CalculatorFormSectionProps {
  name: string
  setName: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  details: string
  setDetails: (v: string) => void
  sending: boolean
  carType: string
  setCarType: (v: string) => void
  hours: number
  setHours: (v: number) => void
  movers: number
  setMovers: (v: number) => void
  estimated: number
  onOrderCalc: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function CalculatorFormSection({
  name, setName, phone, setPhone, details, setDetails, sending,
  carType, setCarType, hours, setHours, movers, setMovers, estimated, onOrderCalc, onSubmit,
}: CalculatorFormSectionProps) {
  const carTypeRef = useRef<HTMLSelectElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const moversRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const elements = [carTypeRef.current, hoursRef.current, moversRef.current].filter(Boolean) as HTMLElement[]
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.scrollBy(0, e.deltaY)
    }
    elements.forEach((el) => el.addEventListener("wheel", handleWheel, { passive: false }))
    return () => elements.forEach((el) => el.removeEventListener("wheel", handleWheel))
  }, [])

  return (
    <section id="zayavka" className="py-14 px-6 scroll-mt-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Калькулятор */}
        <motion.div id="calculyator" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-8 scroll-mt-20">
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
          </div>

          <button onClick={onOrderCalc} disabled={sending}
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-60">
            Заказать по этой цене
          </button>
        </motion.div>

        {/* Форма заявки */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-2">Оставить заявку</h3>
          <p className="text-white/80 text-sm mb-6">Перезвоним за 5 минут и всё рассчитаем</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
              className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel"
              className="w-full bg-white/95 text-gray-900 rounded-xl px-4 py-3 outline-none placeholder:text-gray-500" />
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Что перевезти, откуда и куда" rows={3}
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
      </div>
    </section>
  )
}