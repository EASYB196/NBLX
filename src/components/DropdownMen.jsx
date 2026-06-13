import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const menuItems = [
  { path: '/jalabiya', label: 'Jalabiya' },
  { path: '/kafans-shirts', label: 'Kafans/Shirts' },
  { path: '/agbada', label: 'Agbada' },
  { path: '/casuals', label: 'Casuals' },
  { path: '/t-shirt', label: 'T-Shirts' },
  { path: '/pants', label: 'Pants' },
];

const DropdownMen = () => {
  return (
    <div className='relative group'>
      <div className='flex items-center text-black px-4 py-2 cursor-pointer group relative w-fit'>
        Men
        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-18'></span>
        <FaChevronDown className='ml-2 transition-transform duration-300 group-hover:rotate-180' />
      </div>
      <div className='absolute left-0 mt-2 w-48 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
        <ul className='py-2'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className='block px-4 py-2 hover:bg-gray-200 text-7xl'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMen;
