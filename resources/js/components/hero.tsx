'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Block */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-charcoal leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Buy and Sell Used Steel Buildings Across Europe
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600">
            From industrial halls to agricultural sheds — discover cost-effective, sustainable building solutions with full service from A to Z.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-[var(--primary)] text-white hover:bg-orange-600">
              Browse Structures <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Sell Your Property
            </Button>
          </div>
        </div>

        {/* Optional Image or Illustration */}
        <div className="flex-1 hidden md:block">
          <img
            src="/assets/1.png"
            alt="Used Steel Building"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
