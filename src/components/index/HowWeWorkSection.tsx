import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const steps = [
  { icon: "PhoneCall", title: "Оставляете заявку", desc: "Звонок, форма на сайте или сообщение в Макс — как удобно вам" },
  { icon: "Calculator", title: "Считаем стоимость", desc: "Называем точную цену за 5 минут, без скрытых доплат и предоплаты" },
  { icon: "Truck", title: "Выезжаем на объект", desc: "Подача машины от 20 минут, бригада приезжает точно к назначенному времени" },
  { icon: "CheckCircle2", title: "Оплата после работы", desc: "Оплачиваете, когда всё уже сделано" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
}

export default function HowWeWorkSection() {
  return (
    <section id="kak-rabotaem" className="py-14 px-6 max-w-6xl mx-auto scroll-mt-16">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Как мы <span className="text-orange-500">работаем</span></h2>
        <p className="text-gray-400">Простой путь от заявки до перевезённых вещей — никаких сюрпризов</p>
      </motion.div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0" />
        {steps.map((s, i) => (
          <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="relative text-center">
            <div className="relative mx-auto mb-4 w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
              <Icon name={s.icon} size={26} className="text-orange-500" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
            <p className="text-gray-400 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}