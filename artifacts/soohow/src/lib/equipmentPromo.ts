const base = import.meta.env.BASE_URL;

export type EquipmentPromoSlide = {
  id: string;
  image: string;
  productId: number;
};

/** Yangi uskunalar reklama slaydlari — `public/uskunalar/` ga rasm qo'shsangiz, shu yerga qo'shing */
export const equipmentPromoSlides: EquipmentPromoSlide[] = [
  { id: "fs500", image: `${base}uskunalar/FS500.png`, productId: 1 },
  { id: "fs800", image: `${base}uskunalar/FS800.png`, productId: 2 },
  { id: "fs500s", image: `${base}uskunalar/fs500s.png`, productId: 3 },
  { id: "fs400", image: `${base}uskunalar/FS400.png`, productId: 4 },
  { id: "hcd1000", image: `${base}uskunalar/HCD%201000.png`, productId: 5 },
  { id: "gds8000", image: `${base}uskunalar/GDS8000.png`, productId: 6 },
  { id: "au8000", image: `${base}uskunalar/AU8000.png`, productId: 7 },
  { id: "oil8000", image: `${base}uskunalar/OIL8000.png`, productId: 8 },
  { id: "oil8000h", image: `${base}uskunalar/OIL8000H.png`, productId: 9 },
  { id: "po100", image: `${base}uskunalar/PO100.png`, productId: 10 },
  { id: "po200", image: `${base}uskunalar/PO200.png`, productId: 11 },
  { id: "po300", image: `${base}uskunalar/PO300.png`, productId: 12 },
];

export const EQUIPMENT_PROMO_INTERVAL_MS = 5000;
