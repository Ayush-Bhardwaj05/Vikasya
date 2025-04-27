"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Our Models", path: "/models" },
  { name: "About Us", path: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/40">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-white">
              Vibe<span className="text-purple-400">Sense</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`text-base font-medium transition-colors hover:text-purple-400 ${
                    pathname === item.path ? "text-purple-400" : "text-[#D1D1D1]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
          >
            <Link href="/auth">Login / Sign Up</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#D1D1D1] hover:bg-purple-900/50 hover:text-purple-400 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        {isOpen && (
          <div className="container mx-auto bg-black/90 px-4 py-6 backdrop-blur-md">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block text-lg font-medium transition-colors hover:text-purple-400 ${
                      pathname === item.path ? "text-purple-400" : "text-[#D1D1D1]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                >
                  <Link href="/auth" onClick={() => setIsOpen(false)}>
                    Login / Sign Up
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </header>
  )
}

