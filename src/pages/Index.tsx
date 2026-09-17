import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import HeroSection from "@/components/index/HeroSection"
import { ServicesSection, GuaranteesSection } from "@/components/index/ServicesGuaranteesSection"
import HowWeWorkSection from "@/components/index/HowWeWorkSection"
import CalculatorFormSection, { TARIFFS } from "@/components/index/CalculatorFormSection"
import PricesReviewsFooter from "@/components/index/PricesReviewsFooter"
import ExitIntentPopup from "@/components/index/ExitIntentPopup"

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

  // Exit-intent попап
  const [exitPopupVisible, setExitPopupVisible] = useState(false)
  const [exitName, setExitName] = useState("")
  const [exitPhone, setExitPhone] = useState("")
  const [exitSending, setExitSending] = useState(false)
  const exitPopupShown = useRef(false)

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
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  // Прокрутка отзывов колесиком мыши (нативный listener, чтобы preventDefault реально работал)
  useEffect(() => {
    const el = reviewsRef.current
    if (!el) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    }
    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [])

  // Бесшовный переход отзывов по кругу в обе стороны
  useEffect(() => {
    const el = reviewsRef.current
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

  // Автоматическая прокрутка отзывов
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isReviewsHovered.current) {
        scrollReviews("right")
      }
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  // Exit-intent: показываем попап, когда курсор уходит за верхнюю границу окна
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (exitPopupShown.current) return
      if (e.clientY <= 0) {
        exitPopupShown.current = true
        setExitPopupVisible(true)
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 4000)
    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
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

  const submitExitPopup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exitName.trim() || !exitPhone.trim()) {
      toast({ title: "Заполните имя и телефон", variant: "destructive" })
      return
    }
    setExitSending(true)
    try {
      const res = await fetch(REQUESTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: exitName, phone: exitPhone, service: "Скидка 10% (попап)", details: "" }),
      })
      if (!res.ok) throw new Error()
      if (typeof ym !== 'undefined') ym(110197782, 'reachGoal', 'form_submit')
      setExitPopupVisible(false)
      setExitName(""); setExitPhone("")
      navigate('/thank-you')
    } catch {
      toast({ title: "Ошибка отправки", description: "Позвоните нам напрямую", variant: "destructive" })
    } finally {
      setExitSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <HeroSection />

      <ServicesSection />

      <HowWeWorkSection />

      <GuaranteesSection />

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
      />

      <ExitIntentPopup
        visible={exitPopupVisible}
        onClose={() => setExitPopupVisible(false)}
        name={exitName} setName={setExitName}
        phone={exitPhone} setPhone={setExitPhone}
        sending={exitSending}
        onSubmit={submitExitPopup}
      />
    </div>
  )
}