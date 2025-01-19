import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    publishedProducts: 0,
    totalRevenue: 0,
  });
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Bar Chart Data
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Products Sold',
        data: [30, 45, 28, 60, 55, 70, 85],
        backgroundColor: '#f59e0b',
      },
      {
        label: 'Revenue Generated ($)',
        data: [300, 450, 280, 600, 550, 700, 850],
        backgroundColor: '#6366f1',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        // Fetch all products from the Strapi API
        const response = await fetch('http://localhost:1337/api/products');
        const data = await response.json();

        const products = data?.data || [];

        // Count total products and published products
        const totalProducts = products.length;
        const publishedProducts = products.filter(
          (product) => product.attributes.Product_State === true
        ).length;

        setStats((prev) => ({
          ...prev,
          totalProducts,
          publishedProducts,
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product stats:', error);
        setLoading(false);
      }
    };

    const fetchCustomerCount = async () => {
      try {
        // Fetch all users from the Strapi API
        const response = await fetch('http://localhost:1337/api/users');
        const data = await response.json();

        // Count customers with userType = "Customer"
        const customers = data?.filter((user) => user.userType === 'Customer');
        setCustomerCount(customers.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchProductStats();
    fetchCustomerCount();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Stats Cards */}
        <div className="p-4 bg-blue-600 text-white rounded-lg">
          <h3 className="text-xl font-bold">{customerCount}</h3>
          <p>Total Customers</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-xl font-bold">${stats.totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="p-4 bg-indigo-600 text-white rounded-lg">
          <h3 className="text-xl font-bold">4.5</h3>
          <p>Average Rating</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg">
          <h3 className="text-xl font-bold">{stats.publishedProducts}</h3>
          <p>Published Products</p>
        </div>
      </div>

      {/* Product Statistics Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Product Statistics</h2>
        <div className="flex">
          {/* Bar Chart */}
          <div className="w-2/3">
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Summary */}
          <div className="w-1/3 pl-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Total Products</h3>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Published Products</h3>
                <p className="text-2xl font-bold">{stats.publishedProducts}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold">Total Revenue</h3>
                <p className="text-2xl font-bold">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
