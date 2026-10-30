import FlameblackjacketFV from '../assets/images/MEN/Jacket/FlameblackjacketFV.jpg';
import FlameblackjacketBV from '../assets/images/MEN/Jacket/FlameblackjacketBV.jpg';

import Rapidstarjacket from '../assets/images/MEN/Jacket/Rapidstarjacketfv.jpg';
import Rapidstarjacketbv from '../assets/images/MEN/Jacket/Rapidstarjacketbv.jpg';

import SolitudeJacket from '../assets/images/MEN/Jacket/Solitudejacketfv.jpg';
import SolitudeJacketbv from '../assets/images/MEN/Jacket/Solitudejacketbv.jpg';

export const OuterwearJacketsDatas = [
  {
    id: 'Flame-black-jacket',
    name: 'Flame Black Jacket',
    price: 75000,
    oldPrice: 95000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],

    image: FlameblackjacketFV,
    hoverImage: FlameblackjacketBV,

    description:
      'Make a statement with the Flame Black Jacket, a distinctive outerwear piece that brings bold streetwear character to your wardrobe. Its versatile black finish makes styling effortless, whether layered over a casual tee or paired with denim, cargos, and your favourite sneakers. Designed to add a confident edge to everyday outfits.',

    features: [
      'Bold streetwear-inspired design',
      'Versatile black colourway',
      'Easy to layer over everyday outfits',
      'Pairs effortlessly with denim, cargos, and sneakers',
    ],

    fabric: 'Material composition not yet specified.',

    care: [
      'Check the garment care label before washing',
      'Clean with similar colours',
      'Avoid bleach and harsh cleaning agents',
      'Air dry away from direct sunlight',
      'Store in a cool, dry place',
    ],
  },

  {
    id: 'Rapid-Star-Jacket',
    name: 'Rapid Star Jacket',
    price: 80000,
    oldPrice: 95000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],

    image: Rapidstarjacket,
    hoverImage: Rapidstarjacketbv,

    description:
      'Stand out with the Rapid Star Jacket, a statement outerwear piece designed to bring distinctive character to your streetwear rotation. Its star-inspired design creates a bold visual identity while remaining easy to style with everyday essentials. Wear it with relaxed trousers, denim, or sneakers for a confident, coordinated look.',

    features: [
      'Distinctive star-inspired design',
      'Bold streetwear aesthetic',
      'Statement outerwear for everyday styling',
      'Pairs well with denim, relaxed trousers, and sneakers',
    ],

    fabric: 'Material composition not yet specified.',

    care: [
      'Check the garment care label before washing',
      'Clean with similar colours',
      'Avoid bleach and harsh cleaning agents',
      'Air dry away from direct sunlight',
      'Store in a cool, dry place',
    ],
  },

  {
    id: 'Solitude-Jacket',
    name: 'Solitude Jacket',
    price: 80000,
    oldPrice: 95000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],

    image: SolitudeJacket,
    hoverImage: SolitudeJacketbv,

    description:
      'Keep your look distinctive with the Solitude Jacket, an understated outerwear piece that brings a contemporary streetwear feel to everyday dressing. Its individual design makes it an easy statement layer without overwhelming your outfit. Pair it with a basic tee, denim, or relaxed trousers for a clean and effortless finish.',

    features: [
      'Distinctive, understated design',
      'Contemporary streetwear appeal',
      'Versatile outerwear for everyday outfits',
      'Easy to style with tees, denim, and casual trousers',
    ],

    fabric: 'Material composition not yet specified.',

    care: [
      'Check the garment care label before washing',
      'Clean with similar colours',
      'Avoid bleach and harsh cleaning agents',
      'Air dry away from direct sunlight',
      'Store in a cool, dry place',
    ],
  },
];

export const outerwearJacketSizeCharts = {
  'Flame-black-jacket': {
    title: 'Flame Black Jacket Size Guide',
    fit: 'Jacket Fit',
    columns: [
      'Size',
      'Chest (in)',
      'Shoulder (in)',
      'Sleeve (in)',
      'Length (in)',
    ],
    rows: [
      ['S', '38-40', '17', '24', '26'],
      ['M', '40-42', '18', '24.5', '27'],
      ['L', '42-44', '19', '25', '28'],
      ['XL', '44-46', '20', '25.5', '29'],
      ['XXL', '46-48', '21', '26', '30'],
      ['3XL', '48-50', '22', '26.5', '31'],
    ],
  },

  'Rapid-Star-Jacket': {
    title: 'Rapid Star Jacket Size Guide',
    fit: 'Jacket Fit',
    columns: [
      'Size',
      'Chest (in)',
      'Shoulder (in)',
      'Sleeve (in)',
      'Length (in)',
    ],
    rows: [
      ['S', '38-40', '17', '24', '26'],
      ['M', '40-42', '18', '24.5', '27'],
      ['L', '42-44', '19', '25', '28'],
      ['XL', '44-46', '20', '25.5', '29'],
      ['XXL', '46-48', '21', '26', '30'],
      ['3XS', '34-36', '15', '23', '24'],
    ],
  },

  'Solitude-Jacket': {
    title: 'Solitude Jacket Size Guide',
    fit: 'Jacket Fit',
    columns: [
      'Size',
      'Chest (in)',
      'Shoulder (in)',
      'Sleeve (in)',
      'Length (in)',
    ],
    rows: [
      ['S', '38-40', '17', '24', '26'],
      ['M', '40-42', '18', '24.5', '27'],
      ['L', '42-44', '19', '25', '28'],
      ['XL', '44-46', '20', '25.5', '29'],
      ['XXL', '46-48', '21', '26', '30'],
      ['3XS', '34-36', '15', '23', '24'],
    ],
  },
};