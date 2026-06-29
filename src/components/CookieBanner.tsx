import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted")
    if (!accepted) {
      setVisible(true)
      const timer = setTimeout(() => {
        localStorage.setItem("cookie_accepted", "1")
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <p className="text-gray-300 text-sm flex-1">
            Мы используем cookies для корректной работы сайта. Продолжая использование сайта, вы соглашаетесь с{" "}
            <Link to="/privacy" className="text-orange-400 hover:underline">политикой конфиденциальности</Link>.
          </p>
          <button
            onClick={accept}
            className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          >
            Понятно
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
