import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import HeroSection from "@/components/index/HeroSection"
import ServicesGuaranteesSection from "@/components/index/ServicesGuaranteesSection"
import CalculatorFormSection, { TARIFFS } from "@/components/index/CalculatorFormSection"
import PricesReviewsFooter from "@/components/index/PricesReviewsFooter"

const REQUESTS_URL = "https://functions.poehali.dev/4e286ec5-b1c9-4760-bd3d-7b601766e226"

export default function Index() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("Квартирный переезд")
  const [details, setDetails] = useState("")
  const [sending, setSending] = useState(false)

  // Калькулятор
  const [carType, setCarType] = useState("Газель (до 1,5 т)")
  const [hours, setHours] = useState(2)
  const [movers, setMovers] = useState(0)
  const moverRate = 600
  const estimated = TARIFFS[carType] * hours + movers * moverRate * hours

  const reviewsRef = useRef<HTMLDivElement>(null)
  const isReviewsHovered = useRef(false)

  const scrollReviews = (dir: "left" | "right") => {
    const el = reviewsRef.current
    if (!el) return
    const card = el.querySelector("div") as HTMLElement | null
    const cardWidth = (card?.offsetWidth ?? 280) + 24
    const singleSetWidth = el.scrollWidth / 2

    if (dir === "left" && el.scrollLeft - cardWidth < 0) {
      el.scrollLeft += singleSetWidth
    }
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  const handleReviewsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    e.preventDefault()
    const el = reviewsRef.current
    if (!el) return
    el.scrollLeft += e.deltaX
  }

  // Бесшовный переход отзывов по кругу
  useEffect(() => {
    const el = reviewsRef.current
    if (!el) return
    const handleScroll = () => {
      const singleSetWidth = el.scrollWidth / 2
      if (el.scrollLeft >= singleSetWidth) {
        el.scrollLeft -= singleSetWidth
      }
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  // Автоматическая прокрутка отзывов
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isReviewsHovered.current) {
        scrollReviews("right")
      }
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
        return () => clearTimeout(timer)
      }
    }
  }, [location.hash])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Заполните имя и телефон", variant: "destructive" })
      return
    }
    setSending(true)
    try {
      const res = await fetch(REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, details, estimated_price: estimated ? `${estimated.toLocaleString("ru")} ₽ (${carType}, ${hours} ч, грузчиков: ${movers})` : "" }),
      })
      if (!res.ok) throw new Error()
      if (typeof ym !== 'undefined') ym(110197782, 'reachGoal', 'form_submit')
      setName(""); setPhone(""); setDetails("")
      navigate('/thank-you')
    } catch {
      toast({ title: "Ошибка отправки", description: "Позвоните нам напрямую", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  const orderCalc = async () => {
    if (!phone.trim()) {
      toast({ title: "Укажите телефон в форме ниже", description: "Чтобы мы могли с вами связаться" })
      document.getElementById("zayavka")?.scrollIntoView({ behavior: "smooth" })
      return
    }
    setSending(true)
    try {
      await fetch(REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Расчёт с сайта",
          phone,
          service: `Расчёт: ${carType}`,
          details: `${hours} ч, грузчиков: ${movers}`,
          estimated_price: `${estimated} ₽`,
        }),
      })
      toast({ title: "Заявка на расчёт отправлена!", description: `Примерно ${estimated} ₽ — уточним детали по телефону` })
    } catch {
      toast({ title: "Ошибка отправки", variant: "destructive" })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <HeroSection />

      <ServicesGuaranteesSection />

      <CalculatorFormSection
        name={name} setName={setName}
        phone={phone} setPhone={setPhone}
        service={service} setService={setService}
        details={details} setDetails={setDetails}
        sending={sending}
        carType={carType} setCarType={setCarType}
        hours={hours} setHours={setHours}
        movers={movers} setMovers={setMovers}
        estimated={estimated}
        onOrderCalc={orderCalc}
        onSubmit={submit}
      />

      <PricesReviewsFooter
        reviewsRef={reviewsRef}
        onReviewsMouseEnter={() => { isReviewsHovered.current = true }}
        onReviewsMouseLeave={() => { isReviewsHovered.current = false }}
        onReviewsWheel={handleReviewsWheel}
      />
    </div>
  )
}