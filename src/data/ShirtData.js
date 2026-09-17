import reglanshirtfv from "../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt FV.jpg"
import reglanshirtbv from "../assets/images/MEN/Shirt/black and white long-sleeved raglan shirt BV.jpg"
import oversizedcrewnecktshirtfv from "../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt FV.jpg"
import  oversizedcrewnecktshirtfvbv from "../assets/images/MEN/T-Shirt/white oversized crew-neck t-shirt BV.jpg"


export const ShirtData = [
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
]