import type { Locale } from "./translations";

export type ProductLocaleFields = {
  name: string;
  spec: string;
  desc: string;
  category: string;
  badges: string[];
  specs: [string, string][];
};

const en: Record<number, ProductLocaleFields> = {
  1: {
    name: "Ultrasonic Flow Meter XT-500",
    category: "Industrial Measurement",
    spec: "Clamp-on, DN50–DN2000, ±0.5%",
    badges: ["BESTSELLER"],
    desc: "High-precision ultrasonic flow measurement for liquids. Clamp-on design requires no pipe cutting. Suitable for DN50 to DN2000 pipe diameters.",
    specs: [["Measurement Range", "DN50–DN2000"], ["Accuracy", "±0.5%"], ["Medium", "Liquids"], ["Output", "4-20mA, RS485"], ["IP Rating", "IP65"]],
  },
  2: {
    name: "Digital Pressure Gauge DPG-200",
    category: "Industrial Measurement",
    spec: "0–600 bar, 0.1% accuracy",
    badges: ["NEW"],
    desc: "High-accuracy digital pressure gauge with stainless steel wetted parts. Suitable for aggressive media.",
    specs: [["Range", "0–600 bar"], ["Accuracy", "0.1% FS"], ["Display", "4.5 digit LCD"], ["Connection", "G1/2\" BSP"], ["IP Rating", "IP67"]],
  },
  3: {
    name: "Portable Gas Analyzer GA-3000",
    category: "Industrial Measurement",
    spec: "CO, H₂S, O₂, LEL detection",
    badges: ["BESTSELLER"],
    desc: "Multi-gas detector for simultaneous monitoring of up to 4 gases. Used in confined spaces and hazardous areas.",
    specs: [["Gases", "CO, H₂S, O₂, LEL"], ["Display", "LCD with backlight"], ["Battery", "12 hours"], ["Alarm", "Visual+Audible+Vibration"], ["Certifications", "ATEX, IECEx"]],
  },
  4: {
    name: "Infrared Thermometer IT-900",
    category: "Industrial Measurement",
    spec: "-50°C to +2200°C range",
    badges: [],
    desc: "Professional infrared thermometer with laser targeting. Ideal for non-contact temperature measurement in industrial environments.",
    specs: [["Range", "-50°C to +2200°C"], ["Accuracy", "±1°C"], ["D:S Ratio", "50:1"], ["Emissivity", "0.1–1.0 adjustable"], ["Response Time", "150ms"]],
  },
  5: {
    name: "Ultrasonic Thickness Gauge TG-5",
    category: "Industrial Measurement",
    spec: "0.08–635mm measurement range",
    badges: ["NEW"],
    desc: "Portable thickness gauge using ultrasonic pulse-echo for non-destructive testing of metals, plastics, ceramics.",
    specs: [["Range", "0.08–635mm"], ["Accuracy", "±0.001mm"], ["Display", "B-scan"], ["Frequency", "2–10 MHz"], ["Standards", "ASTM E797"]],
  },
  6: {
    name: "Rotary Viscometer RV-300",
    category: "Industrial Measurement",
    spec: "1–2000 mPa·s viscosity range",
    badges: [],
    desc: "Digital rotary viscometer with spindle system for measuring viscosity of liquids, pastes and semi-solids.",
    specs: [["Range", "1–2,000,000 mPa·s"], ["Accuracy", "±1%"], ["Display", "Touch LCD"], ["Speeds", "0.1–200 rpm"], ["Spindles", "LV, RV, HA, HB series"]],
  },
  7: {
    name: "Acetonitrile HPLC Grade",
    category: "Chemical Reagents",
    spec: "99.9% purity, 2.5L",
    badges: ["BESTSELLER"],
    desc: "Ultra-high purity acetonitrile for HPLC and LC-MS applications. Low UV absorbance, low water content.",
    specs: [["Purity", "≥99.9%"], ["Water", "≤0.01%"], ["UV Cutoff", "190 nm"], ["Volume", "2.5L"], ["Grade", "HPLC/Spectroscopic"]],
  },
  8: {
    name: "Sulfuric Acid Analytical Grade",
    category: "Chemical Reagents",
    spec: "95–97%, ACS reagent grade",
    badges: [],
    desc: "High-purity sulfuric acid meeting ACS reagent specifications. For gravimetry, volumetric analysis and synthesis.",
    specs: [["Purity", "95–97%"], ["Grade", "ACS Reagent"], ["Density", "1.84 g/mL"], ["Volume", "2.5L"], ["Standard", "ACS, ISO, Reag. Ph Eur"]],
  },
  9: {
    name: "pH 7.00 Buffer Solution",
    category: "Chemical Reagents",
    spec: "±0.01 pH accuracy at 25°C",
    badges: ["NEW"],
    desc: "Certified reference buffer solution for pH meter calibration. NIST-traceable with certificate of analysis.",
    specs: [["pH Value", "7.00 ±0.01"], ["Temperature", "25°C"], ["Volume", "500mL"], ["Traceability", "NIST"], ["Shelf Life", "2 years"]],
  },
  10: {
    name: "Sodium Chloride Certified",
    category: "Chemical Reagents",
    spec: "99.5% purity, ACS grade, 1kg",
    badges: [],
    desc: "Highest purity sodium chloride for analytical chemistry, buffer preparation and cell biology applications.",
    specs: [["Purity", "≥99.5%"], ["Grade", "ACS, ISO, Ph Eur"], ["Form", "Crystalline"], ["Weight", "1 kg"], ["Appearance", "White crystals"]],
  },
  11: {
    name: "Hexane HPLC Grade",
    category: "Chemical Reagents",
    spec: "99% purity, 1L bottle",
    badges: ["BESTSELLER"],
    desc: "High-purity n-Hexane for HPLC, GC and extraction applications. Low in aromatics and sulfur compounds.",
    specs: [["Purity", "≥99%"], ["Grade", "HPLC"], ["Benzene", "<0.01%"], ["Volume", "1L"], ["Boiling Point", "68–70°C"]],
  },
  12: {
    name: "Potassium Dichromate Standard",
    category: "Chemical Reagents",
    spec: "0.1N volumetric standard, 500mL",
    badges: [],
    desc: "Certified volumetric standard solution for titrimetric analysis. Used as oxidizing titrant and for COD determination.",
    specs: [["Concentration", "0.1N"], ["Volume", "500mL"], ["Accuracy", "±0.2%"], ["Traceability", "NIST"], ["Grade", "Certipur"]],
  },
};

const uz: Record<number, ProductLocaleFields> = {
  1: { ...en[1], category: "Sanoat o'lchovi", spec: "Clamp-on, DN50–DN2000, ±0.5%", desc: "Suyuqliklar uchun yuqori aniqlikdagi ultratovushli oqim o'lchagichi. Quvur kesishsiz clamp-on dizayn. DN50 dan DN2000 gacha.", specs: [["O'lchov diapazoni", "DN50–DN2000"], ["Aniqlik", "±0.5%"], ["Muhit", "Suyuqliklar"], ["Chiqish", "4-20mA, RS485"], ["IP darajasi", "IP65"]] },
  2: { ...en[2], category: "Sanoat o'lchovi", spec: "0–600 bar, 0.1% aniqlik", desc: "Zanglamaydigan qismli raqamli bosim o'lchagichi. Aggressiv muhitlar uchun mos.", specs: [["Diapazon", "0–600 bar"], ["Aniqlik", "0.1% FS"], ["Displey", "4.5 raqamli LCD"], ["Ulanish", "G1/2\" BSP"], ["IP darajasi", "IP67"]] },
  3: { ...en[3], category: "Sanoat o'lchovi", spec: "CO, H₂S, O₂, LEL aniqlash", desc: "4 tagacha gazni bir vaqtda monitoring qiluvchi ko'p funksiyali detektor. Yopiq joylar va xavfli hududlar uchun.", specs: [["Gazlar", "CO, H₂S, O₂, LEL"], ["Displey", "Orqa yoritishli LCD"], ["Batareya", "12 soat"], ["Signal", "Ko'rinish+Ovoz+Tebranish"], ["Sertifikatlar", "ATEX, IECEx"]] },
  4: { ...en[4], category: "Sanoat o'lchovi", spec: "-50°C dan +2200°C gacha", desc: "Lazer nishonlashli professional infraqizil termometr. Sanoat muhitida kontaktsiz harorat o'lchash uchun.", specs: [["Diapazon", "-50°C – +2200°C"], ["Aniqlik", "±1°C"], ["D:S nisbati", "50:1"], ["Emissivlik", "0.1–1.0 sozlanadi"], ["Javob vaqti", "150ms"]] },
  5: { ...en[5], category: "Sanoat o'lchovi", spec: "0.08–635mm o'lchov diapazoni", desc: "Metall, plastmassa va keramika uchun buzilmaydigan sinovga mo'ljallangan portativ qalinlik o'lchagichi.", specs: [["Diapazon", "0.08–635mm"], ["Aniqlik", "±0.001mm"], ["Displey", "B-skan"], ["Chastota", "2–10 MHz"], ["Standartlar", "ASTM E797"]] },
  6: { ...en[6], category: "Sanoat o'lchovi", spec: "1–2000 mPa·s yopishqoqlik", desc: "Suyuqliklar, pastalar va yarim qattiq moddalarning yopishqoqligini o'lchash uchun raqamli rotatsion viskozimetr.", specs: [["Diapazon", "1–2,000,000 mPa·s"], ["Aniqlik", "±1%"], ["Displey", "Sensorli LCD"], ["Tezliklar", "0.1–200 rpm"], ["Spindellar", "LV, RV, HA, HB seriyasi"]] },
  7: { ...en[7], category: "Kimyo reagentlari", spec: "99.9% soflik, 2.5L", desc: "HPLC va LC-MS uchun ultra yuqori soflikdagi atsetonitril. Past UV yutilishi va kam suv tarkibi.", specs: [["Soflik", "≥99.9%"], ["Suv", "≤0.01%"], ["UV chegara", "190 nm"], ["Hajm", "2.5L"], ["Daraja", "HPLC/Spektroskopik"]] },
  8: { ...en[8], category: "Kimyo reagentlari", spec: "95–97%, ACS darajasi", desc: "ACS reagent talablariga javob beradigan yuqori soflikdagi kukurt kislotasi.", specs: [["Soflik", "95–97%"], ["Daraja", "ACS Reagent"], ["Zichlik", "1.84 g/mL"], ["Hajm", "2.5L"], ["Standart", "ACS, ISO, Reag. Ph Eur"]] },
  9: { ...en[9], category: "Kimyo reagentlari", spec: "25°C da ±0.01 pH", desc: "pH metr kalibrlash uchun sertifikatlangan etalon bufer eritmasi. NIST izlanuvchanligi bilan.", specs: [["pH qiymati", "7.00 ±0.01"], ["Harorat", "25°C"], ["Hajm", "500mL"], ["Izlanuvchanlik", "NIST"], ["Saqlash muddati", "2 yil"]] },
  10: { ...en[10], category: "Kimyo reagentlari", spec: "99.5% soflik, ACS, 1kg", desc: "Analitik kimyo va bufer tayyorlash uchun eng yuqori soflikdagi natriy xlorid.", specs: [["Soflik", "≥99.5%"], ["Daraja", "ACS, ISO, Ph Eur"], ["Shakl", "Kristall"], ["Og'irlik", "1 kg"], ["Ko'rinish", "Oq kristallar"]] },
  11: { ...en[11], category: "Kimyo reagentlari", spec: "99% soflik, 1L", desc: "HPLC, GC va ekstraksiya uchun yuqori soflikdagi n-Geksan.", specs: [["Soflik", "≥99%"], ["Daraja", "HPLC"], ["Benzen", "<0.01%"], ["Hajm", "1L"], ["Qaynash harorati", "68–70°C"]] },
  12: { ...en[12], category: "Kimyo reagentlari", spec: "0.1N volumetrik standart, 500mL", desc: "Titrimetrik tahlil uchun sertifikatlangan volumetrik standart eritma.", specs: [["Konsentratsiya", "0.1N"], ["Hajm", "500mL"], ["Aniqlik", "±0.2%"], ["Izlanuvchanlik", "NIST"], ["Daraja", "Certipur"]] },
};

const ru: Record<number, ProductLocaleFields> = {
  1: { ...en[1], category: "Промышленные измерения", spec: "Clamp-on, DN50–DN2000, ±0.5%", desc: "Высокоточный ультразвуковой расходомер для жидкостей. Бесконтактный clamp-on монтаж без врезки в трубу. DN50–DN2000.", specs: [["Диапазон", "DN50–DN2000"], ["Точность", "±0.5%"], ["Среда", "Жидкости"], ["Выход", "4-20мА, RS485"], ["IP", "IP65"]] },
  2: { ...en[2], category: "Промышленные измерения", spec: "0–600 бар, точность 0.1%", desc: "Цифровой манометр с высокой точностью и нержавеющими смачиваемыми частями. Для агрессивных сред.", specs: [["Диапазон", "0–600 бар"], ["Точность", "0.1% FS"], ["Дисплей", "4.5-разрядный LCD"], ["Подключение", "G1/2\" BSP"], ["IP", "IP67"]] },
  3: { ...en[3], category: "Промышленные измерения", spec: "CO, H₂S, O₂, LEL", desc: "Многогазовый детектор для одновременного контроля до 4 газов. Для замкнутых пространств и опасных зон.", specs: [["Газы", "CO, H₂S, O₂, LEL"], ["Дисплей", "LCD с подсветкой"], ["Батарея", "12 часов"], ["Сигнал", "Свет+Звук+Вибрация"], ["Сертификаты", "ATEX, IECEx"]] },
  4: { ...en[4], category: "Промышленные измерения", spec: "от -50°C до +2200°C", desc: "Профессиональный ИК-термометр с лазерным прицеливанием для бесконтактного измерения в промышленности.", specs: [["Диапазон", "-50°C – +2200°C"], ["Точность", "±1°C"], ["D:S", "50:1"], ["Эмиссивность", "0.1–1.0"], ["Время отклика", "150мс"]] },
  5: { ...en[5], category: "Промышленные измерения", spec: "0.08–635 мм", desc: "Портативный ультразвуковой толщиномер для неразрушающего контроля металлов, пластиков и керамики.", specs: [["Диапазон", "0.08–635мм"], ["Точность", "±0.001мм"], ["Дисплей", "B-scan"], ["Частота", "2–10 МГц"], ["Стандарты", "ASTM E797"]] },
  6: { ...en[6], category: "Промышленные измерения", spec: "1–2000 мПа·с", desc: "Цифровой ротационный вискозиметр для жидкостей, паст и полутвёрдых веществ.", specs: [["Диапазон", "1–2 000 000 мПа·с"], ["Точность", "±1%"], ["Дисплей", "Сенсорный LCD"], ["Скорости", "0.1–200 об/мин"], ["Шпиндели", "серии LV, RV, HA, HB"]] },
  7: { ...en[7], category: "Химические реагенты", spec: "чистота 99.9%, 2.5л", desc: "Ацетонитрил сверхвысокой чистоты для HPLC и LC-MS. Низкое УФ-поглощение и влажность.", specs: [["Чистота", "≥99.9%"], ["Вода", "≤0.01%"], ["УФ граница", "190 нм"], ["Объём", "2.5л"], ["Класс", "HPLC/Спектро"]] },
  8: { ...en[8], category: "Химические реагенты", spec: "95–97%, ACS", desc: "Серная кислота высокой чистоты по спецификации ACS. Для гравиметрии и синтеза.", specs: [["Чистота", "95–97%"], ["Класс", "ACS Reagent"], ["Плотность", "1.84 г/мл"], ["Объём", "2.5л"], ["Стандарт", "ACS, ISO, Ph Eur"]] },
  9: { ...en[9], category: "Химические реагенты", spec: "±0.01 pH при 25°C", desc: "Сертифицированный буферный раствор pH 7.00 для калибровки. Прослеживаемость NIST.", specs: [["pH", "7.00 ±0.01"], ["Температура", "25°C"], ["Объём", "500мл"], ["Прослеживаемость", "NIST"], ["Срок", "2 года"]] },
  10: { ...en[10], category: "Химические реагенты", spec: "99.5%, ACS, 1кг", desc: "Хлорид натрия высочайшей чистоты для аналитической химии и буферов.", specs: [["Чистота", "≥99.5%"], ["Класс", "ACS, ISO, Ph Eur"], ["Форма", "Кристаллы"], ["Вес", "1 кг"], ["Вид", "Белые кристаллы"]] },
  11: { ...en[11], category: "Химические реагенты", spec: "99%, 1л", desc: "n-Гексан высокой чистоты для HPLC, ГХ и экстракции.", specs: [["Чистота", "≥99%"], ["Класс", "HPLC"], ["Бензол", "<0.01%"], ["Объём", "1л"], ["Кипение", "68–70°C"]] },
  12: { ...en[12], category: "Химические реагенты", spec: "0.1N стандарт, 500мл", desc: "Сертифицированный объёмный стандарт для титриметрического анализа и определения ХПК.", specs: [["Концентрация", "0.1N"], ["Объём", "500мл"], ["Точность", "±0.2%"], ["Прослеживаемость", "NIST"], ["Класс", "Certipur"]] },
};

export const productLocaleMap: Record<Locale, Record<number, ProductLocaleFields>> = {
  en,
  uz,
  ru,
};

export function localizeBadge(badge: string, t: (key: string) => string): string {
  if (badge === "BESTSELLER") return t("badges.bestseller");
  if (badge === "NEW") return t("badges.new");
  return badge;
}
