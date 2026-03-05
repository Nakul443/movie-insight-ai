"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Props {
  summary: string;
}

export default function InsightPanel({ summary }: Props) {
  // We'll wrap the AI summary in a glowing border to make it stand out
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-6 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Sparkles size={20} />
          <h3 className="font-bold uppercase tracking-widest text-sm">AI Sentiment Analysis</h3>
        </div>
        
        <p className="text-lg text-white leading-relaxed font-medium">
          {summary}
        </p>
      </div>
    </motion.div>
  );
}