import blackcap from '../assets/images/CAPS/blackcap.png';
import blackcap2 from '../assets/images/CAPS/blackcap2.png';

import pinkcap from '../assets/images/CAPS/pinkcap.png';
import pinkcap2 from '../assets/images/CAPS/pinkcap2.png';

// import chainFront from '../assets/images/STORY/lifestyleImg.png';
// import chainBack from '../assets/images/showroom.jpg';

import graffitihalo from '../assets/images/CAPS/graffitihalo.jpg';
import grovestreet from '../assets/images/CAPS/grovestreet.jpg';

export const AccessoriesDatas = [

{
  id: 'Mesh-Cap',
  name: 'Crystallized Mesh Cap',
  price: 25000,
  oldPrice: 30000,
  category: 'hats',

  inStock: 8,
  sizes: [],

  colors: [
    {
      name: 'Black',
      value: '#000000',
      images: [blackcap, blackcap2],
    },
    {
      name: 'Pink',
      value: '#FFC0CB',
      images: [pinkcap, pinkcap2],
    },
  ],

  image: blackcap,
  hoverImage: blackcap2,

  description:
    'The Crystallized Mesh Cap combines a structured silhouette with breathable mesh construction and distinctive crystallized detailing. Available in black and pink, it adds a statement finish to everyday streetwear.',

  features: [
    'Structured cap silhouette',
    'Breathable mesh panels',
    'Crystallized embellishments',
    'Adjustable strap closure',
  ],

  fabric: 'Premium Polyester & Breathable Mesh',

  care: [
    'Spot clean with a soft damp cloth',
    'For deeper cleaning, gently hand wash in cool water',
    'Use mild detergent',
    'Do not bleach',
    'Do not wring, twist, or scrub aggressively',
    'Air dry naturally and reshape while damp',
    'Do not tumble dry',
    'Avoid ironing directly on the mesh or embellishments',
  ],
},

  {
    id: 'Graffiti-Halo',
    name: 'Graffiti Halo',
    price: 25000,
    oldPrice: 450000,
    category: 'hats',

    inStock: 8,
    sizes: [],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [graffitihalo],
      },
    ],

    image: graffitihalo,
    hoverImage: graffitihalo,

    description:
      'The Graffiti Halo delivers a clean, understated look designed for everyday streetwear. Its black finish makes it easy to pair with a wide range of casual outfits.',

    features: [
      'Classic beanie silhouette',
      'Black finish',
      'Versatile everyday streetwear accessory',
    ],

    fabric: 'Not specified',

    care: [
      'Follow the care instructions provided with the product',
      'Spot clean gently when needed',
      'Allow to air dry naturally',
    ],
  },

  {
    id: 'Grove-Street',
    name: 'grovestreet',
    price: 25000,
    oldPrice: 450000,
    category: 'hats',

    inStock: 8,
    sizes: [],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [grovestreet],
      },
    ],

    image: grovestreet,
    hoverImage: grovestreet,

    description:
      'The grovestreet delivers a clean, understated look designed for everyday streetwear. Its black finish makes it easy to pair with a wide range of casual outfits.',

    features: [
      'Classic beanie silhouette',
      'Black finish',
      'Versatile everyday streetwear accessory',
    ],

    fabric: 'Not specified',

    care: [
      'Follow the care instructions provided with the product',
      'Spot clean gently when needed',
      'Allow to air dry naturally',
    ],
  },

  // {
  //   id: 'nblx-signature-chain',
  //   name: 'NBLX Signature Chain',
  //   category: 'jewelry',
  //   price: 35000,
  //   oldPrice: 45000,
  //   inStock: 5,
  //   sizes: [],
  //   colors: [
  //     {
  //       name: 'Silver',
  //       value: '#C0C0C0',
  //       images: [chainFront, chainBack],
  //     },
  //   ],
  //   image: chainFront,
  //   hoverImage: chainBack,
  // },
];
