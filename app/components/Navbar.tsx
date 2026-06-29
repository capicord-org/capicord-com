"use client";

import { useState, useEffect } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";

const NAV_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "For Borrowers", href: "#borrowers" },
  { label: "For Agents", href: "#agents" },
  { label: "For Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-[22px]" aria-hidden="true">
      <span className={`block h-[2px] w-full bg-navy rounded transition-transform duration-200 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`block h-[2px] w-full bg-navy rounded transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
      <span className={`block h-[2px] w-full bg-navy rounded transition-transform duration-200 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm border-b border-slate-200" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-[22px] font-bold text-navy tracking-tight no-underline"
          aria-label="Capicord — go to top"
        >
          Capicord
        </a>

        {/* Desktop navigation */}
        <NavigationMenu.Root aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <NavigationMenu.List className="flex items-center gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((l) => (
              <NavigationMenu.Item key={l.href}>
                <NavigationMenu.Link
                  href={l.href}
                  className="text-[15px] font-medium text-muted hover:text-navy transition-colors no-underline"
                >
                  {l.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <a
            href="#contact"
            className="bg-teal hover:bg-teal-dark text-white text-[15px] font-semibold px-5 py-2 rounded-md transition-colors no-underline"
          >
            Get Started
          </a>
        </NavigationMenu.Root>

        {/* Mobile menu */}
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/20 z-40" />
            <Dialog.Content
              id="mobile-nav"
              className="fixed top-16 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 pb-8 pt-4 shadow-lg focus:outline-none"
            >
              <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[16px] font-medium text-navy border-b border-slate-100 no-underline last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-5 block bg-teal hover:bg-teal-dark text-white font-semibold px-6 py-3 rounded-md text-center no-underline transition-colors"
                >
                  Get Started
                </a>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
