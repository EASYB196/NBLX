import { FaChevronDown } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const DropdownWomen = () => {
  return (
    <div className="relative group">
      <div className="flex items-center text-black px-4 py-2 cursor-pointer group relative w-fit">
        Women
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-24"></span>
        <FaChevronDown className="ml-2 transition-transform duration-300 group-hover:rotate-180" />
      </div>

      <div className="absolute left-0 mt-2 text-center w-48 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300">
        <ul className="py-2">
          <li><Link to="/abaya" className="block px-4 py-2 hover:bg-gray-200">Abaya</Link></li>
          <li><Link to="/crop-top" className="block px-4 py-2 hover:bg-gray-200">Crop Top</Link></li>
         
        </ul>
      </div>
    </div>
  );
};

export default DropdownWomen;
