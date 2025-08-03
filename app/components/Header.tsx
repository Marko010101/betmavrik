"use client";
import Image from "next/image";
import { ModeToggle } from "./darkMode/ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import BetMavrikLogo from "@/public/BetMavrikLogo.png";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b dark:border-neutral-50/50 border-neutral-900/50 px-5 py-4 lg:px-40 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 cursor-pointer z-50 overflow-visible"
        >
          <span
            className={`block h-0.5 w-full bg-current transition-transform origin-center ${
              menuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-transform origin-center ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        <div className="hidden md:flex gap-5 items-center">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      <Link href="/" className="bg-indigo-950/95 p-1 dark:bg-transparent rounded-xl px-3">
        <Image src={BetMavrikLogo} height={130} width={130} alt="BetMavrik image" />
      </Link>

      <div
        className={`fixed inset-0 bg-black/20 bg-opacity-500 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gray-200 dark:bg-slate-900 shadow-lg z-50 transform transition-transform duration-300  ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col p-6 gap-6`}
      >
        <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="self-end mb-4 text-xl font-bold">
          ×
        </button>
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </aside>
    </header>
  );
}
