import { BestSellerData } from "../data/BestSellerData";
import { AccessoriesDatas } from "./AccessoriesData";
import { TopDatas } from "../data/Tops";
import { DenimJeansDatas } from "../data/DenimJeanData";
import { PantsDatas } from "../data/PantsData";
import { OuterwearJacketsDatas } from "../data/OuterwearJacketsData";
import { ProductData } from "../data/ProductData";

export const UniqueSearchProducts = [
  ...BestSellerData,
  ...AccessoriesDatas,
  ...TopDatas,
  ...DenimJeansDatas,
  ...PantsDatas,
  ...OuterwearJacketsDatas,
  ...ProductData,
];
