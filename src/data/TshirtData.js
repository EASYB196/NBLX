import greatmindcroptee from '../assets/images/MEN/T-Shirt/NXblackFcroptop.jpg';
import greatmindcropteebv from '../assets/images/MEN/T-Shirt/NXblackbcroptop.jpg';

import greatmindcropteeWhite from '../assets/images/MEN/T-Shirt/greatmindcropteeWhite.jpg';
import greatmindcropteeWhiteBV from '../assets/images/MEN/T-Shirt/greatmindcropteeWhiteBV.jpg';

import greatmindcropteeRed from '../assets/images/MEN/T-Shirt/greatmindcropteeRed.jpg';
import greatmindcropteeRedBV from '../assets/images/MEN/T-Shirt/greatmindcropteeRedBV.jpg';

import crowntshirt from '../assets/images/MEN/T-Shirt/builtcrop-tshirt.jpg';
import crowntshirtbv from '../assets/images/MEN/T-Shirt/builtbackcrop-tshirt.jpg';

import samefacescollaredbuttonupshirt from '../assets/images/MEN/T-Shirt/same faces collared button-up shirt.jpg';
import samefacescollaredbuttonupshirtbv from '../assets/images/MEN/T-Shirt/same faces collared button-up shirtbv.jpg';

import hotlineheavyweighttee from '../assets/images/MEN/T-Shirt/hotline-heavyweight-tee-FV.jpg';
import hotlineheavyweightteebv from '../assets/images/MEN/T-Shirt/hotline-heavyweight-tee-BV.jpg';

import hotlineheavyweightteegreen from '../assets/images/MEN/T-Shirt/hotlineheavyweightteegreen.jpg';
import hotlineheavyweightteegreenbv from '../assets/images/MEN/T-Shirt/hotlineheavyweightteegreenBV.jpg';

import hotlineheavyweightteebrown from '../assets/images/MEN/T-Shirt/hotlineheavyweightteebrown.jpg';
import hotlineheavyweightteebrownbv from '../assets/images/MEN/T-Shirt/hotlineheavyweightteegreenBV.jpg';

import goodtimesheavyweightgraphictee from '../assets/images/MEN/T-Shirt/goodtimesheavyweighgraphictee.jpg';
import goodtimesheavyweightgraphicteebv from '../assets/images/MEN/T-Shirt/goodtimesheavyweighgraphicteebv.jpg';

import blackgoodtimesheavyweightgraphictee from '../assets/images/MEN/T-Shirt/blackgoodtimesheavyweighgraphictee.jpg';
import blackgoodtimesheavyweightgraphicteebv from '../assets/images/MEN/T-Shirt/blackgoodtimesheavyweighgraphicteebv.jpg';

import obsidianthermalribbedtank from '../assets/images/MEN/T-Shirt/ObsidianThermalRibbed Tank.jpg';
import obsidianthermalribbedtankbv from '../assets/images/MEN/T-Shirt/ObsidianThermalRibbed Tankbv.jpg';

import metalspinefittedtee from '../assets/images/MEN/T-Shirt/metalspinefittedtee.jpg';
import metalspinefittedteebv from '../assets/images/MEN/T-Shirt/metalspinefittedteebv.jpg';

import whitemetalspinefittedtee from '../assets/images/MEN/T-Shirt/whitemetalspinefittedtee.jpg';
import whitemetalspinefittedteebv from '../assets/images/MEN/T-Shirt/whitemetalspinefittedteebv.jpg';

import blacktanktop from '../assets/images/MEN/T-Shirt/blacktanktop-Fv.jpg';
import blacktanktopbv from '../assets/images/MEN/T-Shirt/black-tank-top-Bv.jpg';

import reglanshirtfv from '../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt FV.jpg';
import reglanshirtbv from '../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt BV.jpg';

import oversizedcrewnecktshirtfv from '../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt FV.jpg';
import oversizedcrewnecktshirtfvbv from '../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt BV.jpg';

import oversizedcrewnecktshirtblackfv from '../assets/images/MEN/T-Shirt/black oversized crew-neck t-shirt FV.jpg';
import oversizedcrewnecktshirtblackfvbv from '../assets/images/MEN/T-Shirt/black oversized crew-neck t-shirt BV.jpg';

export const TshirtDatas = [
  {
    id: 'greatminds-crop-tee',
    name: 'Greatminds Crop Tee',
    price: 45000,
    oldPrice: 55000,
    inStock: 3,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    // COLOR VARIANTS
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

      /*
      Add another color when you have its images:

      {
        name: 'White',
        value: '#FFFFFF',
        images: [
          greatmindsWhiteFV,
          greatmindsWhiteBV,
          greatmindsWhiteSide,
          greatmindsWhiteDetail,
        ],
      },
      */
    ],

    // DEFAULT IMAGES FOR PRODUCT CARDS

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

  {
    id: 'hotline-heavyweight-tee',
    name: 'Hotline Heavyweight Tee',
    price: 50000,
    oldPrice: 65000,
    inStock: 7,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    // Add colors here when the actual color-specific images are available.
    colors: [
      {
        name: 'yellow',
        value: '#FFFF0066',
        images: [hotlineheavyweighttee, hotlineheavyweightteebv],
      },
      {
        name: 'Brown',
        value: '#8B4513',
        images: [hotlineheavyweightteebrown, hotlineheavyweightteebrownbv],
      },
      {
        name: 'Green',
        value: '#003D00',
        images: [hotlineheavyweightteegreen, hotlineheavyweightteegreenbv],
      },

      /*
      Add another color when you have its images:

      {
        name: 'White',
        value: '#FFFFFF',
        images: [
          greatmindsWhiteFV,
          greatmindsWhiteBV,
          greatmindsWhiteSide,
          greatmindsWhiteDetail,
        ],
      },
      */
    ],

    image: hotlineheavyweighttee,
    hoverImage: hotlineheavyweightteebv,

    description:
      'Elevate your casual style with the Hotline Heavyweight Tee. Crafted from combed cotton, it offers a refined silhouette featuring clean seam lines and maximum breathability.',

    features: [
      'Standard brown fit',
      'Reinforced crew neck collar',
      'Breathable weave for all-day comfort',
      'Anti-pilling finish',
    ],

    fabric: '100% Combed Organic Cotton (200 GSM)',

    care: [
      'Machine wash cold with like colors',
      'Line dry in shade',
      'Warm iron if needed',
      'Do not dry clean',
    ],
  },

  {
    id: 'same faces collared button-up shirt',
    name: 'Same Faces Collared Button-Up Shirt',
    price: 50000,
    oldPrice: 65000,
    inStock: 7,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    // Add colors here when the actual color-specific images are available.
    colors: [],

    image: samefacescollaredbuttonupshirt,
    hoverImage: samefacescollaredbuttonupshirtbv,

    description:
      'Elevate your casual style with the Same Faces Collared Button-Up Shirt. Crafted from combed cotton, it offers a refined silhouette featuring clean seam lines and maximum breathability.',

    features: [
      'Standard tailored fit',
      'Reinforced crew neck collar',
      'Breathable weave for all-day comfort',
      'Anti-pilling finish',
    ],

    fabric: '100% Combed Organic Cotton (200 GSM)',

    care: [
      'Machine wash cold with like colors',
      'Line dry in shade',
      'Warm iron if needed',
      'Do not dry clean',
    ],
  },

  {
    id: 'crown-tshirt',
    name: 'Crown T-Shirt',
    price: 50000,
    oldPrice: 65000,
    inStock: 7,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    // Add colors here when the actual color-specific images are available.
    colors: [],

    image: crowntshirt,
    hoverImage: crowntshirtbv,

    description:
      'Elevate your casual style with the Crown T-Shirt. Crafted from combed cotton, it offers a refined silhouette featuring clean seam lines and maximum breathability.',

    features: [
      'Standard tailored fit',
      'Reinforced crew neck collar',
      'Breathable weave for all-day comfort',
      'Anti-pilling finish',
    ],

    fabric: '100% Combed Organic Cotton (200 GSM)',

    care: [
      'Machine wash cold with like colors',
      'Line dry in shade',
      'Warm iron if needed',
      'Do not dry clean',
    ],
  },

  {
    id: 'metalspinefittedtee',
    name: 'Metal Spine Fitted Tee',
    price: 30000,
    oldPrice: 38000,
    inStock: 5,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [metalspinefittedtee, metalspinefittedteebv],
      },
      {
        name: 'White',
        value: '#FFFFFF',
        images: [whitemetalspinefittedtee, whitemetalspinefittedteebv],
      },
    ],

    image: metalspinefittedtee,
    hoverImage: metalspinefittedteebv,

    description:
      'A timeless streetwear staple engineered for mobility and layered styling. Features a contoured cut with stretch ribbing for a flexible fit.',

    features: [
      'Deep armhole design for unrestricted movement',
      'Slightly elongated rounded hem',
      'Ribbed trim details',
      'Moisture-wicking jersey structure',
    ],

    fabric: '95% Ribbed Cotton, 5% Elastane',

    care: [
      'Machine wash gentle cold',
      'Do not tumble dry',
      'Cool iron inside out',
      'Wash with dark colors',
    ],
  },

  {
    id: 'goodtimes-heavyweight-graphictee',
    name: 'Good Times Heavyweight Graphic Tee',
    price: 45000,
    oldPrice: 58000,
    inStock: 4,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      {
        name: 'White',
        value: '#FFFFFF',
        images: [goodtimesheavyweightgraphictee, goodtimesheavyweightgraphicteebv],
      },
      {
        name: 'Black',
        value: '#000000',
        images: [blackgoodtimesheavyweightgraphictee, blackgoodtimesheavyweightgraphicteebv],
      },
    ],

    image: goodtimesheavyweightgraphictee,
    hoverImage: goodtimesheavyweightgraphicteebv,

    description:
      'The ultimate everyday basic. Cut from high-density jersey fabric with a boxy silhouette and a structured collar that maintains its shape wash after wash.',

    features: [
      'Relaxed oversized silhouette',
      'Heavyweight 1x1 rib knit collar',
      'Pre-shrunk cotton jersey',
      'Clean minimalist stitching',
    ],

    fabric: '100% Ring-Spun Heavyweight Cotton (250 GSM)',

    care: [
      'Machine wash cold with light colors',
      'Hang dry recommended',
      'Iron on low heat',
      'Do not bleach',
    ],
  },

  {
    id: 'obsidianthermalribbedtank',
    name: 'Obsidian Thermal Ribbed Tank',
    price: 30000,
    oldPrice: 38000,
    inStock: 5,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      {
        name: 'Black',
        value: '#000000',
        images: [obsidianthermalribbedtank, obsidianthermalribbedtankbv],
      },
    ],

    image: obsidianthermalribbedtank,
    hoverImage: obsidianthermalribbedtankbv,

    description:
      'A timeless streetwear staple engineered for mobility and layered styling. Features a contoured cut with stretch ribbing for a flexible fit.',

    features: [
      'Deep armhole design for unrestricted movement',
      'Slightly elongated rounded hem',
      'Ribbed trim details',
      'Moisture-wicking jersey structure',
    ],

    fabric: '95% Ribbed Cotton, 5% Elastane',

    care: [
      'Machine wash gentle cold',
      'Do not tumble dry',
      'Cool iron inside out',
      'Wash with dark colors',
    ],
  },

  {
    id: 'black-tanktop',
    name: 'Essential Black Tanktop',
    price: 30000,
    oldPrice: 38000,
    inStock: 5,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      // {
      //   name: 'Black',
      //   value: '#000000',
      //   images: [blacktanktop, blacktanktopbv],
      // },
    ],

    image: blacktanktop,
    hoverImage: blacktanktopbv,

    description:
      'A timeless streetwear staple engineered for mobility and layered styling. Features a contoured cut with stretch ribbing for a flexible fit.',

    features: [
      'Deep armhole design for unrestricted movement',
      'Slightly elongated rounded hem',
      'Ribbed trim details',
      'Moisture-wicking jersey structure',
    ],

    fabric: '95% Ribbed Cotton, 5% Elastane',

    care: [
      'Machine wash gentle cold',
      'Do not tumble dry',
      'Cool iron inside out',
      'Wash with dark colors',
    ],
  },

  {
    id: 'raglan-shirt',
    name: 'Black & White Raglan Shirt',
    price: 40000,
    oldPrice: 52000,
    inStock: 4,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      // {
      //   name: 'Black & White',
      //   value: 'linear-gradient(135deg, #000000 0%, #000000 50%, #ffffff 50%, #ffffff 100%)',
      //   images: [reglanshirtfv, reglanshirtbv],
      // },
    ],

    image: reglanshirtfv,
    hoverImage: reglanshirtbv,

    description:
      'A modern classic featuring contrasting long raglan sleeves and a relaxed torso cut, delivering iconic sports-heritage aesthetics.',

    features: [
      'Contrast raglan sleeve paneling',
      'Curved bottom hem',
      'Double-needle sleeve and bottom hem stitching',
      'Ultra-soft handfeel',
    ],

    fabric: '100% Soft Cotton Interlock (220 GSM)',

    care: [
      'Machine wash cold inside out',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not bleach',
    ],
  },

  {
    id: 'oversized-crew-neck-tshirt',
    name: 'Oversized Crew Neck T-Shirt',
    price: 45000,
    oldPrice: 58000,
    inStock: 4,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    colors: [
      {
        name: 'White',
        value: '#FFFFFF',
        images: [oversizedcrewnecktshirtfv, oversizedcrewnecktshirtfvbv],
      },
      {
        name: 'Black',
        value: '#000000',
        images: [oversizedcrewnecktshirtblackfv, oversizedcrewnecktshirtblackfvbv],
      },
    ],

    image: oversizedcrewnecktshirtfv,
    hoverImage: oversizedcrewnecktshirtfvbv,

    description:
      'The ultimate everyday basic. Cut from high-density jersey fabric with a boxy silhouette and a structured collar that maintains its shape wash after wash.',

    features: [
      'Relaxed oversized silhouette',
      'Heavyweight 1x1 rib knit collar',
      'Pre-shrunk cotton jersey',
      'Clean minimalist stitching',
    ],

    fabric: '100% Ring-Spun Heavyweight Cotton (250 GSM)',

    care: [
      'Machine wash cold with light colors',
      'Hang dry recommended',
      'Iron on low heat',
      'Do not bleach',
    ],
  },
];
