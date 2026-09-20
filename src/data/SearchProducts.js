import { BestSellerData } from "../data/BestSellerData";
import { AccessoriesDatas } from "./AccessoriesData";
import { TopDatas } from "../data/Tops";
import { DenimJeansDatas } from "../data/DenimJeanData";
import { PantsDatas } from "../data/PantsData";
import { OuterwearJacketsDatas } from "../data/OuterwearJacketsData";
import { ProductData } from "../data/ProductData";
import { TshirtDatas } from "../data/TshirtData";
import { FemalePantDatas } from "../data/FemalePant";
import { SkirtsDatas } from "../data/SkirtsData";
import { DressesDatas } from "../data/DressesData";
import { CropTopDatas } from "../data/CropTop";
import { HoodiesSweatshirtsDatas } from "../data/HoodiesSweatshirtsData";

export const UniqueSearchProducts = [
  ...BestSellerData.map((item) => ({
    ...item,
    route: `/bestseller/products/${item.id}`,
  })),

  ...AccessoriesDatas.map((item) => ({
    ...item,
    route: `/Accessories/${item.id}`,
  })),

  ...TopDatas.map((item) => ({
    ...item,
    route: `/tops/${item.id}`,
  })),

  ...DenimJeansDatas.map((item) => ({
    ...item,
    route: `/Denim-Jeans/${item.id}`,
  })),

  ...PantsDatas.map((item) => ({
    ...item,
    route: `/pants/${item.id}`,
  })),

  ...TshirtDatas.map((item) => ({
    ...item,
    route: `/t-shirt/${item.id}`,
  })),

  ...FemalePantDatas.map((item) => ({
    ...item,
    route: `/female-pant/${item.id}`,
  })),

  ...OuterwearJacketsDatas.map((item) => ({
    ...item,
    route: `/Outerwear-Jackets/${item.id}`,
  })),

  ...SkirtsDatas.map((item) => ({
    ...item,
    route: `/skirts/${item.id}`,
  })),

  ...DressesDatas.map((item) => ({
    ...item,
    route: `/dresses/${item.id}`,
  })),

  ...CropTopDatas.map((item) => ({
    ...item,
    route: `/crop-top/${item.id}`,
  })),

  ...HoodiesSweatshirtsDatas.map((item) => ({
    ...item,
    route: `/Hoodies-Sweatshirts/${item.id}`,
  })),

  ...ProductData.map((item) => ({
    ...item,
    route: `/products/${item.id}`,
  })),
];