import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#0A1F44]">
              Nex<span className="text-[#66BFFF]">Bot</span>
            </h3>
            <p className="mb-4 text-gray-600">Advancing robotics technology for a better tomorrow.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[#66BFFF]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#66BFFF]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#66BFFF]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#66BFFF]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#66BFFF]">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/models" className="text-gray-600 hover:text-[#66BFFF]">
                  Our Models
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#66BFFF]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#66BFFF]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} NexBot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

