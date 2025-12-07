"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setError("")
    // Placeholder auth logic
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-white font-bold text-xl">MARGEX</span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your account to continue trading</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {error && (
            <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
              <span className="text-foreground">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-primary hover:text-primary/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors mt-6"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-muted-foreground text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="px-4 py-3 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
          <button className="px-4 py-3 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.148 18.894c.211-.337.407-.702.555-1.089 1.643-4.200 1.643-8.122 0-12.322-.148-.387-.344-.752-.555-1.089.838.211 1.649.563 2.407 1.025 2.834 1.638 4.595 4.675 4.595 8.162s-1.761 6.524-4.595 8.162c-.758.462-1.569.814-2.407 1.025zm-3.148 1.106c1.651 0 3.238-.307 4.704-.886-.838-1.251-1.526-2.689-2.028-4.206-.649-.139-1.316-.214-2.004-.214s-1.355.075-2.004.214c-.502 1.517-1.19 2.955-2.028 4.206 1.466.579 3.053.886 4.704.886zm0-21c-1.651 0-3.238.307-4.704.886.838 1.251 1.526 2.689 2.028 4.206.649.139 1.316.214 2.004.214s1.355-.075 2.004-.214c.502-1.517 1.19-2.955 2.028-4.206-1.466-.579-3.053-.886-4.704-.886zm6.852 2.678c.211.337.407.702.555 1.089-.838-.211-1.649-.563-2.407-1.025 1.643 4.2 1.643 8.122 0 12.322-.148.387-.344.752-.555 1.089-.838-.211-1.569-.563-2.407-1.025-2.834-1.638-4.595-4.675-4.595-8.162s1.761-6.524 4.595-8.162c.758-.462 1.569-.814 2.407-1.025" />
            </svg>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
