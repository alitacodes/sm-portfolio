"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-black/80 backdrop-blur-md border border-pink-400/30 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white/60 hover:text-pink-400 hover:bg-white/10 rounded-full p-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
            Coming Soon!
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            This project is currently under development.
            <br />
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  )
}
