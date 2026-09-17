import jogger from '../assets/images/MEN/Pants/jogger.png';
import jogger2 from '../assets/images/MEN/Pants/joggerback.png';
import elegantcargojean from '../assets/images/MEN/Jeans/white_cargopant_frontv.png';
import elegantcargojeanbv from '../assets/images/MEN/Jeans/white_cargopant_sidev.png';

// import Flameblackjackettrouserfv from "../assets/images/WOMEN/Pant/Flameblackjackettrouserfv.jpg";
// import Flameblackjackettrouserbv from "../assets/images/WOMEN/Pant/FlameblackjacketTrouserbv.jpg";    





export const PantsDatas = [
 {
    id: 'joggers',
    name: 'jogger',
    price: 35000,
    oldPrice: 1543000,
    inStock: 4,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],
    image: jogger,
    hoverImage: jogger2,
  },
    {
      id: 'ELEGANT CARGO JEAN',
      name: 'Elegant Cargo Jean',
      price: 50000,
      oldPrice: 1000000,
      inStock: 7,
      sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],
      image: elegantcargojean,
      hoverImage: elegantcargojeanbv,
    },
  // {
  //   id: "Flare-Flame-trouser",
  //   name: "Flare Flame trouser",
  //   price: 1273800,
  //   oldPrice: 1543000,
  //   inStock: 4,
  //   sizes: ["S", "M", "L", "XL", "XXL", "3XS"],
  //   image: Flameblackjackettrouserfv,
  //   hoverImage: Flameblackjackettrouserbv,
  // },
  
];
