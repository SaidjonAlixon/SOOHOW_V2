const base = import.meta.env.BASE_URL;

export const CERTIFICATE_COUNT = 10;

export const certificatePaths = Array.from(
  { length: CERTIFICATE_COUNT },
  (_, i) => `${base}sertifikat/${i + 1}.jpg`,
);

export const CERTIFICATES_PER_SLIDE = 3;

/** Slide indices: [0,1,2], [3,4,5], [6,7,8], [9,0,1] … */
export function getCertificateSlideIndices(slide: number): number[] {
  return Array.from({ length: CERTIFICATES_PER_SLIDE }, (_, i) => {
    const index = slide * CERTIFICATES_PER_SLIDE + i;
    return index % CERTIFICATE_COUNT;
  });
}

export const certificateSlideCount = Math.ceil(CERTIFICATE_COUNT / CERTIFICATES_PER_SLIDE);
