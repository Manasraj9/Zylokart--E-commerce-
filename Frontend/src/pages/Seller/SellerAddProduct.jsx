import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SellerAddProduct = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Product_Title: "",
    Product_Description: "",
    Product_MRP: "",
    Product_DiscountedPrice: "",
    Product_DiscountPercentage: "",
    Product_Stock: "",
    Product_Category: "",
    Product_Subcategory: "",
    Product_Image: null,
    Product_FeaturesImage: null,
    Product_Video: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      Product_Title,
      Product_Description,
      Product_MRP,
      Product_DiscountedPrice,
      Product_DiscountPercentage,
      Product_Stock,
      Product_Category,
      Product_Subcategory,
      Product_Image,
      Product_FeaturesImage,
      Product_Video
    } = formData;

    if (!Product_Title || !Product_Description || !Product_MRP || !Product_Stock) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      if (!token) throw new Error("Unauthorized. Please log in again.");

      const productData = {
        Product_Title,
        Product_Description,
        Product_MRP,
        Product_DiscountPercentage,
        Product_DiscountedPrice: Product_DiscountedPrice || null,
        Product_Stock,
        Product_Category,
        Product_Subcategory,
      };

      console.log("Submitting product data:", productData);

      const response = await fetch('http://localhost:1337/api/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: productData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create product.");

      const { id } = result.data;

      const formDataToUpload = new FormData();

      // Only append the file if it's defined
      if (Product_Image) {
        console.log("Appending Product_Image:", Product_Image.name);
        formDataToUpload.append("files", Product_Image, Product_Image.name);
      } else {
        console.log("No Product_Image selected.");
      }

      if (Product_FeaturesImage) {
        console.log("Appending Product_FeaturesImage:", Product_FeaturesImage.name);
        formDataToUpload.append("files", Product_FeaturesImage, Product_FeaturesImage.name);
      } else {
        console.log("No Product_FeaturesImage selected.");
      }

      if (Product_Video) {
        console.log("Appending Product_Video:", Product_Video.name);
        formDataToUpload.append("files", Product_Video, Product_Video.name);
      } else {
        console.log("No Product_Video selected.");
      }

      // Debugging FormData entries
      for (let [key, value] of formDataToUpload.entries()) {
        console.log(`FormData entry: ${key} ->`, value);
      }

      // Proceed with file upload only if there are files to upload
      if (formDataToUpload.has("files")) {
        const uploadResponse = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToUpload,
        });

        const uploadedFiles = await uploadResponse.json();
        console.log("Uploaded files:", uploadedFiles);

        if (!Array.isArray(uploadedFiles)) throw new Error("File upload failed.");
      } else {
        console.log("No files to upload.");
      }


      toast.success("Product created successfully!");
      navigate("/SProducts");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Product_Category: e.target.value,
      Product_Subcategory: "", // Reset subcategory when category changes
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      console.log("File input detected:", name, files[0]);
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };




  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add a Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Title</label>
          <input
            type="text"
            name="Product_Title"
            value={formData.Product_Title}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Product title"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Description</label>
          <textarea
            name="Product_Description"
            value={formData.Product_Description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Product description"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="Product_Category"
            value={formData.Product_Category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subcategory
          </label>
          <select
            name="Product_Subcategory"
            value={formData.Product_Subcategory}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={!formData.Product_Category}
          >
            <option value="">Select a Subcategory</option>
            {formData.Product_Category &&
              categories
                .find((cat) => cat.name === formData.Product_Category)
                ?.subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
          </select>
        </div>

        {/* Product MRP */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product MRP</label>
          <input
            type="Number"
            name="Product_MRP"
            value={formData.Product_MRP}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Product MRP"
            required
          />
        </div>

        {/* Product Discounted Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
          <input
            type="Number"
            name="Product_DiscountedPrice"
            value={formData.Product_DiscountedPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Discounted Price"
          />
        </div>

        {/* Product Discounted Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Discounted Percentage</label>
          <input
            type="Number"
            name="Product_DiscountedPercentage"
            value={formData.Product_DiscountPercentage}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Discounted Percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Stock</label>
          <input
            type="Number"
            name="Product_Stock"
            value={formData.Product_Stock}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the number of Stock Available"
          />
        </div>

        <input
          type="file"
          name="Product_Image"  // Updated name to match state key
          onChange={(e) => {
            console.log("Image File Selected:", e.target.files[0]?.name);
            handleInputChange(e);
          }}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm"
        />

        <input
          type="file"
          name="Product_FeaturesImage"
          onChange={(e) => {
            console.log("Image File Selected:", e.target.files[0]?.name);
            handleInputChange(e);
          }}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm"
        />

        <input
          type="file"
          name="Product_Video"  // Updated name to match state key
          onChange={(e) => {
            console.log("Video File Selected:", e.target.files[0]?.name);
            handleInputChange(e);
          }}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm"
        />



        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

const categories = [
  {
    name: "Electronics and Appliances",
    subcategories: [
      "Smartphones & Accessories",
      "Laptops & Computers",
      "Televisions",
      "Home Appliances",
      "Cameras & Photography",
      "Gaming Consoles & Accessories",
      'Audio Devices',
      'Smart Home Devices'
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      "Men’s Clothing (T-shirts, Shirts, Jeans, etc.)",
      "Women’s Clothing (Dresses, Tops, Sarees, etc.)",
      "Kids Clothing",
      "Footwear (Men, Women, Kids)",
      "Accessories (Bags, Belts, Wallets)",
      "Jewelry & Watches",
    ],
  },
  {
    name: "Home and Furniture",
    subcategories: [
      "Furniture (Sofas, Beds, Tables)",
      "Home Décor (Wall Art, Clocks, etc.)",
      "Kitchen & Dining (Cookware, Dinnerware)",
      "Home Furnishing",
      "Lighting & Lamps",
    ],
  },
  {
    name: "Beauty and Personal Care",
    subcategories: [
      "Makeup & Cosmetics",
      "Skin Care (Moisturizers, Sunscreens)",
      "Hair Care (Shampoos, Hair Oils)",
      "Personal Hygiene (Soaps, Sanitizers, Razors)",
      "Fragrances (Perfumes, Deodorants)",
    ],
  },
  {
    name: "Sports, Books, and Hobbies",
    subcategories: [
      "Sports Equipment (Cricket Bats, Yoga Mats)",
      "Fitness Gear (Gym Equipment, Activewear)",
      "Books (Fiction, Non-Fiction, Academic)",
      "Stationery (Notebooks, Pens)",
      "Musical Instruments",
      'Craft & Hobbies Supplies'
    ],
  },
  {
    name: "Grocery and Essentials",
    subcategories: [
      'Fruits & Vegetables',
      'Beverages(Coffee, Tea, Soft Drinks)',
      'Snacks & Packaged Foods',
      'Cooking Essentials(Spices, Oils, Grains)',
      'Baby Products',
      'Pet Supplies'
    ],
  },
  {
    name: "Automotive",
    subcategories: [
      "Car Accessories (Seat Covers, Air Fresheners)",
      "Bike Accessories",
      'Automotive Tools',
      'Tyres & Alloys'
    ],
  },
  {
    name: "Health and Wellness",
    subcategories: [
      'Vitamins & Supplements',
      "Medical Equipment",
      "First Aid Supplies",
      'Fitness Equipment'
    ],
  },
  {
    name: "Toys, Kids, and Baby Products",
    subcategories: [
      'Toys (Educational, Action Figures, Dolls)',
      'Baby Care (Diapers, Feeding Bottles)',
      'Kids Furniture & Accessories'
    ],
  },
  {
    name: "Industrial and Professional Supplies",
    subcategories: [
      'Tools & Hardware',
      'Safety Equipment',
      'Office Supplies',
      'Cleaning Supplies'
    ],
  },
  {
    name: "Others",
    subcategories: [
      'Gift Cards',
      'Subscription Services',
      'Seasonal Specials (Festive Décor, Winterwear, etc.)'
    ],
  },
];

export default SellerAddProduct
