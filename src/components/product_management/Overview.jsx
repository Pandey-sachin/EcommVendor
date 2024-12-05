import React from 'react';
import { Package, FolderTree, AlertTriangle, Percent, ShoppingCart,IndianRupee } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../reducers/productSlice'; 
;

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md">
    <div className="flex items-center p-6">
      <div className="rounded-full bg-red-100 p-3">
        <Icon className="h-6 w-6 text-red-600" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  </div>
);

const OverviewDashboard = () => {
  const products = useSelector(selectAllProducts);

  const calculateStats = () => {
    if (!products || !Array.isArray(products)) {
      return {
        totalProducts: 0,
        totalCategories: 0,
        lowStockItems: 0,
        averagePrice: 0,
        totalValue: 0,
        itemsOnDiscount: 0
      };
    }

    const stats = {
      totalProducts: products.length,
      totalCategories: new Set(products.map(product => product.category)).size,
      lowStockItems: products.filter(product => product.quantity < 20).length,
      averagePrice: products.reduce((acc, product) => acc + product.price, 0) / products.length,
      totalValue: products.reduce((acc, product) => acc + (product.price * product.quantity), 0),
      itemsOnDiscount: products.filter(product => product.discount > 0).length
    };

    return stats;
  };

  const stats = calculateStats();
    
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard 
        icon={Package}
        title="Total Products"
        value={stats.totalProducts}
      />
      <StatCard 
        icon={FolderTree}
        title="Total Categories"
        value={stats.totalCategories}
      />
      <StatCard 
        icon={AlertTriangle}
        title="Low Stock Items"
        value={stats.lowStockItems}
      />
      <StatCard 
        icon={IndianRupee}
        title="Average Price"
        value={`₹${stats.averagePrice.toFixed(2)}`}
      />
      <StatCard 
        icon={ShoppingCart}
        title="Total Inventory Value"
        value={`₹${stats.totalValue.toFixed(2)}`}
      />
      <StatCard 
        icon={Percent}
        title="Items on Discount"
        value={stats.itemsOnDiscount}
      />
    </div>
  );
};

export default OverviewDashboard;