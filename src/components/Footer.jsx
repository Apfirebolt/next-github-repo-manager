import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-blood-dark/30 bg-blood-dark text-parchment">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand Info */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-sm font-bold tracking-wider uppercase text-parchment">
              Next Github Manager
            </span>
            <p className="mt-1 text-xs text-sage">
              &copy; {currentYear} Next Github Manager. All rights reserved.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex items-center space-x-6 text-xs font-medium text-sage">
            <Link
              href="/"
              className="transition-colors hover:text-parchment"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-parchment"
            >
              About
            </Link>
            <Link
              href="/github"
              className="transition-colors hover:text-parchment"
            >
              Github Users
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;