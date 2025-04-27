"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface IssueCardProps {
  category: {
    id: string
    title: string
    emoji: string
    feedbackCount: number
    sentiment: number
  }
}

export default function IssueCard({ category }: IssueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/feedback/${category.id}`} title={`Give feedback for ${category.title}`}>
        <Card className="h-full bg-gradient-to-br from-[#13071E] to-[#1E0B33] border border-purple-500/20 hover:border-purple-500/50 transition-all">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl">{category.emoji}</span>
              <div className={`h-3 w-3 rounded-full ${category.sentiment > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
            <p className="text-purple-300 text-sm mt-auto">
              {category.feedbackCount} feedbacks received
            </p>
          </CardContent>
        </Card>
      </Link>

    </motion.div>
  )
}