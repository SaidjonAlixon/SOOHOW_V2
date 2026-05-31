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
  { id: "oa8000", image: `${base}uskunalar/IOA8000.png`, productId: 13 },
  { id: "pq100", image: `${base}uskunalar/PQ100.png`, productId: 14 },
  { id: "pq200", image: `${base}uskunalar/PQ200.png`, productId: 15 },
  { id: "pq300b", image: `${base}uskunalar/PQ300%28B%29.jpg`, productId: 16 },
  { id: "pa100", image: `${base}uskunalar/PA100.png`, productId: 17 },
  { id: "pa200", image: `${base}uskunalar/PA200.png`, productId: 18 },
  { id: "pa300", image: `${base}uskunalar/PA300.png`, productId: 19 },
  { id: "pj500", image: `${base}uskunalar/PJ500.jpg`, productId: 20 },
  { id: "rf500", image: `${base}uskunalar/RF500.png`, productId: 21 },
  { id: "dr100", image: `${base}uskunalar/DR100.png`, productId: 22 },
  { id: "ifp100", image: `${base}uskunalar/IFP100.png`, productId: 23 },
  { id: "pf100", image: `${base}uskunalar/PF100.jpg`, productId: 24 },
  { id: "slpc100", image: `${base}uskunalar/SLPC%20100.png`, productId: 25 },
  { id: "slpc300", image: `${base}uskunalar/SLPC300.png`, productId: 26 },
  { id: "ol1", image: `${base}uskunalar/OL-1.png`, productId: 27 },
  { id: "pda100", image: `${base}uskunalar/PDA100.png`, productId: 28 },
  { id: "tbn200", image: `${base}uskunalar/TBN-200.png`, productId: 29 },
  { id: "pc550", image: `${base}uskunalar/PC550.png`, productId: 30 },
  { id: "vs800", image: `${base}uskunalar/VS800.png`, productId: 31 },
  { id: "vs600", image: `${base}uskunalar/VS600.png`, productId: 32 },
  { id: "dm100", image: `${base}uskunalar/DM%20100.jpg`, productId: 33 },
  { id: "jkjq1", image: `${base}uskunalar/JKJQ-1.png`, productId: 34 },
  { id: "wskf201", image: `${base}uskunalar/WSKF-201.png`, productId: 35 },
  { id: "stsa200", image: `${base}uskunalar/STS-A200.png`, productId: 36 },
  { id: "stsm100", image: `${base}uskunalar/STS-M100.jpg`, productId: 37 },
  { id: "stsm400", image: `${base}uskunalar/STS-M400.png`, productId: 38 },
];

export const EQUIPMENT_PROMO_INTERVAL_MS = 5000;
