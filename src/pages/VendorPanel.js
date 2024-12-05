import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User,LineChart,Package,PlusCircle,Edit,Trash2,Menu,X } from 'lucide-react';
import ViewProducts from '../components/product_management/ViewProducts';
import AddProduct from '../components/product_management/AddProduct';
import UpdateProduct from '../components/product_management/UpdateProduct';
import DeleteProduct from '../components/product_management/DeleteProduct';
import SidebarItem from '../components/SidebarItem';
import Overview from '../components/product_management/Overview';
import { fetchProductsByVendor } from '../reducers/productSlice';
import LoadingSpinner from '../components/Loading';
import ErrorDisplay from '../components/Error';
const VendorPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  
  const { loading, error } = useSelector(state => state.products);

  const navItems = [
    {
      label: 'Overview',
      icon: LineChart,
      id: 'overview'
    },
    {
      label: 'Products',
      icon: Package,
      id: 'products'
    },
    {
      label: 'Add Product',
      icon: PlusCircle,
      id: 'add-product'
    },
    {
      label: 'Edit Products',
      icon: Edit,
      id: 'edit-product'
    },
    {
      label: 'Delete Products',
      icon: Trash2,
      id: 'delete-product'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'products':
        return <ViewProducts />;
      case 'add-product':
        return <AddProduct />;
      case 'edit-product':
        return <UpdateProduct />;
      case 'delete-product':
        return <DeleteProduct />;
      default:
        return <Overview />;
    }
  };
    
    
  useEffect(() => {
    if (user?.role?.includes("seller") && user?.id) {
      dispatch(fetchProductsByVendor(user.id));
    }
  }, [dispatch, user?.id, user?.role]);
  if (loading) {
    return <LoadingSpinner text={"Fetching your products..."}/>;
  }
  
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className={`lg:w-1/4 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* User Profile */}
              <div className="flex flex-col items-center mb-8">
                <div className="p-4 bg-red-50 rounded-full mb-4">
                  <User className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {user?.username || 'Vendor Name'}
                  </h2>
                  <p className="text-sm text-gray-500">Vendor Dashboard</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setShowSidebar(false);
                    }}
                  />
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Mobile Navigation Toggle */}
              <div className="lg:hidden mb-4">
                {!showSidebar ? (
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <Menu className="h-6 w-6" /> Menu
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="text-red-600 flex items-center gap-2"
                  >
                    <X className="h-6 w-6" /> Close
                  </button>
                )}
              </div>

              {/* Page Title */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {navItems.find(item => item.id === activeSection)?.icon && (
                    <div className="text-red-600">
                      {React.createElement(
                        navItems.find(item => item.id === activeSection)?.icon,
                        { size: 24 }
                      )}
                    </div>
                  )}
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {navItems.find(item => item.id === activeSection)?.label}
                  </h1>
                </div>
              </div>

              {/* Dynamic Content */}
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorPanel;

