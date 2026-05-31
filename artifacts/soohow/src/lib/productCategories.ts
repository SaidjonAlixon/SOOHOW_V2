/** Product group keys for the catalog (filters and grouped sections). */
export type ProductCategoryKey =
  | "metalSpectral"
  | "oilLubricant"
  | "wear"
  | "ferrography"
  | "particleCounter"
  | "medical";

export const PRODUCT_CATEGORY_ORDER: ProductCategoryKey[] = [
  "metalSpectral",
  "oilLubricant",
  "wear",
  "ferrography",
  "particleCounter",
  "medical",
];

/** i18n key suffix: productsPage.<key> — section headings */
export const PRODUCT_CATEGORY_I18N_KEY: Record<ProductCategoryKey, string> = {
  metalSpectral: "catMetalSpectral",
  oilLubricant: "catOilLubricant",
  wear: "catWear",
  ferrography: "catFerrography",
  particleCounter: "catParticleCounter",
  medical: "catMedical",
};

/** Shorter labels for the filter bar (full names stay on section headings) */
export const PRODUCT_CATEGORY_FILTER_I18N_KEY: Record<ProductCategoryKey, string> = {
  metalSpectral: "catMetalSpectralShort",
  oilLubricant: "catOilLubricantShort",
  wear: "catWearShort",
  ferrography: "catFerrographyShort",
  particleCounter: "catParticleCounterShort",
  medical: "catMedicalShort",
};

export const PRODUCT_CATEGORY_BY_ID: Record<number, ProductCategoryKey> = {
  // Спектральный анализ металлов
  1: "metalSpectral", // FS500
  2: "metalSpectral", // FS800
  3: "metalSpectral", // FS500S
  4: "metalSpectral", // FS400
  5: "metalSpectral", // HCD1000
  6: "metalSpectral", // GDS8000
  7: "metalSpectral", // AU8000
  // Анализаторы масел и смазочных материалов
  8: "oilLubricant", // OIL8000
  9: "oilLubricant", // OIL8000H
  10: "oilLubricant", // PO100
  11: "oilLubricant", // PO200
  12: "oilLubricant", // PO300
  13: "oilLubricant", // IOA8000 / OA8000
  29: "oilLubricant", // TBN-200
  32: "oilLubricant", // VS600
  31: "oilLubricant", // VS800
  33: "oilLubricant", // DM100
  34: "oilLubricant", // JKJQ-1
  35: "oilLubricant", // WSKF-201
  // Анализаторы износа
  14: "wear", // PQ100
  15: "wear", // PQ200-PQL
  16: "wear", // PQ300(B)-PQL
  24: "wear", // PF100
  28: "wear", // PDA100
  // Феррография
  17: "ferrography", // PA100
  18: "ferrography", // PA200
  19: "ferrography", // PA300
  20: "ferrography", // PJ500
  21: "ferrography", // RF500
  22: "ferrography", // DR100
  23: "ferrography", // IFP100
  // Счетчики частиц
  25: "particleCounter", // SLPC100
  26: "particleCounter", // SLPC300 (+ optional SLPC300W module)
  27: "particleCounter", // OL-1
  30: "particleCounter", // PC550
  // Медицинские анализаторы
  36: "medical", // STS-A200
  37: "medical", // STS-M100
  38: "medical", // STS-M400
};

export function getProductCategoryKey(productId: number): ProductCategoryKey {
  return PRODUCT_CATEGORY_BY_ID[productId] ?? "metalSpectral";
}
