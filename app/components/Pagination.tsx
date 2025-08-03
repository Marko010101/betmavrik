import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  range?: number;
  dir?: "ltr" | "rtl";
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, range = 2, dir }) => {
  const t = useTranslations("HomePage");

  const pageNumbers = [];
  if (totalPages > 0) {
    pageNumbers.push(1);
  }

  console.log("totalPages", totalPages);
  if (currentPage - range > 2) {
    pageNumbers.push(-1);
  }

  for (let i = Math.max(2, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }

  if (currentPage + range < totalPages - 1) {
    pageNumbers.push(-1);
  }

  if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-center mt-4 p-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sm sm:text-md p-1 sm:px-4 sm:py-2 bg-inherit rounded-full flex items-center justify-center gap-1 hover:bg-cyan-700 hover:text-slate-200 dark:hover:bg-cyan-800 disabled:cursor-not-allowed"
      >
        {dir === "rtl" ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        <span className="hidden sm:inline">{t("prevBtn")}</span>
      </button>

      {pageNumbers.map((page, index) =>
        page === -1 ? (
          <div
            key={`ellipsis-${index}`}
            className="flex items-center justify-center min-w-8 rounded-full mx-0.5 sm:mx-1 max-w-14 text-sm sm:text-md bg-gray-300 dark:bg-gray-700 cursor-default"
          >
            ...
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${
              page === currentPage
                ? "bg-slate-400 text-white"
                : "bg-gray-300 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-slate-500"
            } flex items-center justify-center min-w-8 rounded-full mx-0.5 sm:mx-1 max-w-14 text-sm sm:text-md`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-sm sm:text-md p-1 sm:px-4 sm:py-2 bg-inherit rounded-full flex items-center justify-center gap-1 hover:bg-cyan-700 hover:text-slate-200 dark:hover:bg-cyan-800 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">{t("nextBtn")}</span>
        {dir === "rtl" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
      </button>
    </div>
  );
};

export default Pagination;
