"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Database, FileText, Server, Users, AlertTriangle, Cpu, Globe, Sparkles } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "The Realization",
    description:
      "We discovered that existing datasets lacked Indian accent data and were outdated, making it impossible to train an accurate AI model.",
    icon: AlertTriangle,
    color: "#66BFFF",
  },
  {
    id: 2,
    title: "Building Our Own Dataset",
    description:
      "To bridge this gap, we decided to collect fresh data from Indian users, ensuring diverse accents and real-world scenarios.",
    icon: FileText,
    color: "#66BFFF",
  },
  {
    id: 3,
    title: "Data Processing & Cleaning",
    description:
      "We meticulously cleaned and preprocessed the data, removing noise and inconsistencies to create high-quality training inputs.",
    icon: Database,
    color: "#66BFFF",
  },
  {
    id: 4,
    title: "Choosing the Right Model",
    description:
      "Instead of using outdated architectures, we opted for LSTM networks, which proved to be more efficient and accurate for our needs.",
    icon: Cpu,
    color: "#66BFFF",
  },
  {
    id: 5,
    title: "Model Training",
    description:
      "Our LSTM model was trained on a powerful hardware setup, allowing it to learn and adapt to the nuances of Indian accents.",
    icon: Server,
    color: "#66BFFF",
  },
  {
    id: 6,
    title: "Building a Modern Web App",
    description:
      "We developed a cutting-edge web application using Next.js, FastAPI, prop drilling, and lazy loading to optimize performance and user experience.",
    icon: Globe,
    color: "#66BFFF",
  },
  {
    id: 7,
    title: "User Testing & Refinement",
    description:
      "Real users tested our platform, helping us fine-tune the model for maximum accuracy and reliability in real-world applications.",
    icon: Users,
    color: "#66BFFF",
  },
]

export default function RoadmapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="w-full py-24 bg-gradient-to-br from-black via-[#13071E] to-[#1E0B33]">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(128,90,213,0.1)_0,transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="h-full w-full bg-[linear-gradient(rgba(128,90,213,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(128,90,213,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="relative inline-block">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Our{" "}
              <motion.span
                className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-purple-400"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Data Collection
              </motion.span>{" "}
              Process
            </h2>
            <motion.div
              className="absolute -right-6 -top-6 text-purple-400"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </div>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            We follow a rigorous methodology to ensure our AI models are trained on diverse, high-quality data.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Connecting line with animated pulse */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute left-[20px] md:left-1/2 top-0 w-1 md:-translate-x-1/2 bg-gradient-to-b from-purple-500/80 via-purple-500 to-purple-500/20 z-10"
            />

            {/* Animated pulse along the line */}
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
              className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-purple-700/50 blur-sm z-20"
              style={{ marginLeft: -2 }}
            />


            {/* Steps */}
            <div className="space-y-16 md:space-y-24 pl-12 md:pl-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 md:px-8">
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(147, 51, 234, 0.2)" }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm p-8 ${
                        index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                      } relative overflow-hidden group`}
                    >
                      {/* Futuristic hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                      {/* Animated corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-50"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3">
                            <step.icon className="h-4 w-4 text-purple-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-lg text-slate-300">{step.description}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Step indicator */}
                  <div className="absolute left-0 top-0 flex items-center justify-center md:relative md:left-auto md:top-auto md:translate-x-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 + index * 0.2 }}
                      className="relative flex h-10 w-10 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-violet-600 z-30"
                    >
                      {/* Step number */}
                      <span className="text-white font-bold text-sm md:text-lg">{step.id}</span>

                      {/* Glow effect */}
                      <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-purple-500 opacity-30 blur-md"></div>

                      {/* Orbital ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="absolute inset-[-5px] rounded-full border border-purple-500/30 z-20"
                      ></motion.div>
                    </motion.div>
                  </div>

                  <div className="flex-1 md:px-8" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Futuristic footer element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block relative">
            <div className="h-[1px] w-40 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="mt-6 text-purple-300 text-sm">BUILDING THE FUTURE OF VOICE AI</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

