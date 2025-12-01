"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Contact Us", href: "#contact" },
  ]

  const handleLinkClick = (label) => {
    setActiveLink(label)
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Anvictol Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-sm text-[#0A1F44]">Anvictol</span>
              <span className="text-xs text-gray-600">Integrated Services Ltd</span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeLink === link.label
                    ? "bg-[#0A1F44] text-white px-3 py-1.5 rounded-[20px]"
                    : "text-gray-700 hover:text-[#0A1F44]"
                }`}
                onClick={() => handleLinkClick(link.label)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 focus:outline-none"
          >
            <span
              className={`w-6 h-0.5 bg-[#0A1F44] transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span className={`w-6 h-0.5 bg-[#0A1F44] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`w-6 h-0.5 bg-[#0A1F44] transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu - Full Screen 100vh */}
        {isMenuOpen && (
          <div className="fixed md:hidden inset-0 top-20 h-[calc(100vh-80px)] w-full bg-white animate-slideUp z-30 flex flex-col items-start justify-start pt-8 px-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block w-full py-4 px-6 font-bold text-2xl transition-all duration-300 rounded-lg ${
                  activeLink === link.label
                    ? "bg-[#0A1F44] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#0A1F44]"
                }`}
                onClick={() => handleLinkClick(link.label)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}