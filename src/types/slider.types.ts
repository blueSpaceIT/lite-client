// types/index.ts

export type TSlider = {
  result: TSliderGallery[]; // ✅ REQUIRED
  meta?: {
    page: number;
    limit: number;
    totalPage: number;
    totalDoc: number;
  };
};

export type TSliderGallery = {
  _id: string;
  id: string;
  url: string;
  destination: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};
