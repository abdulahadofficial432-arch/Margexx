import { Zap } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <h2 className="text-4xl font-bold text-white text-center mb-4">We made crypto trading easy</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Get the fastest order execution, liquidity from 12+ providers, lowest fees and more
        </p>

        {/* Feature Image Placeholder */}
        <div className="bg-card/50 border border-border rounded-lg p-12 mb-12 flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Feature Image - Trading Platform Overview</p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-24 bg-primary/30 rounded"
                  style={{
                    height: `${60 + Math.random() * 40}px`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { number: "500k+", label: "Registered users" },
            { number: "180k+", label: "Daily trades" },
            { number: "0", label: "Client funds lost" },
            { number: "153", label: "Countries served" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-md transition-colors">
            Open Free Account
          </button>
          <button className="px-8 py-3 bg-card border border-border hover:bg-secondary text-white font-semibold rounded-md transition-colors">
            Platform Overview
          </button>
        </div>

        {/* Download Apps */}
        <div className="flex justify-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Apple className="w-8 h-8" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.40,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16257545 C3.34915502,0.9054781 2.40734225,0.9054781 1.77946707,1.42677316 C0.994623095,2.0607429 0.837654326,3.0033272 1.15159189,3.95191156 L3.03521743,10.3929045 C3.03521743,10.5500019 3.34915502,10.7070993 3.50612381,10.7070993 L17.6915026,11.4925862 C18.1624089,11.4925862 18.4763465,11.8067604 18.4763465,12.2780525 L18.4763465,12.6315722 C18.4763465,13.1028643 18.1624089,13.4170592 17.6915026,13.4170592 Z" />
            </svg>
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Zap className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}

function Apple({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C3.68 14.98 2.51 9.85 4.88 6.64c1.29-1.8 3.34-2.93 5.58-2.96 1.3-.02 2.53.78 3.38.78.86 0 2.23-1.01 3.77-.86 1.71.17 3.33 1.08 4.35 2.89.35.58.56 1.22.56 1.91-.03 3.77-2.77 6.46-2.72 6.46zM12 5.38c-2.09 0-3.71 1.88-3.71 4.04 0 2.05 1.62 4.05 3.71 4.05 2.09 0 3.71-1.89 3.71-4.04C15.71 7.26 14.09 5.38 12 5.38z" />
    </svg>
  )
}
