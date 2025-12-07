"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup attempt:", formData)
    }
  }

  const passwordStrength = formData.password.length >= 8 ? "strong" : formData.password.length >= 6 ? "medium" : "weak"

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

          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-muted-foreground">Get started with Margex today</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4 mb-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 bg-card border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full px-4 py-3 bg-card border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-card border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.password ? "border-destructive" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
            {formData.password && (
              <div className="mt-2 flex gap-2">
                <div
                  className={`h-1 flex-1 rounded ${
                    passwordStrength === "strong"
                      ? "bg-success"
                      : passwordStrength === "medium"
                        ? "bg-warning"
                        : "bg-destructive"
                  }`}
                ></div>
                <span className="text-xs text-muted-foreground capitalize">{passwordStrength} password</span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm text-foreground mb-2 font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-card border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.confirmPassword ? "border-destructive" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded accent-primary mt-1 flex-shrink-0"
            />
            <span className="text-sm text-foreground">
              I agree to Margex{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              {" and "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && <p className="text-destructive text-xs">{errors.terms}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors mt-6"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-muted-foreground text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="px-4 py-3 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </button>
          <button className="px-4 py-3 bg-card border border-border rounded-md hover:bg-secondary transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.148 18.894c.211-.337.407-.702.555-1.089 1.643-4.200 1.643-8.122 0-12.322-.148-.387-.344-.752-.555-1.089.838.211 1.649.563 2.407 1.025 2.834 1.638 4.595 4.675 4.595 8.162s-1.761 6.524-4.595 8.162c-.758.462-1.569.814-2.407 1.025z" />
            </svg>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-semibold">
              Log in
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 space-y-2 pt-8 border-t border-border">
          {["Secure account protection", "No credit card required", "Start trading instantly"].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
