"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

const languages = [
  { code: "en", label: "English", flag: "gb" },
  { code: "ge", label: "ქართული", flag: "ge" },
  { code: "ar", label: "العربية", flag: "sa" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const switchTo = (locale: string) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.replace(newPath);
    setOpen(false);
  };

  const currentLang = languages.find((l) => l.code === currentLocale);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="rounded-md bg-[var(--background)] text-[var(--foreground)] py-2 px-4 border border-slate-300 dark:border-slate-600 text-sm font-medium transition-all shadow hover:shadow-md focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-500/90"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-menu"
      >
        <span className="inline-flex items-center gap-2">
          <Image
            src={`https://flagcdn.com/h20/${currentLang?.flag}.png`}
            alt={currentLang?.label || "flag"}
            width={24}
            height={16}
            className="object-cover rounded-sm"
          />
          <span>{currentLang?.label ?? "Language"}</span>
        </span>
      </button>

      {open && (
        <ul
          id="language-menu"
          role="menu"
          className="absolute z-10 min-w-[160px] overflow-auto right-0 left-0 mt-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[var(--background)] text-[var(--foreground)] shadow-lg focus:outline-none"
        >
          {languages.map(({ code, label, flag }) => (
            <li
              key={code}
              role="menuitem"
              tabIndex={0}
              onClick={() => switchTo(code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  switchTo(code);
                }
              }}
              className={`cursor-pointer flex items-center gap-3 w-full text-sm px-4 py-2 rounded-md transition-all 
                ${
                  code === currentLocale
                    ? "font-semibold bg-slate-100 dark:bg-slate-800"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              <Image
                src={`https://flagcdn.com/h20/${flag}.png`}
                alt={label}
                width={24} // width in pixels
                height={16} // height in pixels
                className="object-cover rounded-sm"
              />

              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
