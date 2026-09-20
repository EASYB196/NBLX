import blackcap from '../assets/images/CAPS/blackcap.png';
import blackcap2 from '../assets/images/CAPS/blackcap2.png';

import pinkcap from '../assets/images/CAPS/pinkcap.png';
import pinkcap2 from '../assets/images/CAPS/pinkcap2.png';

// import chainFront from '../assets/images/STORY/lifestyleImg.png';
// import chainBack from '../assets/images/showroom.jpg';


export const AccessoriesDatas = [
  {
    id: 'Black-Mesh-Cap',
    name: 'Crystallized Mesh Cap (black)',
    price: 25000,
    oldPrice: 300000,
    category: 'hats',

    inStock: 3,
    sizes: [],

    colors: [
      {
        // name: 'Black',
        // value: '#000000',
        // images: [blackcap, blackcap2],
      },
    ],

    image: blackcap,
    hoverImage: blackcap2,
  },

  {
    id: 'Pink-Mesh-Cap',
    name: 'Crystallized Mesh Cap (Pink)',
    price: 25000,
    oldPrice: 450000,
        category: 'hats',

    inStock: 8,
    sizes: [],

    colors: [
      {
        // name: 'Pink',
        // value: '#FFC0CB',
        // images: [pinkcap, pinkcap2],
      },
    ],

    image: pinkcap,
    hoverImage: pinkcap2,
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
