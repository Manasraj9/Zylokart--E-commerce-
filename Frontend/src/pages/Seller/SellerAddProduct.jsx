import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SellerAddProduct = () => {
  const token = localStorage.getItem('token');
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Product_Title: "",
    Product_Description: "",
    Product_Subject: "",
    Product_VR_link: "",
    Product_Duration: "",
    Product_Activity: false,
    Product_Difficulty: "Beginner",
    Product_trailer: null, // for file
    Product_Notes: null,
    Product_Thumbnail: null, // for file
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files[0]) {
      const { name: fileName, size, type: fileType } = files[0];

      // Validate file type (optional)
      const allowedFileTypes = ["application/pdf", "video/mp4", "image/jpg", "image/jpeg", "image/png"];
      if (!allowedFileTypes.includes(fileType)) {
        return console.error("Invalid file type selected.");
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };



  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Product_trailer, Product_Notes, Product_Thumbnail } = formData;

    // Validate file sizes
    if (Product_trailer && Product_trailer.size > MAX_FILE_SIZE) {
      return toast.error("Product trailer file is too large.");
    }
    if (Product_Notes && Product_Notes.size > MAX_FILE_SIZE) {
      return toast.error("Product notes file is too large.");
    }
    if (Product_Thumbnail && Product_Thumbnail.size > MAX_FILE_SIZE) {
      return toast.error("Product thumbnail file is too large.");
    }

    // Prepare Product data
    const ProductData = {
      Product_Title: formData.Product_Title,
      Product_Description: formData.Product_Description,
      Product_Subject: formData.Product_Subject,
      Product_VR_link: formData.Product_VR_link,
      Product_Duration: formData.Product_Duration,
      Product_Activity: formData.Product_Activity,
      Product_Difficulty: formData.Product_Difficulty,
    };

    try {
      if (!token) throw new Error("Unauthorized. Please log in again.");

      // Submit Product data
      const response = await fetch('http://localhost:1337/api/create-Products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: ProductData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create Product.");

      const { id } = result.data;

      // File Upload
      const formDataToUpload = new FormData();
      if (Product_trailer) formDataToUpload.append("files", Product_trailer, Product_trailer.name);
      if (Product_Notes) formDataToUpload.append("files", Product_Notes, Product_Notes.name);
      if (Product_Thumbnail) formDataToUpload.append("files", Product_Thumbnail, Product_Thumbnail.name);

      if (formDataToUpload.has("files")) {
        console.log("Starting file upload...");
        const uploadResponse = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToUpload,
        });

        const uploadedFiles = await uploadResponse.json();
        if (!uploadedFiles || !Array.isArray(uploadedFiles)) throw new Error("Invalid upload response.");

        // Extract file references
        const trailerMedia = Product_trailer
          ? uploadedFiles.find(file => file.name === Product_trailer.name)
          : null;
        const notesMedia = Product_Notes
          ? uploadedFiles.find(file => file.name === Product_Notes.name)
          : null;
        const thumbnailMedia = Product_Thumbnail
          ? uploadedFiles.find(file => file.name === Product_Thumbnail.name)
          : null;

        // Update Product with media
        const updatePayload = {
          data: {
            Product_trailer: trailerMedia?.id || null,
            Product_Notes: notesMedia?.id || null,
            Product_Thumbnail: thumbnailMedia?.id || null,
          },
        };

        const updateResponse = await fetch(`http://localhost:1337/api/create-Products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        });

        const updateResult = await updateResponse.json();
        if (!updateResponse.ok) throw new Error(updateResult.message || "Failed to update Product.");
      }

      toast.success("Product created and media uploaded successfully!");
      navigate("/ProductsAdmin");
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
          <label className="block text-sm font-medium text-gray-700">Product MRP</label>
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
          <label className="block text-sm font-medium text-gray-700">Product MRP</label>
          <input
            type="Number"
            name="Product_DiscountedPercentage"
            value={formData.Product_DiscountedPercentage}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Discounted Percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            name="Product_Images"
            onChange={(e) => {
              console.log("Image File Selected:", e.target.files[0]?.name);
              handleInputChange(e);
            }}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Features Image</label>
          <input
            type="file"
            name="Product_FeaturesImage"
            onChange={(e) => {
              console.log("Image File Selected:", e.target.files[0]?.name);
              handleInputChange(e);
            }}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm"
          />
        </div>


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
