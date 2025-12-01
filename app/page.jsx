"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import LoadingBar from "@/components/loading-bar"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <LoadingBar />}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
