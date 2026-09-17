import greatmindcroptee from "../assets/images/MEN/T-Shirt/NXblackFcroptop.jpg";
import greatmindcropteebv from "../assets/images/MEN/T-Shirt/NXblackbcroptop.jpg";
import image3 from "../assets/images/MEN/T-Shirt/builtcrop-tshirt.jpg";
import image4 from "../assets/images/MEN/T-Shirt/builtbackcrop-tshirt.jpg";
// import image5 from "../assets/images/MEN/T-Shirt/tshirt-5.webp";
// import image6 from "../assets/images/MEN/T-Shirt/tshirt-6.webp";
import blacktanktop from "../assets/images/MEN/T-Shirt/blacktanktop-Fv.jpg";
import blacktanktopbv from "../assets/images/MEN/T-Shirt/black-tank-top-Bv.jpg";
import reglanshirtfv from "../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt FV.jpg"
import reglanshirtbv from "../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt BV.jpg"
import oversizedcrewnecktshirtfv from "../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt FV.jpg"
import  oversizedcrewnecktshirtfvbv from "../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt BV.jpg"

// import image9 from "../assets/images/MEN/T-Shirt/tshirt-9.webp";
// import image10 from "../assets/images/MEN/T-Shirt/tshirt-10.webp";

export const TshirtDatas = [
  {
  id: 'GREATMINDS CROP TEE',
    name: 'Greatminds Crop Tee',
    price: 45000,
    oldPrice: 3450000,
    inStock: 3,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],
    image: greatmindcroptee,
    hoverImage: greatmindcropteebv,
  },
  {
id: "Built-Inspire-Shirt",
    name: "Crown T-shirt",
    price: 50000,
    oldPrice: 1000000,
    inStock: 7,
    sizes: ["S", "M", "L", "XL", "XXL", "3XS"],
    image: image3,
    hoverImage: image4,
  },
 
  {
    id: 'TANKTOP',
    name: 'Tanktop',
    price: 30000,
    oldPrice: 450000,
    inStock: 5,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XS'],
    image: blacktanktop,
    hoverImage: blacktanktopbv,
  },
  {
    id: "Reglan-Shirt",
    name: "Reglan Shirt",
    price: 40000,
    oldPrice: 1543000,
    inStock: 4,
    sizes: ["S", "M", "L", "XL", "XXL", "3XS"],
    image: reglanshirtfv,
    hoverImage: reglanshirtbv,
  },
  {
    id: "Oversized-Crew-Neck-T-Shirt",
    name: "Oversized Crew Neck T-Shirt",
    price: 45000,
    oldPrice: 1543000,
    inStock: 4,
    sizes: ["S", "M", "L", "XL", "XXL", "3XS"],
    image: oversizedcrewnecktshirtfv,
    hoverImage: oversizedcrewnecktshirtfvbv,
  },
];
