import { getLocale, getTranslations } from "next-intl/server";
import ExchangeRatesList from "../components/ExchangeRatesList";
// @ts-expect-error - rtl-detect lacks TypeScript types
import { getLangDir } from "rtl-detect";

interface ExchangeRatesResponse {
  data: {
    currency: string;
    rates: Record<string, string>;
  };
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const direction = getLangDir(locale);
  console.log("direction", direction);

  let exchangeRates: Record<string, string> = {};

  try {
    const res = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=EUR", {
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data: ExchangeRatesResponse = await res.json();
    exchangeRates = data.data.rates;
  } catch (error) {
    return (
      <h1 className="text-xl dark:text-red-200 text-red-700 text-center px-5 py-15 font-light font-serif">
        {t("exchangeFetchError")}
      </h1>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-[1600px] flex flex-col justify-center gap-5 mx-auto">
      <h1 className="text-2xl font-bold flex items-center justify-center">{t("title")}</h1>
      <ExchangeRatesList rates={exchangeRates} direction={direction} />
    </div>
  );
}
