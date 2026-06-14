import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetails';
import { BestSellerData } from '../data/BestSellerData';
import BreadCrumb from '../components/BreadCrumb';

function BestsellerDetail() {
  const { id } = useParams();

  const product = BestSellerData.find((item) => String(item.id) === String(id));

  return (
    <div>
      <BreadCrumb category='BestSeller' productName={product?.name} />

      <ProductDetails data={BestSellerData} />
    </div>
  );
}

export default BestsellerDetail;
