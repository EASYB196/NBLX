import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa6';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import YouMayAlsoLike from '../../components/YouMayAlsoLike';

import { TshirtDatas } from '../../data/TshirtData';
import { PantsDatas } from '../../data/PantsData.js';
import { BestSellerData } from '../../data/BestSellerData';
import { DenimJeansDatas } from '../../data/DenimJeanData.js';
import { OuterwearJacketsDatas } from '../../data/OuterwearJacketsData.js';
import { FemalePantDatas } from '../../data/FemalePant.js';
import { TopDatas } from '../../data/Tops.js';
import { SkirtsDatas } from '../../data/SkirtsData.js';
import { DressesDatas } from '../../data/DressesData.js';
import { AccessoriesDatas } from '../../data/AccessoriesData.js';
import { CropTopDatas } from '../../data/CropTop.js';
import { HoodiesSweatshirtsDatas } from '../../data/HoodiesSweatshirtsData.js';

import { useCart } from '../../Context/cartContext';
import { useWishlist } from '../../Context/WishlistContext';

import sizechart from '../../assets/images/sizechart.png';

import ProductDescription from '../../components/Product/ProductDescription';

import { sizeCharts } from '../../data/TshirtData.js';

function TshirtDetails() {
  const { id } = useParams();

  const decodedId = decodeURIComponent(id);

  const product = TshirtDatas.find((item) => String(item.id) === String(decodedId));

  /*
   * ALL PRODUCTS FOR YOU MAY ALSO LIKE
   */
  const allProducts = useMemo(
    () => [
      ...AccessoriesDatas.map((item) => ({
        ...item,
        route: `/Accessories/${encodeURIComponent(item.id)}`,
      })),

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

      ...FemalePantDatas.map((item) => ({
        ...item,
        route: `/female-pant/${encodeURIComponent(item.id)}`,
      })),

      ...TopDatas.map((item) => ({
        ...item,
        route: `/tops/${encodeURIComponent(item.id)}`,
      })),

      ...OuterwearJacketsDatas.map((item) => ({
        ...item,
        route: `/Outerwear-Jackets/${encodeURIComponent(item.id)}`,
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

      ...HoodiesSweatshirtsDatas.map((item) => ({
        ...item,
        route: `/Hoodies-Sweatshirts/${encodeURIComponent(item.id)}`,
      })),
    ],
    [],
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const { addToCart, setShowCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  /*
   * SET DEFAULT COLOR
   */
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0].name);
    } else {
      setSelectedColor('');
    }

    setCurrentImageIndex(0);
    setSelectedSize('');
    setQuantity(1);
  }, [product]);

  /*
   * CURRENT COLOR VARIANT
   */
  const selectedColorVariant = useMemo(() => {
    if (!product?.colors?.length || !selectedColor) {
      return null;
    }

    return product.colors.find((color) => color.name === selectedColor) || product.colors[0];
  }, [product, selectedColor]);

  /*
   * CURRENT PRODUCT IMAGES
   */
  const images = useMemo(() => {
    if (selectedColorVariant?.images?.length) {
      return selectedColorVariant.images;
    }

    return [product?.image, ...(product?.hoverImage ? [product.hoverImage] : [])].filter(
      Boolean,
    );
  }, [product, selectedColorVariant]);

  /*
   * RESET IMAGE WHEN COLOR CHANGES
   */
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  /*
   * KEEP IMAGE INDEX VALID
   */
  useEffect(() => {
    if (images.length > 0 && currentImageIndex >= images.length) {
      setCurrentImageIndex(0);
    }
  }, [images.length, currentImageIndex]);

  /*
   * PRODUCT NOT FOUND
   */
  if (!product) {
    return <div className='text-black p-10'>Product not found</div>;
  }

  /*
   * IMAGE NAVIGATION
   */
  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  /*
   * COLOR SELECTION
   */
  const handleColorChange = (color) => {
    setSelectedColor(color.name);
    setCurrentImageIndex(0);
  };

  /*
   * ADD TO CART
   */
  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size!');
      return;
    }

    const cartProduct = {
      ...product,
      route: `/t-shirt/${encodeURIComponent(product.id)}`,
      selectedColor: selectedColor || 'Default',
      image: images[currentImageIndex],
      images: images,
    };

    addToCart(cartProduct, selectedSize || 'Default', quantity, selectedColor || 'Default');

    setShowCart(true);

    toast.success('Item added to cart!');
  };

  /*
   * WISHLIST
   */
  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      route: `/t-shirt/${encodeURIComponent(product.id)}`,
      selectedColor: selectedColor || 'Default',
      images: images,
      image: images[0],
    });
  };

  return (
    <div className='bg-white text-black min-h-screen py-10 px-4 md:px-10 font-[Raleway]'>
      {/* BREADCRUMB */}
      <div className='flex items-center justify-center gap-2 md:gap-4 mt-23 text-sm md:text-base'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>

        <FaChevronRight />

        <Link to='/t-shirt' className='hover:underline'>
          Tshirt
        </Link>

        <FaChevronRight />

        <span className='text-gray-500'>{product.name}</span>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-10 mt-10'>
        {/* LEFT - IMAGES */}
        <div className='flex gap-4 w-full md:w-1/2'>
          {/* THUMBNAILS */}
          <div className='hidden md:flex flex-col gap-3'>
            {images.map((img, idx) => (
              <img
                key={`${img}-${idx}`}
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-24 object-cover rounded-lg cursor-pointer border ${
                  currentImageIndex === idx ? 'border-black' : 'border-transparent'
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className='relative w-full h-100 md:h-125'>
            {/* WISHLIST */}
            <button
              type='button'
              onClick={handleWishlist}
              className='absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow'
              aria-label={
                isWishlisted(product.id, selectedColor || 'Default')
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
            >
              {isWishlisted(product.id, selectedColor || 'Default') ? (
                <FaHeart className='text-red-500' />
              ) : (
                <FaRegHeart />
              )}
            </button>

            <img
              src={images[currentImageIndex]}
              className='w-full h-full object-cover rounded-xl'
              alt={product.name}
            />

            {/* ARROWS */}
            {images.length > 1 && (
              <>
                <button
                  type='button'
                  onClick={handlePrev}
                  className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
                  aria-label='Previous image'
                >
                  <FaChevronLeft />
                </button>

                <button
                  type='button'
                  onClick={handleNext}
                  className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full'
                  aria-label='Next image'
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className='flex-1 space-y-6'>
          {/* PRODUCT NAME */}
          <h1 className='text-2xl md:text-3xl font-bold'>{product.name}</h1>

          {/* PRICE */}
          <div className='text-2xl font-bold'>₦{product.price.toLocaleString('en-NG')}</div>

          {/* COLOR */}
          {product.colors?.length > 0 && (
            <div className='space-y-4'>
              <div className='flex items-center'>
                <p className='font-semibold text-lg'>
                  Color
                  {selectedColor && (
                    <span className='ml-2 text-gray-500 font-normal'>({selectedColor})</span>
                  )}
                </p>
              </div>

              <div className='flex flex-wrap gap-3'>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type='button'
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <span
                      className='w-7 h-7 rounded-full border border-gray-200'
                      style={{
                        background: color.value,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className='flex items-center gap-4'>
            <p className='font-semibold text-xl'>Quantity:</p>

            <button
              type='button'
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className='w-10 h-10 bg-gray-100 rounded'
            >
              −
            </button>

            <span className='text-lg'>{quantity}</span>

            <button
              type='button'
              onClick={() => setQuantity((q) => q + 1)}
              className='w-10 h-10 bg-gray-100 rounded'
            >
              +
            </button>
          </div>

          {/* SIZE */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <p className='font-semibold text-lg'>
                Select Size
                {selectedSize && (
                  <span className='ml-2 text-gray-500 font-normal'>({selectedSize})</span>
                )}
              </p>
            </div>

            <div className='flex flex-wrap gap-3'>
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-13.75 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE CHART */}
          <button
            type='button'
            onClick={() => setShowSizeChart(true)}
            className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition mt-2'
          >
            <img src={sizechart} alt='Size Guide' className='w-50 h-15 object-contain' />
          </button>

          {/* BUTTONS */}
          <div className='flex flex-col md:flex-row gap-4'>
            <button
              type='button'
              onClick={handleAddToCart}
              className='w-full md:w-55 border py-3 rounded-xl hover:bg-black hover:text-white transition'
            >
              Add to Cart
            </button>

            <button
              type='button'
              className='w-full md:w-55 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition'
            >
              Buy it now
            </button>
          </div>
        </div>
      </div>

      {/* SIZE CHART MODAL */}
      {showSizeChart && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4'>
          <div className='bg-white rounded-xl p-6 max-w-2xl w-full relative'>
            <button
              type='button'
              onClick={() => setShowSizeChart(false)}
              className='absolute top-3 right-4 text-2xl font-extrabold'
              aria-label='Close size guide'
            >
              ×
            </button>

            {(() => {
              const chart = sizeCharts[product.id];

              if (!chart) {
                return <p className='text-gray-500'>Size guide currently unavailable.</p>;
              }

              return (
                <>
                  <h2 className='text-xl font-bold mb-2'>{chart.title}</h2>

                  {chart.fit && <p className='text-sm text-gray-500 mb-4'>Fit: {chart.fit}</p>}

                  <div className='overflow-x-auto'>
                    <table className='w-full border-collapse border text-sm'>
                      <thead>
                        <tr className='bg-gray-100'>
                          {chart.columns.map((column) => (
                            <th key={column} className='border p-3 text-left'>
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {chart.rows.map((row, index) => (
                          <tr key={index}>
                            {row.map((value, valueIndex) => (
                              <td key={valueIndex} className='border p-3'>
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* <p className='text-xs text-gray-500 mt-4'>
                    Measurements are approximate. For the
                    best fit, compare these measurements with
                    a similar garment you already own.
                  </p> */}
                  <p className='text-xs text-gray-500 mt-4'>
                    Measurements are approximate and may vary slightly depending on design and
                    fit.
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* PRODUCT DESCRIPTION */}
      <ProductDescription
        description={product.description}
        features={product.features}
        fabric={product.fabric}
        care={product.care}
      />

      {/* YOU MAY ALSO LIKE */}
      <YouMayAlsoLike products={allProducts} currentProductId={product.id} />
    </div>
  );
}


export default TshirtDetails;
