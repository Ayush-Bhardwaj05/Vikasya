"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface PublicIssueCardProps {
  category: {
    id: number
    title: string
    emoji: string
    feedbackCount: number
    sentiment: number
  }
  index: number
  onClick: () => void
}

export default function PublicIssueCard({ category, index, onClick }: PublicIssueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className="h-full cursor-pointer bg-gradient-to-br from-[#13071E] to-[#1E0B33] border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-[0_0_20px_rgba(147,51,234,0.2)]"
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{category.emoji}</span>
            <div className={`h-3 w-3 rounded-full ${category.sentiment > 0 ? 'bg-green-400' : 'bg-red-400'} shadow-[0_0_10px_${category.sentiment > 0 ? 'rgba(74,222,128,0.5)' : 'rgba(248,113,113,0.5)'}]`} />
          </div>
          <h3 className="font-semibold text-white text-xl mb-2">{category.title}</h3>
          <p className="text-purple-300 text-sm mt-auto">
            {category.feedbackCount} feedbacks received
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}