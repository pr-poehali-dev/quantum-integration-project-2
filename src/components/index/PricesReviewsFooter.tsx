import { RefObject } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const reviews = [
  { name: "Данис", date: "27 июня 2026", text: "Вывезли строительный мусор после ремонта. Приехали в тот же день, быстро всё загрузили. Цена честная, никаких скрытых доплат. Спасибо!", stars: 5 },
  { name: "Зульфия", date: "10 июня 2026", text: "Переезжали в новую квартиру всей семьёй. Грузчики приехали точно в назначенное время, всё аккуратно завернули в плёнку. Очень вежливые и внимательные ребята.", stars: 5 },
  { name: "Артур", date: "14 мая 2026", text: "Переезжали из двушки в трёшку. Приехали вовремя, аккуратно упаковали всё хрупкое, ни одной царапины. Уложились в 4 часа — быстрее, чем ожидал. Рекомендую!", stars: 5 },
  { name: "Лейсан", date: "22 апреля 2026", text: "Заказывала Газель для перевозки мебели из магазина. Водитель помог занести всё до квартиры, ничего не повредили. Цена приятно порадовала.", stars: 5 },
  { name: "Игорь", date: "31 марта 2026", text: "Перевозили дорогой антиквариат. Всё упаковали профессионально, довезли целым. Очень доволен отношением к работе и к вещам клиента.", stars: 5 },
  { name: "Ринат", date: "6 марта 2026", text: "Помогли перевезти оборудование для мастерской. Всё разобрали, аккуратно погрузили и собрали на месте. Работают быстро и по-честному.", stars: 5 },
  { name: "Наталья", date: "2 февраля 2026", text: "Отличная команда! Помогли с офисным переездом — вынесли серверное оборудование, разобрали и собрали мебель. Работали чётко и без суеты. Однозначно обращусь снова.", stars: 5 },
  { name: "Мария", date: "18 января 2026", text: "Обращалась уже второй раз. Снова всё на отлично — быстро, аккуратно, по адекватной цене. Теперь буду рекомендовать всем знакомым.", stars: 5 },
  { name: "Светлана", date: "9 декабря 2025", text: "Заказывала грузчиков для помощи с переездом. Ребята вежливые, работящие, всё сделали аккуратно. Даже холодильник через узкий коридор занесли без проблем.", stars: 5 },
]

const prices = [
  {
    title: "Газель до 1,5 т",
    icon: "Truck",
    price: "от 1 400 ₽/ч",
    items: ["Объём до 9 м³", "До 1 500 кг", "Городские переезды", "Доставка мебели"],
  },
  {
    title: "Газель усиленная",
    icon: "Truck",
    price: "от 1 800 ₽/ч",
    items: ["Объём до 16 м³", "До 2 500 кг", "Офисные переезды", "Крупные грузы"],
    highlight: true,
  },
  {
    title: "Грузчики",
    icon: "Users",
    price: "600 ₽/ч за чел.",
    items: ["Погрузка и выгрузка", "Разборка мебели", "Подъём на этажи", "Подсобные работы"],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

interface PricesReviewsFooterProps {
  reviewsRef: RefObject<HTMLDivElement>
  onReviewsMouseEnter: () => void
  onReviewsMouseLeave: () => void
  onOpenOrder: () => void
}

const loopedReviews = [...reviews, ...reviews, ...reviews]

export default function PricesReviewsFooter({ reviewsRef, onReviewsMouseEnter, onReviewsMouseLeave, onOpenOrder }: PricesReviewsFooterProps) {
  return (
    <>
      {/* PRICES */}
      <section id="ceny" className="pt-6 pb-14 px-6 bg-gray-900/50 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">Наши <span className="text-orange-500">цены</span></h2>
            <p className="text-gray-400">Прозрачный прайс без скрытых доплат</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prices.map((p, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className={`rounded-2xl p-7 flex flex-col border transition-colors ${p.highlight ? "bg-orange-500 border-orange-400" : "bg-gray-900 border-gray-800 hover:border-orange-500/40"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.highlight ? "bg-white/20" : "bg-orange-500/10"}`}>
                  <Icon name={p.icon} size={24} className={p.highlight ? "text-white" : "text-orange-500"} />
                </div>
                <h3 className={`text-xl font-bold mb-1 ${p.highlight ? "text-white" : "text-white"}`}>{p.title}</h3>
                <div className={`text-2xl font-bold mb-5 ${p.highlight ? "text-white" : "text-orange-500"}`}>{p.price}</div>
                <ul className="space-y-2 flex-1">
                  {p.items.map((item, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${p.highlight ? "text-white/90" : "text-gray-400"}`}>
                      <Icon name="Check" size={15} className={p.highlight ? "text-white" : "text-orange-500"} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={onOpenOrder}
                  className={`mt-6 block text-center font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] ${p.highlight ? "bg-white text-orange-500 hover:bg-orange-50" : "bg-orange-500 hover:bg-orange-400 text-white"}`}>
                  Заказать
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">Минимальный заказ — 2 часа. Точная стоимость рассчитывается под ваш заказ.</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="otzyvy" className="py-14 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">Отзывы <span className="text-orange-500">клиентов</span></h2>
            <p className="text-gray-400">Более 6 136 выполненных заказов — вот что говорят люди</p>
          </motion.div>
        </div>
        <div className="relative max-w-6xl mx-auto">
          <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-10 md:w-24 z-10 bg-gradient-to-r from-gray-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-10 md:w-24 z-10 bg-gradient-to-l from-gray-950 to-transparent" />
          <div ref={reviewsRef} onMouseEnter={onReviewsMouseEnter} onMouseLeave={onReviewsMouseLeave}
            onTouchStart={onReviewsMouseEnter} onTouchEnd={onReviewsMouseLeave}
            className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-4 touch-pan-x overscroll-x-contain">
            {loopedReviews.map((r, i) => (
              <div key={i}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition-all shrink-0 w-[280px] md:w-[320px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-white">{r.name}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Icon key={j} name="Star" size={15} className="text-orange-500 fill-orange-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 text-gray-400 text-sm px-6 pt-12 pb-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Icon name="Truck" size={24} className="text-orange-500" />
            <span className="text-white font-semibold text-lg">ГрузМастер</span>
          </button>
          <p className="text-orange-500 mb-6">Профессионалы дела</p>

          <div className="space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Icon name="MapPin" size={16} className="text-orange-500" />
              <span>г. Уфа, Республика Башкортостан</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={16} className="text-orange-500" />
              <a href="tel:+79177775020" className="hover:text-orange-500" onClick={() => { if (typeof ym !== 'undefined') ym(110197782, 'reachGoal', 'phone_click') }}>+7 917 777-50-20</a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={16} className="text-orange-500" />
              <a href="mailto:support@gruzufa.ru" className="hover:text-orange-500">support@gruzufa.ru</a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Icon name="Clock" size={16} className="text-orange-500" />
              <span>Ежедневно, круглосуточно</span>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          © 2014–2026 ГрузМастер · Все права защищены |{" "}
          <Link to="/privacy" className="hover:text-orange-500 hover:underline">Политика конфиденциальности</Link>
        </div>
      </footer>
    </>
  )
}