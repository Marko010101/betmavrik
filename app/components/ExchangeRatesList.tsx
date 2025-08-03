"use client";

import Image from "next/image";
import React, { useState } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE } from "../constant/ITEMS_PER_PAGE";

type Props = {
  rates: Record<string, string>;
  direction?: "ltr" | "rtl";
};

export default function ExchangeRatesList({ rates, direction }: Props) {
  const entries = Object.entries(rates);
  const [currentPage, setCurrentPage] = useState(1);
  const { isSmOrLarger } = useBreakpoint();

  const totalPages = Math.ceil(entries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRates = entries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentRates.map(([symbol, rate]) => (
          <li key={symbol} className="flex items-center gap-3 p-3 border rounded-md bg-white dark:bg-slate-900">
            <div className="w-6 h-6 shrink-0">
              <img
                src={`/icon/${symbol.toUpperCase()}.png`}
                alt={`${symbol} icon`}
                width={24}
                height={24}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <span className="font-medium">{symbol.toUpperCase()} / EUR</span>
            <span className="ml-auto text-right text-sm text-gray-500 dark:text-gray-300">
              {new Intl.NumberFormat("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              }).format(Number(rate))}
            </span>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        range={isSmOrLarger ? 3 : 1}
        dir={direction}
      />
    </div>
  );
}
