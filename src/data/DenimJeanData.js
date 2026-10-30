import elegantcargojean from '../assets/images/MEN/Jeans/white_cargopant_frontv.png';
import elegantcargojeanbv from '../assets/images/MEN/Jeans/white_cargopant_sidev.png';

import imperialblossomcargodenim from '../assets/images/MEN/Jeans/imperialblossomcargodenim.jpg';
import imperialblossomcargodenimbv from '../assets/images/MEN/Jeans/imperialblossomcargodenimbv.jpg';

import HeritageDenimTrousersFV from '../assets/images/MEN/Pants/HeritageDenimTrousersFV.jpg';
import HeritageDenimTrousersBV from '../assets/images/MEN/Pants/HeritageDenimTrousersBV.jpg';

import HeritageDenimShortsFV from '../assets/images/MEN/Pants/HeritageDenimShortsFV.jpg';
import HeritageDenimShortsBV from '../assets/images/MEN/Pants/HeritageDenimShortsBV.jpg';

export const DenimJeansDatas = [
  {
    id: 'elegant-cargo-jean',
    name: 'Elegant Cargo Jean',
    price: 50000,
    oldPrice: 1000000,
    inStock: 7,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

    image: elegantcargojean,
    hoverImage: elegantcargojeanbv,

    description:
      'A modern cargo jean featuring a clean silhouette, durable utility pockets, and functional detailing for a versatile everyday luxury look.',

    features: [
      'Modern utility cargo silhouette',
      'Functional multi-pocket cargo detailing',
      'Heavyweight premium denim construction',
      'Versatile styling for streetwear rotation',
    ],

    fabric: '100% Premium Cotton Denim',

    care: [
      'Machine wash cold inside out with like colors',
      'Turn inside out before washing',
      'Do not bleach',
      'Air dry recommended',
      'Warm iron if needed',
    ],
  },

  {
    id: 'imperial-blossom-cargo-denim',
    name: 'Imperial Blossom Cargo Denim',
    price: 65000,
    oldPrice: 1543000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

    image: imperialblossomcargodenim,
    hoverImage: imperialblossomcargodenimbv,

    description:
      'The Imperial Blossom Cargo Denim fuses rugged utility with intricate aesthetic detailing, delivering a statement silhouette tailored for modern luxury streetwear.',

    features: [
      'Statement cargo denim silhouette',
      'Signature embroidered motif details',
      'Spacious utility pockets with custom hardware',
      'Rigid yet comfortable high-grade denim weave',
    ],

    fabric: '100% Heavyweight Cotton Denim',

    care: [
      'Machine wash cold inside out with like colors',
      'Line dry in shade to preserve wash integrity',
      'Do not bleach',
      'Warm iron inside out',
    ],
  },

  {
    id: 'heritage-cuffed-denim-trousers',
    name: ' Heritage Cuffed Denim Trousers',
    price: 85000,
    oldPrice: 110000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

    image: HeritageDenimTrousersFV,
    hoverImage: HeritageDenimTrousersBV,

    description:
      'Engineered from 14 oz heavyweight raw indigo denim, the  Heritage Cuffed Denim Trousers feature architectural front-to-back vertical seam paneling, a full-cut wide-leg silhouette, and thick turned-up selvedge-style cuffed hems. Designed to pair with the Heritage Denim Jacket to form a unified luxury raw denim ensemble.',

    features: [
      'Architectural front-to-back vertical seam paneling',
      'Wide-leg silhouette with structured cuffed hem finish',
      'Classic 5-pocket layout with custom silver-tone hardware',
      'Tonal topstitching with high-rise waist construction',
      'Heavyweight 14 oz raw indigo cotton denim',
    ],

    fabric: '100% Heavyweight Cotton Raw Denim (14 oz)',

    care: [
      'Dry clean recommended to preserve raw deep indigo finish',
      'Machine wash cold inside out with like colors',
      'Do not bleach',
      'Hang dry to prevent shrinkage',
      'Warm iron inside out if needed',
    ],
  },

  {
    id: 'heritage-paneled-denim-shorts',
    name: ' Heritage Paneled Denim Shorts',
    price: 65000,
    oldPrice: 85000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

    image: HeritageDenimShortsFV,
    hoverImage: HeritageDenimShortsBV,

    description:
      'Engineered from heavyweight deep indigo raw denim, the  Heritage Paneled Denim Shorts feature architectural vertical seam work, a wide knee-length silhouette, and minimalist NBLx cross embroidery. Tailored to match the Heritage Denim Jacket as a complete set.',

    features: [
      'Architectural front-to-back vertical paneling',
      'Wide-leg, knee-length relaxed luxury fit',
      'Precision white NBLx logo and cross embroidery under pocket',
      'Classic 5-pocket construction with custom hardware',
      'Heavyweight raw indigo finish with contrast topstitching',
    ],

    fabric: '100% Heavyweight Cotton Raw Denim (14 oz)',

    care: [
      'Dry clean recommended to preserve raw deep indigo tone',
      'Machine wash cold inside out with like colors',
      'Do not bleach',
      'Hang dry to prevent shrinkage',
      'Warm iron inside out if needed',
    ],
  },
];

export const denimJeansSizeCharts = {
  'elegant-cargo-jean': {
    title: 'Elegant Cargo Jean Size Guide',
    fit: 'Cargo Fit',
    columns: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Length (in)'],
    rows: [
      ['S', '28-30', '38', '30', '40'],
      ['M', '30-32', '40', '30.5', '41'],
      ['L', '32-34', '42', '31', '42'],
      ['XL', '34-36', '44', '31.5', '43'],
      ['XXL', '36-38', '46', '32', '44'],
      ['3XL', '38-40', '48', '32.5', '45'],
    ],
  },

  'imperial-blossom-cargo-denim': {
    title: 'Imperial Blossom Cargo Denim Size Guide',
    fit: 'Relaxed Cargo Fit',
    columns: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Length (in)'],
    rows: [
      ['S', '28-30', '39', '30', '40.5'],
      ['M', '30-32', '41', '30.5', '41.5'],
      ['L', '32-34', '43', '31', '42.5'],
      ['XL', '34-36', '45', '31.5', '43.5'],
      ['XXL', '36-38', '47', '32', '44.5'],
      ['3XL', '38-40', '49', '32.5', '45.5'],
    ],
  },

  'heritage-cuffed-denim-trousers': {
    title: ' Heritage Cuffed Denim Trousers Size Guide',
    fit: 'Wide-Leg Fit',
    columns: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Length (in)'],
    rows: [
      ['S', '28-30', '40-42', '30.0', '41.0'],
      ['M', '30-32', '42-44', '30.5', '42.0'],
      ['L', '32-34', '44-46', '31.0', '43.0'],
      ['XL', '34-36', '46-48', '31.5', '44.0'],
      ['XXL', '36-38', '48-50', '32.0', '45.0'],
      ['3XL', '38-40', '50-52', '32.5', '46.0'],
    ],
  },

  'heritage-paneled-denim-shorts': {
    title: ' Heritage Paneled Denim Shorts Size Guide',
    fit: 'Relaxed Short Fit',
    columns: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Outseam (in)'],
    rows: [
      ['S', '28-30', '40-42', '12.0', '23.0'],
      ['M', '30-32', '42-44', '12.5', '23.5'],
      ['L', '32-34', '44-46', '13.0', '24.0'],
      ['XL', '34-36', '46-48', '13.5', '24.5'],
      ['XXL', '36-38', '48-50', '14.0', '25.0'],
      ['3XL', '38-40', '50-52', '14.5', '25.5'],
    ],
  },
};