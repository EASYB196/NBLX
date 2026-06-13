import { motion, AnimatePresence } from "framer-motion";

const SearchDrawer = ({ open, onClose, searchQuery, setSearchQuery }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          {/* overlay */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
          />

          {/* drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-[85%] md:w-96 bg-white shadow-xl p-5"
          >
            <button onClick={onClose} className="text-2xl mb-5">
              ✕
            </button>

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border p-3 rounded-md outline-none"
            />

            <button className="w-full mt-4 bg-black text-white py-3 rounded-md">
              Search
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;