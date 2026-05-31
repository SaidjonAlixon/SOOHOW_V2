import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PHONE_COUNTRIES = [
  { id: "uz", dialCode: "+998", flag: "🇺🇿", nameKey: "phoneCountries.uz", example: "90 123 45 67", maxDigits: 9 },
  { id: "kz", dialCode: "+7", flag: "🇰🇿", nameKey: "phoneCountries.kz", example: "701 234 56 78", maxDigits: 10 },
  { id: "kg", dialCode: "+996", flag: "🇰🇬", nameKey: "phoneCountries.kg", example: "555 123 456", maxDigits: 9 },
  { id: "tj", dialCode: "+992", flag: "🇹🇯", nameKey: "phoneCountries.tj", example: "93 123 45 67", maxDigits: 9 },
  { id: "tm", dialCode: "+993", flag: "🇹🇲", nameKey: "phoneCountries.tm", example: "65 123456", maxDigits: 8 },
] as const;

export type PhoneCountryId = (typeof PHONE_COUNTRIES)[number]["id"];

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function detectCountryId(phone: string): PhoneCountryId {
  const normalized = phone.trim();
  if (!normalized) return "uz";

  const sorted = [...PHONE_COUNTRIES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  );

  for (const country of sorted) {
    const codeDigits = country.dialCode.replace("+", "");
    const raw = normalized.startsWith("+") ? normalized.slice(1) : normalized;
    if (raw.startsWith(codeDigits)) return country.id;
  }

  return "uz";
}

function nationalDigits(phone: string, dialCode: string) {
  const all = digitsOnly(phone);
  const code = dialCode.replace("+", "");
  if (all.startsWith(code)) return all.slice(code.length);
  return all;
}

function formatNational(digits: string, countryId: PhoneCountryId) {
  if (!digits) return "";

  if (countryId === "uz" && digits.length >= 2) {
    const a = digits.slice(0, 2);
    const b = digits.slice(2, 5);
    const c = digits.slice(5, 7);
    const d = digits.slice(7, 9);
    return [a, b, c, d].filter(Boolean).join(" ");
  }

  if (countryId === "kz") {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 8);
    const d = digits.slice(8, 10);
    return [a, b, c, d].filter(Boolean).join(" ");
  }

  if (countryId === "kg" && digits.length >= 3) {
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 9);
    return [a, b, c].filter(Boolean).join(" ");
  }

  if (countryId === "tj" && digits.length >= 2) {
    const a = digits.slice(0, 2);
    const b = digits.slice(2, 5);
    const c = digits.slice(5, 7);
    const d = digits.slice(7, 9);
    return [a, b, c, d].filter(Boolean).join(" ");
  }

  if (countryId === "tm" && digits.length >= 2) {
    const a = digits.slice(0, 2);
    const b = digits.slice(2, 8);
    return [a, b].filter(Boolean).join(" ");
  }

  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

function buildFullPhone(dialCode: string, national: string) {
  const digits = digitsOnly(national);
  if (!digits) return "";
  return `${dialCode}${digits}`;
}

type PhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  id?: string;
};

export function PhoneInput({ value, onChange, onBlur, className, id }: PhoneInputProps) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [countryId, setCountryId] = useState<PhoneCountryId>(() => detectCountryId(value));

  const country = useMemo(
    () => PHONE_COUNTRIES.find((c) => c.id === countryId) ?? PHONE_COUNTRIES[0],
    [countryId],
  );

  useEffect(() => {
    if (value) setCountryId(detectCountryId(value));
  }, [value]);

  const national = nationalDigits(value, country.dialCode).slice(0, country.maxDigits);
  const displayNational = formatNational(national, country.id);

  const selectCountry = (nextId: PhoneCountryId) => {
    const next = PHONE_COUNTRIES.find((c) => c.id === nextId) ?? PHONE_COUNTRIES[0];
    setCountryId(next.id);
    const kept = nationalDigits(value, country.dialCode).slice(0, next.maxDigits);
    onChange(buildFullPhone(next.dialCode, kept));
    setOpen(false);
  };

  const handleNationalChange = (raw: string) => {
    const digits = digitsOnly(raw).slice(0, country.maxDigits);
    onChange(buildFullPhone(country.dialCode, digits));
  };

  return (
    <div
      className={cn(
        "site-form-control flex items-center overflow-hidden border border-solid shadow-sm focus-within:ring-1 focus-within:ring-[#00A8E8]/50",
        className,
      )}
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="relative z-10 flex h-full shrink-0 items-center justify-center gap-1 border-r site-border px-2 sm:px-2.5 text-sm site-heading hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={t("phoneCountries.select")}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-[#00A8E8]">
              {country.id}
            </span>
            <span className="font-mono text-xs text-[hsl(var(--site-fg)/0.85)]">
              {country.dialCode}
            </span>
            <ChevronDown size={12} className="text-[#00A8E8] opacity-80 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="z-[3100] w-64 p-1 site-card border site-border bg-[hsl(var(--site-card))] text-[hsl(var(--site-fg))] shadow-xl"
        >
          {PHONE_COUNTRIES.map((c) => (
            <DropdownMenuItem
              key={c.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm focus:bg-[#00A8E8]/10 focus:text-[hsl(var(--site-fg))]",
                c.id === countryId && "bg-[#00A8E8]/15",
              )}
              onSelect={() => selectCountry(c.id)}
            >
              <span className="w-7 text-center text-xs font-bold uppercase text-[#00A8E8]">
                {c.id}
              </span>
              <span className="flex-1 font-sans">{t(c.nameKey)}</span>
              <span className="font-mono text-xs site-muted">{c.dialCode}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={displayNational}
        onChange={(e) => handleNationalChange(e.target.value)}
        onBlur={onBlur}
        placeholder={country.example}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm site-heading placeholder:text-[hsl(var(--site-fg)/0.35)] focus-visible:outline-none"
      />
    </div>
  );
}
