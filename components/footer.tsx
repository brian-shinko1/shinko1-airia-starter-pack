export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/shinko1-logo-final.svg" alt="Shinkō1" className="h-6 w-auto" />
            </div>
            <span className="text-muted-foreground">x</span>
            <div className="flex items-center gap-2">
              <img src="/airia-logo.png" alt="Airia" className="h-8 w-auto" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            Day 0 Shinkō1 x Airia Starter Pack Program
          </p>

          
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shinkō1 & Airia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
