"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [errorMessage, setErrorMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  // API request handler
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    const endpoint = type === "login" ? "/auth/login" : "/auth/signup"

    try {
      const response = await fetch(`https://vibesense230.zapto.org${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.detail)

      if (type === "login") {
        localStorage.setItem("token", data.access_token)
        alert("Login successful!")
        router.push("/explore")
      } else {
        alert("Registration successful! Please log in.")
        setActiveTab("login")
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unknown error occurred")
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-16">
      {/* Background Animation */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-[#13071E]/80 to-black opacity-90"></div>

      <div className="container max-w-md px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="overflow-hidden border-purple-500/20 bg-black/30 shadow-[0_0_30px_rgba(147,51,234,0.2)] backdrop-blur-xl">
            <div className="bg-gradient-to-r from-[#13071E] to-[#1E0B33] p-6 text-white">
              <h2 className="text-3xl font-bold">Welcome to VibeSense</h2>
              <p className="mt-2 text-[#D1D1D1]">Sign in to your account or create a new one</p>
            </div>
            <CardContent className="p-6">
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-2 bg-black/50 p-1">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                {errorMessage && <p className="text-red-400 mb-4">{errorMessage}</p>}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === "login" ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="login" className="mt-0">
                      <form onSubmit={(e) => handleAuth(e, "login")}>
                        <AuthForm showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
                        <Button
                          type="submit"
                          className="mt-2 w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                        >
                          Sign In
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-0">
                      <form onSubmit={(e) => handleAuth(e, "register")}>
                        <AuthForm
                          showPassword={showPassword}
                          togglePasswordVisibility={togglePasswordVisibility}
                          isRegister
                        />
                        <Button
                          type="submit"
                          className="mt-2 w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                        >
                          Create Account
                        </Button>
                      </form>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

interface AuthFormProps {
  showPassword: boolean
  togglePasswordVisibility: () => void
  isRegister?: boolean
}

function AuthForm({ showPassword, togglePasswordVisibility, isRegister = false }: AuthFormProps) {
  return (
    <div className="space-y-5">
      {isRegister && (
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#D1D1D1]">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="bg-black/50 border-purple-500/20 focus:border-purple-500"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#D1D1D1]">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          className="bg-black/50 border-purple-500/20 focus:border-purple-500"
        />
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="password" className="text-[#D1D1D1]">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="bg-black/50 border-purple-500/20 focus:border-purple-500 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-0 h-full px-3 text-purple-400 hover:text-purple-300 hover:bg-transparent"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

