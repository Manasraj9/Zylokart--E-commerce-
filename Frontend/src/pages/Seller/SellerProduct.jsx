import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbars/SellerNavbar'
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, } from '@mui/material';
import { Card, CardContent, Typography, Button, Dialog, DialogActions,CardActions, DialogContent, Switch, FormControlLabel, DialogTitle, } from '@mui/material';
import axios from 'axios';

const SellerProduct = () => {

    const sidebarItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/Seller' },
        { text: 'Notification', icon: <Message />, path: 'SNotification' },
        { text: 'Product', icon: <AutoStories />, path: '/SProducts' },
        { text: 'Revenue', icon: <AccountBalance />, path: '/SRevenue' },
        { text: 'Order Management', icon: <ManageAccounts />, path: '/SOrderManagement' },
        { text: 'Settings', icon: <Settings />, path: '/SSettings' },
        { text: 'Help Center', icon: <Help />, path: '/SHelp' },
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [newImages, setNewImages] = useState([]); // Store product images
    const [productUpdates, setProductUpdates] = useState([]); // Store the updated product list
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const API_URL = "http://localhost:1337/api/products"; // Update with your API endpoint for products
    const location = useLocation(); // Get the current route
    const navigate = useNavigate(); // Navigate programmatically
    const [isPublished, setIsPublished] = useState(true); // Default state: Available
    const [originalProductDetails, setOriginalProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        images: [],
        video: null,
    });

    const handlePublishToggle = async (productId, currentState) => {
        const newState = currentState === "Available" ? "Unavailable" : "Available"; // Toggle logic

        try {
            const response = await axios.put(`http://localhost:1337/api/products/${productId}`, {
                data: {
                    Product_State: newState,  // Update the product state
                },
            });

            console.log("Product state updated:", response.data);
            toast.success(`Product ${newState} successfully!`);
            fetchProducts(); // Refresh the product list after updating the state
        } catch (error) {
            console.error("Error updating product state:", error);
            toast.error("Failed to update product state.");
        }
    };

    // Handle file upload (images and video)
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const uploadResponse = await axios.post(`${API_URL.replace('/products', '')}/upload`, formData);
            return uploadResponse.data[0]; // Return the uploaded file object
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null); // Close the deletion dialog
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:1337/api/create-products/${productId}`);
            fetchProducts(); // Refresh the product list
            toast.success("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product.");
        }
    };

    // In your handleEdit function, set the original product details
    const handleEdit = async (product) => {
        setSelectedProduct(product); // Set the product to be edited
        setIsLoading(true); // Set loading state to true while fetching data

        try {
            // Fetch the full details of the product, including images and video
            const response = await axios.get(`http://localhost:1337/api/products/${product.id}`, {
                params: {
                    populate: ['Product_Images', 'Product_Video'], // Populate the related fields like images and video
                },
            });

            const productData = response.data.data;

            // Set the product details to be used in the form
            setProductDetails({
                id: productData.id,
                name: productData.attributes.Product_Title || '',
                price: productData.attributes.Product_Price || '',
                description: productData.attributes.Product_Description || '',
                category: productData.attributes.Product_Category || '',
                stock: productData.attributes.Product_Stock || '',
            });

            // Set the original product details for comparison
            setOriginalProductDetails({
                name: productData.attributes.Product_Title || '',
                price: productData.attributes.Product_Price || '',
                description: productData.attributes.Product_Description || '',
                category: productData.attributes.Product_Category || '',
                stock: productData.attributes.Product_Stock || '',
            });

            setIsLoading(false); // Stop loading
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error("Failed to fetch product details.");
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            title: productDetails.name || originalProductDetails.name,
            price: productDetails.price || originalProductDetails.price,
            description: productDetails.description || originalProductDetails.description,
            category: productDetails.category || originalProductDetails.category,
            stock: productDetails.stock || originalProductDetails.stock,
        };

        console.log("Data to send:", dataToSend);

        try {
            const response = await axios.put(
                `http://localhost:1337/api/create-products/${productDetails.id}`,
                { data: dataToSend },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Product updated successfully:', response.data);
            toast.success("Product updated successfully!");

            // Refresh the product list or re-fetch product details after successful update
            fetchProducts(); // Re-fetch products to see the updated data
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to update product.');
        }
    };

    // Dialog to confirm product deletion
    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:1337/api/products', {
                params: {
                    populate: ['Product_Images', 'Product_Video'],
                },
            });

            const products = response.data.data || []; // Ensure the products variable is an array

            setProductUpdates(products); // Update the product list
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();  // Fetch products when the component mounts
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Box
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 240,
                            boxSizing: 'border-box',
                            position: 'relative',
                            top: '64px',
                            height: 'calc(100vh - 64px)',
                            overflowY: 'auto',
                        },
                    }}
                >
                    <List>
                        {sidebarItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)} // Navigate to the route without reloading
                                sx={{
                                    cursor: 'pointer',
                                    color: location.pathname === item.path ? 'blue' : 'inherit', // Highlight the active item
                                    backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 255, 0.1)' : 'transparent',
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname === item.path ? 'blue' : 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>

                    <Divider />
                </Box>
                <div className="flex-grow p-4">
                    <Typography variant="h2" sx={{ marginTop: '20px' }}>Product Listings</Typography>
                    <div className="flex flex-wrap gap-5 ml-5 mt-10 justify-center">
                        {Array.isArray(productUpdates) && productUpdates.length > 0 ? (
                            productUpdates.map((product) => (
                                <Card key={product.id} className='w-100'>
                                    <CardContent className='w-80'>
                                        <Typography variant="h5" component="div">{product.attributes.Product_Title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.attributes.Product_Description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${product.attributes.Product_Price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleEdit(product)}>Edit</Button>
                                        <Button size="small" onClick={() => handleClickOpen(product)}>Delete</Button>
                                        <Button
                                            size="small"
                                            onClick={() => handlePublishToggle(product.id, product.attributes.Product_State)}
                                        >
                                            {product.attributes.Product_State === 'Available' ? 'Unpublish' : 'Publish'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No products available.
                            </Typography>
                        )}
                    </div>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Are you sure you want to delete this product?</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button
                                onClick={() => {
                                    handleDeleteProduct(selectedProduct.id);
                                    handleClose();
                                }}
                                color="primary"
                            >
                                Yes, Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SellerProduct
