import React, { useEffect ,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsLoading, selectProductsError } from '../reducers/productSlice';
import TagLine from '../components/Layout/TagLine';
import Banner from '../components/banner/Banner';
import CategoryNav from '../components/categories/CategoryNav';
import LoadingSpinner from '../components/Loading';
import ProductGrid from '../components/product/ProductGrid';
import ErrorDisplay from '../components/Error';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts) || [];
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    <ErrorDisplay error={error} />
  }
  const handleSetCategory = (category)=>{
    setActiveCategory(category);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <TagLine/>
      <Banner/>
      <div className="container mx-auto px-4 py-8">
        <CategoryNav products={products} activeCategory={activeCategory} categoryHandler={handleSetCategory}  />
        {isLoading ? <LoadingSpinner /> : <ProductGrid products={products} activeCategory={activeCategory}/>}
      </div>
    </div>
  );
};

export default Home;