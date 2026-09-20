

import pinkcap from '../assets/images/CAPS/pinkcap.png';
import pinkcap2 from '../assets/images/CAPS/pinkcap2.png';

import blackcap from '../assets/images/CAPS/blackcap.png';
import blackcap2 from '../assets/images/CAPS/blackcap2.png';

import Armlesshoodie from '../assets/images/MEN/Hoodie/armlesshoodie.png';
import Armlesshoodiebackview from '../assets/images/MEN/Hoodie/armlesshoodiebackview.png';

import greatmindcroptee from '../assets/images/MEN/T-Shirt/NXblackFcroptop.jpg';
import greatmindcropteebv from '../assets/images/MEN/T-Shirt/NXblackbcroptop.jpg';

import greatmindcropteeWhite from '../assets/images/MEN/T-Shirt/greatmindcropteeWhite.jpg';
import greatmindcropteeWhiteBV from '../assets/images/MEN/T-Shirt/greatmindcropteeWhiteBV.jpg';

import greatmindcropteeRed from '../assets/images/MEN/T-Shirt/greatmindcropteeRed.jpg';
import greatmindcropteeRedBV from '../assets/images/MEN/T-Shirt/greatmindcropteeRedBV.jpg';

import crystallizedtanktop from '../assets/images/MEN/T-Shirt/white-stud-tanktop-Fv.jpg';
import crystallizedtanktopbv from '../assets/images/MEN/T-Shirt/white-stud-tanktop-Bv.jpg';

export const FullBestSellerData = [
  {
    id: 'GREATMINDS CROP TEE',
    name: 'Greatminds Crop Tee',
    price: 45000,
    oldPrice: 3450000,
    inStock: 3,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [greatmindcroptee, greatmindcropteebv],
      },
      {
        name: 'White',
        value: '#FFFFFF',
        images: [greatmindcropteeWhite, greatmindcropteeWhiteBV],
      },
      {
        name: 'Red',
        value: '#FF0000',
        images: [greatmindcropteeRed, greatmindcropteeRedBV],
      },
    ],

    image: greatmindcroptee,
    hoverImage: greatmindcropteebv,
  },

  {
    id: 'Crystallized-Tanktop',
    name: 'Crystallized Tanktop',
    price: 45000,
    oldPrice: 45000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],

    colors: [
      {
        name: 'White',
        value: '#FFFFFF',
        images: [crystallizedtanktop, crystallizedtanktopbv],
      },
    ],

    image: crystallizedtanktop,
    hoverImage: crystallizedtanktopbv,
  },

  {
    id: 'Pink-Mesh-Cap',
    name: 'Crystallized Mesh Cap (Pink)',
    price: 25000,
    oldPrice: 450000,
    inStock: 8,
    sizes: [],

    colors: [
      {
        name: 'Pink',
        value: '#FFC0CB',
        images: [pinkcap, pinkcap2],
      },
    ],

    image: pinkcap,
    hoverImage: pinkcap2,
  },

  {
    id: 'Hooded-Tank-Top',
    name: 'RawCut Sleeveless Hoodie',
    price: 45000,
    oldPrice: 320000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [Armlesshoodie, Armlesshoodiebackview],
      },
    ],

    image: Armlesshoodie,
    hoverImage: Armlesshoodiebackview,
  },

  {
    id: 'Black-Mesh-Cap',
    name: 'Crystallized Mesh Cap (black)',
    price: 25000,
    oldPrice: 300000,
    inStock: 3,
    sizes: [],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [blackcap, blackcap2],
      },
    ],

    image: blackcap,
    hoverImage: blackcap2,
  },
];

export const BestSellerData = FullBestSellerData.slice(0, 16);
