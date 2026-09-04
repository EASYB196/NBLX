import { BestSellerData } from '../data/BestSellerData';
import { HatsDatas } from '../data/HatsData';
import { TopDatas } from '../data/Tops';
import { DenimJeansDatas } from '../data/DenimJeanData';
import {PantsDatas} from '../data/PantsData'
import { OuterwearJacketsDatas } from '../data/OuterwearJacketsData';
import { ProductData } from '../data/ProductData';

export const UniqueSearchProducts = [
  ...BestSellerData,
  ...HatsDatas,
  ...TopDatas,
  ...DenimJeansDatas,
  ...PantsDatas,
  ...OuterwearJacketsDatas,
  ...ProductData,
];
