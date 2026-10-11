import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './Context/cartContext';
import { WishlistProvider } from './Context/WishlistContext';
import CartNavigation from './components/CartNavigation';

import NavBar from './components/Navbar';
import Wishlist from './pages/WishList';
import Category from './pages/Category';

import Footer from './components/Footer';
import Faqs from './components/Faqs';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Sms from './pages/sms';
import Collections from './pages/Collections';
import TrackOrder from './pages/TrackOrder';
import Kids from './pages/Kids';
import ProductDetails from './pages/ProductDetails';

import Casual from './pages/NavPages/Mens/Casual';
import Pants from './pages/NavPages/Mens/Pants';
import Tshirt from './pages/NavPages/Mens/Tshirt';
import Shirt from './pages/NavPages/Mens/Shirt';

import CropTop from './pages/NavPages/Women/CropTop';
import Skirts from './pages/NavPages/Women/Skirts';
import FemalePant from './pages/NavPages/Women/FemalePant';
import Top from './pages/NavPages/Women/Tops';
import Accessories from './pages/Accessories';
import Dresses from './pages/NavPages/Women/Dresses';
import Watches from './pages/NavPages/Accessories/Watches';

import Agbada from './pages/NavPages/Mens/Agbada';
import Jalabiya from './pages/NavPages/Mens/Jalabiya';

import HoodiesSweatshirtsDetails from './components/MenDetails/HoodiesSweatshirtDetails';
import PantsDetails from './components/MenDetails/PantsDetails';
import TshirtDetails from './components/MenDetails/TshirtDetails';
import ShirtDetails from './components/MenDetails/ShirtDetails';
import DenimJeanDetails from './components/MenDetails/DenimJeanDetails';
import OuterwearJacketsDetails from './components/MenDetails/OuterwearJacketDetails';

import CropTopDetails from './components/WomenDetails/CropTopDetails';
import SkirtsDetails from './components/WomenDetails/SkirtsDetails';
import FemalePantDetails from './components/WomenDetails/FemalePantDetails';
import TopDetails from './components/WomenDetails/TopsDetails';
import AccessoriesDetails from './components/WomenDetails/AccessoriesDetails';
import DressesDetails from './components/WomenDetails/DressesDetails';

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

import CheckOut from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

import AdminLogIn from './pages/Admin/AdminLogIn';

import Profile from './pages/User/Profile';
import OrderHistory from './pages/User/OrderHistory';
import ProfileWishlist from './pages/User/ProfileWishlist';
import ProfileDetails from './pages/User/ProfileDetails';
import Addresses from './pages/User/Addresses';
import AccountSettings from './pages/User/AccountSettings';
import ProtectedRoute from './components/Account/ProtectedRoute';

import IncorrectLinkPage from './pages/IncorrectLinkPage/IncorrectLinkPage';

function AppContent() {
  const location = useLocation();

  // ofr ormalize the URL to handle trailing slashes.
  const pathname = location.pathname.replace(/\/+$/, '').toLowerCase() || '/';

  // All valid static routes.
  const validPaths = [
    '/',
    '/order-success',
    '/checkout',
    '/track-order',
    '/admin',
    '/wishlist',
    '/collections',
    '/category',
    '/kids',
    '/faqs',
    '/casuals',
    '/pants',
    '/t-shirt',
    '/agbada',
    '/denim-jeans',
    '/outerwear-jackets',
    '/hoodies-sweatshirts',
    '/jalabiya',
    '/crop-top',
    '/skirts',
    '/female-pant',
    '/tops',
    '/accessories',
    '/dresses',
    '/watches',
    '/bestseller',
    '/auth/login',
    '/auth/signup',
    '/profile',
    '/auth/sms',
    '/terms-of-service',
    '/privacy-policy',
    '/returns',
    '/shipping-policy',
    '/story',
    '/contact',
  ];

  // Match valid dynamic routes, including product-detail URLs.
  const isDynamicRoute =
    /^\/(products\/[^/]+|product\/[^/]+\/[^/]+|pants\/[^/]+|t-shirt\/[^/]+|denim-jeans\/[^/]+|outerwear-jackets\/[^/]+|hoodies-sweatshirts\/[^/]+|crop-top\/[^/]+|skirts\/[^/]+|female-pant\/[^/]+|tops\/[^/]+|accessories\/[^/]+|dresses\/[^/]+|bestseller\/products\/[^/]+)$/.test(
      pathname,
    );

  const isIncorrectPage = !validPaths.includes(pathname) && !isDynamicRoute;

  const isAuthPage = pathname.startsWith('/auth');
  const isAdminPage = pathname === '/admin';

  // Hide the navbar and footer on these pages.
  const hideLayout = isAuthPage || isAdminPage || isIncorrectPage;

  return (
    <>
      <ScrollToTop />

      <Toaster position='top-center' reverseOrder={false} />

      <CartDrawer />

      {/* Show navbar only on normal website pages. */}
      {!hideLayout && <NavBar />}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/order-success' element={<OrderSuccess />} />

        <Route path='/checkout' element={<CheckOut />} />

        <Route path='/track-order' element={<TrackOrder />} />

        <Route path='/admin' element={<AdminLogIn />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<OrderHistory />} />
          <Route path='/profile/wishlist' element={<ProfileWishlist />} />
          <Route path='/profile/details' element={<ProfileDetails />} />
          <Route path='/profile/addresses' element={<Addresses />} />
          <Route path='/profile/settings' element={<AccountSettings />} />
        </Route>

        <Route path='/wishlist' element={<Wishlist />} />

        <Route path='/collections' element={<Collections />} />

        <Route path='/category' element={<Category />} />

        <Route path='/kids' element={<Kids />} />

        <Route path='/faqs' element={<Faqs />} />

        <Route path='/products/:id' element={<ProductDetails />} />

        <Route path='/casuals' element={<Casual />} />

        <Route path='/pants' element={<Pants />} />

        <Route path='/t-shirt' element={<Tshirt />} />

        {/* <Route path="/shirts" element={<Shirt />} /> */}

        <Route path='/agbada' element={<Agbada />} />

        <Route path='/Denim-Jeans' element={<DenimJean />} />

        <Route path='/Outerwear-Jackets' element={<OuterwearJacket />} />

        <Route path='/Hoodies-Sweatshirts' element={<HoodiesSweatshirts />} />

        <Route path='/jalabiya' element={<Jalabiya />} />

        <Route path='/crop-top' element={<CropTop />} />

        <Route path='/skirts' element={<Skirts />} />

        <Route path='/female-pant' element={<FemalePant />} />

        <Route path='/tops' element={<Top />} />

        <Route path='/accessories' element={<Accessories />} />

        <Route path='/Dresses' element={<Dresses />} />

        <Route path='/watches' element={<Watches />} />

        <Route path='/pants/:id' element={<PantsDetails />} />

        <Route path='/t-shirt/:id' element={<TshirtDetails />} />

        {/* <Route path="/shirts/:id" element={<ShirtDetails />} /> */}

        <Route path='/Denim-Jeans/:id' element={<DenimJeanDetails />} />

        <Route path='/Outerwear-Jackets/:id' element={<OuterwearJacketsDetails />} />

        <Route path='/Hoodies-Sweatshirts/:id' element={<HoodiesSweatshirtsDetails />} />

        <Route path='/crop-top/:id' element={<CropTopDetails />} />

        <Route path='/skirts/:id' element={<SkirtsDetails />} />

        <Route path='/female-pant/:id' element={<FemalePantDetails />} />

        <Route path='/tops/:id' element={<TopDetails />} />

        <Route path='/Accessories/:id' element={<AccessoriesDetails />} />

        <Route path='/dresses/:id' element={<DressesDetails />} />

        <Route path='/bestseller' element={<BestSeller />} />

        <Route path='/bestseller/products/:id' element={<BestSellerDetail />} />

        <Route path='/auth/login' element={<AuthForm />} />

        <Route path='/auth/signup' element={<AuthForm />} />

        <Route path='/auth/sms' element={<Sms />} />

        <Route path='/terms-of-service' element={<TermsOfService />} />

        <Route path='/privacy-policy' element={<PrivacyPolicy />} />

        <Route path='/returns' element={<ReturnPolicy />} />

        <Route path='/shipping-policy' element={<ShippingPolicy />} />

        <Route path='/story' element={<Story />} />

        <Route path='/contact' element={<Contact />} />

        <Route path='/product/:type/:id' element={<ProductDetails />} />

        {/* Keep the catch-all route last. */}
        <Route path='*' element={<IncorrectLinkPage />} />
      </Routes>

      {/* Render the footer only once. */}
      {!hideLayout && pathname !== '/checkout' && <Footer />}
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 3000,
        }}
        containerStyle={{
          zIndex: 99999,
        }}
      />
      <CartProvider>
        <Router>
          <CartNavigation />

          <div className='bg-white overflow-hidden'>
            <AppContent />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
