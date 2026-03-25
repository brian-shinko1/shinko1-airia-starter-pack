export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/shinko1-logo.png" alt="Shinkō1" className="h-8 w-auto" />
            </div>
            <span className="text-muted-foreground">x</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                <span className="text-sm font-bold text-secondary-foreground">Ai</span>
              </div>
              <span className="text-lg font-semibold text-foreground">Airia</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Day 0 Starter Pack Program
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Support
            </a>
          </div>
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
