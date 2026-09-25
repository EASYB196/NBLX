import { useParams } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import { BestSellerData } from '../data/BestSellerData';
import BreadCrumb from '../components/BreadCrumb';
import YouMayAlsoLike from '../components/YouMayAlsoLike';

import { PantsDatas } from '../data/PantsData.js';
import { TshirtDatas } from '../data/TshirtData';
import { DenimJeansDatas } from '../data/DenimJeanData.js';
import { OuterwearJacketsDatas } from '../data/OuterwearJacketsData.js';
import { FemalePantDatas } from '../data/FemalePant.js';
import { TopDatas } from '../data/Tops.js';
import { SkirtsDatas } from '../data/SkirtsData.js';
import { DressesDatas } from '../data/DressesData.js';
import { AccessoriesDatas } from '../data/AccessoriesData.js';
import { CropTopDatas } from '../data/CropTop.js';
import { HoodiesSweatshirtsDatas } from '../data/HoodiesSweatshirtsData.js';

import ProductDescription from '../components/Product/ProductDescription';


function BestsellerDetail() {
  const { id } = useParams();

  const allProducts = [
    ...PantsDatas.map((item) => ({
      ...item,
      route: `/pants/${encodeURIComponent(item.id)}`,
    })),

    ...BestSellerData.map((item) => ({
      ...item,
      route: `/bestseller/products/${encodeURIComponent(item.id)}`,
    })),

    ...TshirtDatas.map((item) => ({
      ...item,
      route: `/t-shirt/${encodeURIComponent(item.id)}`,
    })),

    ...DenimJeansDatas.map((item) => ({
      ...item,
      route: `/Denim-Jeans/${encodeURIComponent(item.id)}`,
    })),

    ...OuterwearJacketsDatas.map((item) => ({
      ...item,
      route: `/Outerwear-Jackets/${encodeURIComponent(item.id)}`,
    })),

    ...HoodiesSweatshirtsDatas.map((item) => ({
      ...item,
      route: `/Hoodies-Sweatshirts/${encodeURIComponent(item.id)}`,
    })),

    ...FemalePantDatas.map((item) => ({
      ...item,
      route: `/female-pant/${encodeURIComponent(item.id)}`,
    })),

    ...TopDatas.map((item) => ({
      ...item,
      route: `/tops/${encodeURIComponent(item.id)}`,
    })),

    ...SkirtsDatas.map((item) => ({
      ...item,
      route: `/skirts/${encodeURIComponent(item.id)}`,
    })),

    ...DressesDatas.map((item) => ({
      ...item,
      route: `/dresses/${encodeURIComponent(item.id)}`,
    })),

    ...CropTopDatas.map((item) => ({
      ...item,
      route: `/crop-top/${encodeURIComponent(item.id)}`,
    })),

    ...AccessoriesDatas.map((item) => ({
      ...item,
      route: `/accessories/${encodeURIComponent(item.id)}`,
    })),
  ];

  const product = BestSellerData.find(
    (item) => String(item.id) === String(id),
  );

  if (!product) {
    return (
      <div className='text-black p-10'>
        Product not found
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb
        category='BestSeller'
        productName={product.name}
        categoryLink='/#best-sellers'
      />

      <ProductDetails
        data={BestSellerData}
        routePrefix='/bestseller/products'
      />

        {/* PRODUCT DESCRIPTION */}
      <ProductDescription
        description={product.description}
        features={product.features}
        fabric={product.fabric}
        care={product.care}
      />

      <YouMayAlsoLike
        products={allProducts}
        currentProductId={product.id}
      />
    </div>
  );
}

export default BestsellerDetail;