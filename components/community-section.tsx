"use client"

export function CommunitySection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-lg p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Margex Community of Traders
            </h2>
            <p className="text-muted-foreground text-lg mb-8">Always here for you.</p>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c-.397 0-.72.323-.72.72v2.557c0 .396-.323.72-.72.72h-2.557c-.397 0-.72.323-.72.72v2.557c0 .396.323.72.72.72h2.557c.397 0 .72.323.72.72v2.557c0 .396.323.72.72.72h2.557c.397 0 .72-.323.72-.72v-2.557c0-.397.323-.72.72-.72h2.557c.397 0 .72-.323.72-.72v-2.557c0-.397-.323-.72-.72-.72h-2.557c-.397 0-.72-.323-.72-.72V8.941c0-.397-.323-.72-.72-.72h-2.557z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

