import Link from "next/link"
import { Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-slate-900 dark:text-white" />
            <span className="font-bold text-slate-900 dark:text-white">NCM Swift</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © 2025 NCM Swift. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  )
} 