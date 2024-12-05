
const CategoryNav = ({ products, activeCategory, categoryHandler }) => {
  // const [activeCategory, setActiveCategory] = useState('All');
  
  const defaultCategories = ['All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'];
  const categories = products.length > 0 
    ? ['All', ...new Set(products.map(product => product.category))]
    : defaultCategories;

  const getCategoryStats = (category) => {
    if (!Array.isArray(products)) return 0;
    return category === 'All'
      ? products.length
      : products.filter(product => product.category === category).length;
  };

  return (
    <div className="flex overflow-x-auto pb-4 mb-6 gap-4 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => categoryHandler(category)}
          className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === category
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {category} ({getCategoryStats(category)})
        </button>
      ))}
    </div>
  );
};

export default CategoryNav;