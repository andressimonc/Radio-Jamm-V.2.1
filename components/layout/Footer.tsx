// RADIO JAMM — Footer Component

export function Footer() {
  return (
    <footer className="border-t border-light-gray bg-off-white mt-auto">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built for musicians who love to jam. 🎸
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Radio Jamm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
