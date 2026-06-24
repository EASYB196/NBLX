import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './Context/cartContext';
import { WishlistProvider } from './Context/WishlistContext';

import NavBar from './components/Navbar';
import Wishlist from './pages/WishList';
import BestsellerDetail from './components/BestSellerDetail';

import Category from './pages/Category';

import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Sms from './pages/sms';
import Collections from './pages/Collections';
import Kids from './pages/Kids';
import ProductList from './components/ProductList';
import ProductDetails from './pages/ProductDetails';

import Casual from './pages/NavPages/Mens/Casual';
import Pants from './pages/NavPages/Mens/Pants';
import Tshirt from './pages/NavPages/Mens/Tshirt';
import Shirt from './pages/NavPages/Mens/Shirt';
import CropTop from './pages/NavPages/Women/CropTop';
import Abaya from './pages/NavPages/Women/Abaya';
import Watches from './pages/NavPages/Accessories/Watches';

import Agbada from './pages/NavPages/Mens/Agbada';
import Jalabiya from './pages/NavPages/Mens/Jalabiya';
import Kaftan from './pages/NavPages/Mens/Shirt';

// import JalabiyaDetails from './components/MenDetails/JalabiyaDetails';
// import AgbadaDetails from './components/MenDetails/AgbadaDetails';
// import KaftanDetails from './components/MenDetails/KaftanDetails';
// import CasualDetails from './components/MenDetails/CasualDetails';
import PantsDetails from './components/MenDetails/PantsDetails';
import TshirtDetails from './components/MenDetails/TshirtDetails';
import ShirtDetails from './components/MenDetails/shirtDetails';
import DenimJeanDetails from './components/MenDetails/DenimJeanDetails';
import OuterwearJacketsDetails from './components/MenDetails/OuterwearJacketDetails';

import CropTopDetails from './components/WomenDetails/CropTopDetails';
import AbayaDetails from './components/WomenDetails/AbayaDetails';

// import Shirts from './pages/NavPages/Mens/Shirts';
// import Footwear from './pages/NavPages/Mens/Footwear';
// import Bags from './pages/NavPages/Mens/Bags';
// import Underwear from './pages/NavPages/Mens/Underwear';

import HoodiesSweatshirtsDetails from './components/MenDetails/HoodiesSweatshirtDetails';
// import ShirtsDetails from './components/MenDetails/ShirtsDetails';
// import FootwearDetails from './components/MenDetails/FootwearDetails';
// import BagsDetails from './components/MenDetails/BagsDetails';
// import UnderwearDetails from './components/MenDetails/UnderwearDetails';

import BestSellerDetail from './components/BestSellerDetail';
import BestSeller from './components/BestSeller';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/Policies/PrivacyPolicy';

import AuthForm from './components/Account/AuthForm';
import TermsOfService from './components/TermsOfService';
import ReturnPolicy from './pages/Policies/ReturnPolicy';
import ShippingPolicy from './pages/Policies/ShippingPolicy';
import Story from './pages/Story';
import DenimJean from './pages/NavPages/Mens/DenimJean';
import OuterwearJacket from './pages/NavPages/Mens/OuterwearJacket';
import HoodiesSweatshirts from './pages/NavPages/Mens/HoodiesSweatshirts';

function AppContent() {
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <>
      <ScrollToTop />

      <Toaster position='top-center' reverseOrder={false} />

      <CartDrawer />

      {!isAuthPage && <NavBar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/category' element={<Category />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/kafans-shirts' element={<Kaftan />} />
        <Route path='/casuals' element={<Casual />} />
        <Route path='/pants' element={<Pants />} />
        <Route path='/t-shirts' element={<Tshirt />} />
        <Route path='/shirts' element={<Shirt />} />
        <Route path='/watches' element={<Watches />} />
        <Route path='/croptop' element={<CropTop />} />
        <Route path='/abaya' element={<Abaya />} />
        <Route path='/auth/:type' element={<AuthForm />} />
        <Route path='/agbada' element={<Agbada />} />
        {/* <Route path='/kafans-shirts' element={<Kaftan />} /> */}
        <Route path='/Denim-Jeans' element={<DenimJean />} />
        <Route path='/Outerwear-Jackets' element={<OuterwearJacket />} />
        <Route path='/Hoodies-Sweatshirts' element={<HoodiesSweatshirts />} />
        <Route path='/jalabiya' element={<Jalabiya />} />
        {/* <Route path='/jalabiya/:id' element={<JalabiyaDetails />} /> */}
        <Route path='/croptop/:id' element={<CropTopDetails />} />
        <Route path='/abaya/:id' element={<AbayaDetails />} />
        {/* <Route path='/kafans-shirts/:id' element={<KaftanDetails />} /> */}
        {/* <Route path='/casuals/:id' element={<CasualDetails />} /> */}
        <Route path='/pants/:id' element={<PantsDetails />} />
        <Route path='/Denim-Jeans/:id' element={<DenimJeanDetails />} />
        <Route path='/Outerwear-Jackets/:id' element={<OuterwearJacketsDetails />} />
        <Route path='/Hoodies-Sweatshirts/:id' element={<HoodiesSweatshirtsDetails />} />
        <Route path='/t-shirts/:id' element={<TshirtDetails />} />
        <Route path='/shirts/:id' element={<ShirtDetails />} />
        <Route path='/bestseller/products/:id' element={<BestSellerDetail />} />
        <Route path='/bestseller' element={<BestSeller />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/story' element={<Story />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sms' element={<Sms />} />
        <Route path='/returns' element={<ReturnPolicy />} />
        <Route path='/shipping-policy' element={<ShippingPolicy />} />
        <Route path='/product/:type/:id' element={<ProductDetails />} />{' '}
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className='bg-white overflow-hidden'>
            <AppContent />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
