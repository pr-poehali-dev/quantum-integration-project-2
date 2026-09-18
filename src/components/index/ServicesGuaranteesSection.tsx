import { useEffect, useRef, useState } from "react"
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

interface ServicesSectionProps {
  onOpenOrder: () => void
}

interface ServiceCardProps {
  s: { icon: string; title: string; desc: string }
  i: number
  onOpenOrder: () => void
}

function ServiceCard({ s, i, onOpenOrder }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCentered, setIsCentered] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsCentered(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div ref={cardRef} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      className="flex flex-col bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-orange-500/50 transition-colors group overflow-hidden">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 shrink-0 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
          <Icon name={s.icon} size={20} className="text-orange-500" />
        </div>
        <h3 className="text-lg font-semibold">{s.title}</h3>
      </div>
      <p className="text-gray-400 text-sm flex-1">{s.desc}</p>
      <button onClick={onOpenOrder}
        className={`flex items-center justify-end gap-1 text-orange-500 hover:text-orange-400 font-semibold text-sm mt-3 transition-opacity md:opacity-0 md:group-hover:opacity-100 ${isCentered ? "opacity-100" : "opacity-0"}`}>
        Заказать
        <Icon name="ArrowRight" size={14} />
      </button>
    </motion.div>
  )
}

export function ServicesSection({ onOpenOrder }: ServicesSectionProps) {
  return (
    <section id="uslugi" className="py-14 px-6 max-w-6xl mx-auto scroll-mt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">Наши <span className="text-orange-500">услуги</span></h2>
        <p className="text-gray-400">Всё что нужно для переезда и доставки — в одном месте</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} s={s} i={i} onOpenOrder={onOpenOrder} />
        ))}
      </div>
    </section>
  )
}

const loopedGuarantees = [...guarantees, ...guarantees, ...guarantees]

export function GuaranteesSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovered = useRef(false)

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector("div") as HTMLElement | null
    const cardWidth = (card?.offsetWidth ?? 280) + 24
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    }
    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const singleSetWidth = el.scrollWidth / 3
    el.scrollLeft = singleSetWidth

    const handleScroll = () => {
      const width = el.scrollWidth / 3
      if (el.scrollLeft >= width * 2) {
        el.scrollLeft -= width
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += width
      }
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered.current) scroll("right")
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="cennost" className="py-14 px-6 bg-gray-900/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">Почему с нами <span className="text-orange-500">работают</span></h2>
          <p className="text-gray-400">12 лет на рынке — знаем, что важно клиенту</p>
        </motion.div>
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-10 md:w-24 z-10 bg-gradient-to-r from-[#0a101d] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-10 md:w-24 z-10 bg-gradient-to-l from-[#0a101d] to-transparent" />
        <div ref={trackRef} onMouseEnter={() => { isHovered.current = true }} onMouseLeave={() => { isHovered.current = false }}
          onTouchStart={() => { isHovered.current = true }} onTouchEnd={() => { isHovered.current = false }}
          className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 touch-pan-x overscroll-x-contain">
          {loopedGuarantees.map((g, i) => (
            <div key={i}
              className="bg-gray-950 border border-gray-800 rounded-2xl p-4 shrink-0 w-[260px] md:w-[300px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 shrink-0 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Icon name={g.icon} size={20} className="text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}