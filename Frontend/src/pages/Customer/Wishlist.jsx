import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import CustomerNavbar from "../../components/Navbars/CustomerNavbar";

const Wishlist = () => {
    // Dummy data for wishlist items
    const wishlistItems = [
        {
            id: 1,
            title: "Daiwa 80 cm (32 inch) HD Ready LED Smart Linux TV 2024 Edition",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis fuga fugiat deleniti sit ea dolores molestiae cumque quasi.",
            price: "₹8,999",
            mrp: "₹17,990",
            discount: "49% off",
            image: "https://rukminim2.flixcart.com/image/416/416/xif0q/bed/i/w/v/queen-200-na-no-160-particle-board-no-80-bed-d-sleepyhead-80-2-original-imagrsy8yaudpazk.jpeg?q=70&crop=false",
        },
        {
            id: 2,
            title: "Sleepyhead Engineered Wood King Bed",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis fuga fugiat",
            price: "₹15,119",
            mrp: "₹21,299",
            discount: "29% off",
            image: "https://rukminim2.flixcart.com/image/416/416/xif0q/television/p/i/8/-original-imahfu6wtsgdpws9.jpeg?q=70&crop=false",
        },
        {
            id: 3,
            title: "Foxsky 80 cm (32 inch) QLED HD Ready Smart Google TV Dolby Audio",
            description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quis fuga fugiat deleniti sit ea dolores molestiae cumque quasi. dhdls slshuemejds ",
            price: "₹6,999",
            mrp: "₹26,499",
            discount: "73% off",
            image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/u/1/z/-original-imah56hk2csyvfcw.jpeg?q=70&crop=false",
        },
    ];

    return (
        <>
            <CustomerNavbar />
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto py-6 px-4">
                    {/* Header */}
                    <h1 className="text-2xl font-bold mb-4">My Wishlist ({wishlistItems.length})</h1>

                    {/* Wishlist Items */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center border-b last:border-b-0 p-4"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-32 h-32 object-contain rounded-lg"
                                />

                                {/* Product Details */}
                                <div className="flex-1 ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                    {item.description && (
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                    )}
                                    <div className="flex items-center mt-2">
                                        <span className="text-lg font-bold text-gray-800">
                                            {item.price}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through ml-2">
                                            {item.mrp}
                                        </span>
                                        <span className="text-sm text-green-600 ml-2">
                                            {item.discount}
                                        </span>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    className="p-2 text-gray-500 hover:text-red-500"
                                    onClick={() => alert(`Removing item: ${item.title}`)}
                                >
                                    <AiOutlineDelete size={24} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wishlist;
