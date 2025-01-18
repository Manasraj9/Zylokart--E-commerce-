import React from 'react'


const Home1 = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const categories = [
        { name: "Grocery", icon: "🛒" },
        { name: "Mobiles", icon: "📱" },
        { name: "Fashion", icon: "👕" },
        { name: "Electronics", icon: "💻" },
        { name: "Home & Furniture", icon: "🏠" },
        { name: "Appliances", icon: "🔌" },
        { name: "Travel", icon: "✈️" },
        { name: "Beauty & Toys", icon: "🎮" },
        { name: "Two Wheelers", icon: "🛵" }
    ];

    const deals = [
        { name: "Top Offers", image: "/api/placeholder/150/150", discount: "Up to 80% Off" },
        { name: "Mobiles", image: "/api/placeholder/150/150", discount: "From ₹6,999" },
        { name: "Fashion", image: "/api/placeholder/150/150", discount: "50-80% Off" },
        { name: "Electronics", image: "/api/placeholder/150/150", discount: "Up to 45% Off" },
        { name: "Home", image: "/api/placeholder/150/150", discount: "Min 70% Off" },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            
            {/* Header */}
            <header className="bg-[#28f039] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center h-16 gap-8">

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full py-2 px-4 pr-10 rounded-sm text-black"
                                    placeholder="Search for products, brands and more"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="fas fa-search absolute right-3 top-3 text-[#2874f0]"></i>
                            </div>
                        </div>

                        {/* Navigation with Font Awesome Icons */}
                        <nav className="flex items-center gap-8">
                            <button className="bg-white text-[#2874f0] px-8 py-1 font-medium">
                                <i className="fas fa-user mr-2"></i>Login
                            </button>
                            <a href="#" className="flex items-center gap-2 hover:text-gray-200">
                                <i className="fas fa-shopping-cart"></i>
                                Cart
                            </a>
                            <a href="#" className="hover:text-gray-200">
                                <i className="fas fa-heart mr-2"></i>
                                Wishlist
                            </a>
                            <a href="#" className="hover:text-gray-200">
                                <i className="fas fa-bell mr-2"></i>
                                Notifications
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Categories Bar */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between py-4">
                        {categories.map((category, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 cursor-pointer group">
                                <span className="text-2xl group-hover:transform group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </span>
                                <span className="text-sm font-medium text-gray-800 group-hover:text-[#2874f0]">
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Deals Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded shadow p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                            Deals of the Day
                        </h2>
                        <button className="bg-[#2874f0] text-white px-6 py-2 rounded">
                            VIEW ALL
                            <i className="fas fa-chevron-right ml-2"></i>
                        </button>
                    </div>

                    <div className="grid grid-cols-5 gap-6">
                        {deals.map((deal, index) => (
                            <div key={index} className="flex flex-col items-center group cursor-pointer">
                                <img 
                                    src={deal.image} 
                                    alt={deal.name}
                                    className="w-32 h-32 object-cover mb-4 group-hover:scale-105 transition-transform"
                                />
                                <h3 className="font-medium text-gray-800 mb-1">{deal.name}</h3>
                                <p className="text-green-600 font-medium">
                                    <i className="fas fa-tag mr-1"></i>
                                    {deal.discount}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home1
