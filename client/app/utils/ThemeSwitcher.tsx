"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="p-3 rounded-md focus:outline-none"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <BiSun size={20} /> : <BiMoon size={20} fill="black"/>}
      </button>
    </div>
  )
} // 2. Export the component