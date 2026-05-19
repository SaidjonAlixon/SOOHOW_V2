const base = import.meta.env.BASE_URL;

export type EquipmentPromoSlide = {
  id: string;
  image: string;
  productId: number;
};

/** Yangi uskunalar reklama slaydlari — `public/uskunalar/` ga rasm qo'shsangiz, shu yerga qo'shing */
export const equipmentPromoSlides: EquipmentPromoSlide[] = [
  { id: "fs500", image: `${base}uskunalar/FS500.png`, productId: 1 },
  { id: "home-p1", image: `${base}HOME/HOME_P1.jpeg`, productId: 2 },
  { id: "home-p2", image: `${base}HOME/HOME_P2.jpeg`, productId: 3 },
  { id: "home-p3", image: `${base}HOME/HOME_P3.jpeg`, productId: 4 },
];

export const EQUIPMENT_PROMO_INTERVAL_MS = 5000;
