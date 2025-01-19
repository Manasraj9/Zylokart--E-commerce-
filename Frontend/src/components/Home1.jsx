import React from 'react'
import ProductCard from "./Productcard";
import { Timer } from 'lucide-react';
const Home1 = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const categories = [
        { name: "Grocery", 
            icon: "🛒",
            subcategories: [
                { name: "Fruits & Vegetables", items: ["Fresh Fruits", "Fresh Vegetables", "Herbs & Seasonings"] },
                { name: "Dairy & Breakfast", items: ["Milk", "Bread", "Eggs", "Butter"] },
                { name: "Staples", items: ["Rice", "Flour", "Pulses", "Sugar"] }
            ] 
        },
        { name: "Mobiles",
             icon: "📱",
             subcategories: [
                { name: "Smartphones", items: ["iPhone", "Samsung", "OnePlus", "Xiaomi"] },
                { name: "Accessories", items: ["Cases", "Chargers", "Screen Guards"] },
                { name: "Tablets", items: ["iPad", "Samsung Tablets", "Lenovo Tablets"] }
            ]
         },
        { name: "Fashion", 
            icon: "👕",
            subcategories: [
                { name: "Men's Wear", items: ["T-Shirts", "Shirts", "Jeans", "Footwear"] },
                { name: "Women's Wear", items: ["Dresses", "Tops", "Sarees", "Footwear"] },
                { name: "Kids' Wear", items: ["Boys Clothing", "Girls Clothing", "Kids Footwear"] }
            ]
        },
        { name: "Electronics",
         icon: "💻" ,
         subcategories: [
            { name: "Computers", items: ["Laptops", "Desktops", "Tablets", "Smartphones"] },
            { name: "Gaming", items: ["Gaming Consoles", "Controllers", "Headsets", "Accessories"] },
            { name: "Cameras", items: ["Digital Cameras", "Camera Lenses", "Camera Accessories"] }
        ]
    },
        { name: "Home & Furniture",
             icon: "🏠",
             subcategories: [
                { name: "Kitchen", items: ["Cookware", "Dinnerware", "Cooking Utensils", "Kitchen Accessories"] },
                { name: "Bedroom", items: ["Beds", "Mattresses", "Bedding Sets", "Bedroom Accessories"] },
                { name: "Living Room", items: ["Sofas", "Chairs", "Tables", "Couches"] }
             ]
        },
        { name: "Appliances",
             icon: "🔌",
             subcategories: [
                { name: "Kitchen Appliances", items: ["Microwave Ovens", "Toasters", "Blenders", "Coffee Makers"] },
                { name: "Home Appliances", items: ["Refrigerators", "Washing Machines", "Dishwashers", "Air Conditioners"] },
                { name: "Cleaning Appliances", items: ["Vacuum Cleaners", "Mops", "Sweepers", "Dust Mops"] } 
             ] 
        },
        { name: "Travel",
             icon: "✈️",
             subcategories: [
                { name: "Flights", items: ["One-Way Flights", "Round-Trip Flights", "Multi-City Flights"] },
                { name: "Hotels", items: ["Budget Hotels", "Luxury Hotels", "Resorts", "Guest Houses"] },
                { name: "Cabs", items: ["Local Cabs", "Inter-City Cabs", "Airport Cabs", "Mini Cabs"] }
             ] 
        },
        { name: "Beauty & Toys",
             icon: "🎮",
             subcategories: [
                { name: "Beauty", items: ["Makeup", "Skincare", "Haircare", "Fragrances"] },
                { name: "Toys", items: ["Action Figures", "Dolls", "Puzzles", "Educational Toys"] },
                { name: "Games", items: ["Board Games", "Card Games", "Video Games", "Board Games"] }
             ] 
        },
        { name: "Two Wheelers",
             icon: "🛵",
             subcategories: [
                { name: "Scooters", items: ["Scooter", "Scooter", "Scooter", "Scooter"] },
                { name: "Motorcycles", items: ["Motorcycle", "Motorcycle", "Motorcycle", "Motorcycle"] },
                { name: "Bikes", items: ["Bike", "Bike", "Bike", "Bike"] }
             ] 
        }
    ];

    const deals = [
        { name: "Top Offers", image: "../src/images/top.webp", discount: "Up to 80% Off" },
        { name: "Mobiles", image: "../src/images/phone.webp", discount: "From ₹6,999" },
        { name: "Fashion", image: "../src/images/fashion.jpg", discount: "50-80% Off" },
        { name: "Electronics", image: "../src/images/elec.jpg", discount: "Up to 45% Off" },
        { name: "Home", image: "../src/images/home.jpg", discount: "Min 70% Off" },
    ];
    const brand = [
        { name: "Top Offers", image: "../src/images/top.webp", discount: "Up to 80% Off" },
        { name: "Mobiles", image: "../src/images/phone.webp", discount: "From ₹6,999" },
        { name: "Fashion", image: "../src/images/fashion.jpg", discount: "50-80% Off" },
        { name: "Electronics", image: "../src/images/elec.jpg", discount: "Up to 45% Off" },
        { name: "Home", image: "../src/images/home.jpg", discount: "Min 70% Off" },
    ];
    

    return (
        <div className="min-h-screen bg-gray-100">
            
            {/* Header */}
            <header className="bg-[#1867b1] text-white">
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

            {/* Categories Bar with Dropdowns */}
            <div className="bg-white shadow relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between py-4">
                        {categories.map((category, index) => (
                            <div key={index} className="group relative">
                                <div className="flex flex-col items-center gap-2 cursor-pointer">
                                    <span className="text-2xl group-hover:transform group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </span>
                                    <span className="text-sm font-medium text-gray-800 group-hover:text-[#2874f0]">
                                        {category.name}
                                    </span>
                                </div>

                                {/* Dropdown Menu */}
                                <div className="invisible group-hover:visible absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg mt-1 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {category.subcategories?.map((subcat, subIndex) => (
                                        <div key={subIndex} className="p-4 hover:bg-gray-50">
                                            <h3 className="font-medium text-gray-900 mb-2">{subcat.name}</h3>
                                            <ul className="space-y-2">
                                                {subcat.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <a href="#" className="text-gray-600 hover:text-[#2874f0] text-sm block">
                                                            {item}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Card */}
            <ProductCard />
            {/* Deals Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded shadow p-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                        <i className="fas fa-bolt text-yellow-500 mr-2"></i>
                            <h2 className="text-2xl font-bold">Deals of the Day</h2>
                            <div className="flex items-center gap-2 text-red-500">
                                <Timer className="w-5 h-5" />
                                <span className="font-medium">22:10:32 Left</span>
                            </div>
                        </div>
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

            {/* Featured Brands Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Featured Brands</h2>
                <div className="grid grid-cols-6 gap-4">
                    {brand.map((brand,index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={brand.image}
                                    alt={`Brand ${index}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="font-medium text-center mb-1">Brand {index}</h3>
                            <p className="text-green-600 text-sm text-center font-medium">Up to {20 + index * 5}% off</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Home1
