// import greatmindcroptee from "../assets/images/MEN/T-Shirt/NXblackFcroptop.jpg";
// import greatmindcropteebv from "../assets/images/MEN/T-Shirt/NXblackbcroptop.jpg";

// export const TopDatas = [
//  {
//     id: "GREATMINDS CROP TEE",
//     name: "Greatminds Crop Tee",
//     price: 45000,
//     oldPrice: 3450000,
//     inStock: 3,
//     sizes: ["S", "M", "L", "XL", "XXL", "3XS"],
//     image: greatmindcroptee,
//     hoverImage: greatmindcropteebv,
//   },

// ];



import greatmindcroptee from '../assets/images/MEN/T-Shirt/NXblackFcroptop.jpg';
import greatmindcropteebv from '../assets/images/MEN/T-Shirt/NXblackbcroptop.jpg';

import greatmindcropteeWhite from '../assets/images/MEN/T-Shirt/greatmindcropteeWhite.jpg';
import greatmindcropteeWhiteBV from '../assets/images/MEN/T-Shirt/greatmindcropteeWhiteBV.jpg';

import greatmindcropteeRed from '../assets/images/MEN/T-Shirt/greatmindcropteeRed.jpg';
import greatmindcropteeRedBV from '../assets/images/MEN/T-Shirt/greatmindcropteeRedBV.jpg';
export const TopDatas = [
  {
    id: 'GREATMINDS-CROP-TEE',
    name: 'Greatminds Crop Tee',
    price: 45000,
    oldPrice: 55000,
    inStock: 3,

    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

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
        name: 'red',
        value: '#FF0000',
        images: [greatmindcropteeRed, greatmindcropteeRedBV],
      },
    ],

    image: greatmindcroptee,
    hoverImage: greatmindcropteebv,

    description:
      'Designed for an effortless modern look, this heavyweight cotton tee features a relaxed drop-shoulder cut with reinforced stitching for long-lasting durability.',

    features: [
      'Oversized boxy fit',
      'Drop-shoulder seam construction',
      'Thick ribbed collar',
      'Pre-shrunk fabric finish',
    ],

    fabric: '100% Premium Heavyweight Cotton (240 GSM)',

    care: [
      'Machine wash cold inside out',
      'Tumble dry low',
      'Do not iron directly on print',
      'Do not bleach',
    ],
  },
];

export const sizeCharts = {
  'GREATMINDS-CROP-TEE': {
    title: 'Greatminds Crop Tee Size Guide',
    fit: 'Oversized / Boxy Fit',
    columns: ['Size', 'Chest (in)', 'Shoulder (in)', 'Length (in)'],
    rows: [
      ['S', '40-42', '18', '24'],
      ['M', '42-44', '19', '25'],
      ['L', '44-46', '20', '26'],
      ['XL', '46-48', '21', '27'],
      ['XXL', '48-50', '22', '28'],
      ['3XL', '50-52', '23', '29'],
    ],
  },
};
