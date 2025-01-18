import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbars/SellerNavbar'
import { toast } from 'react-toastify';
import { Dashboard, Message, Settings, Help, AccountBalance, AutoStories, StarBorderPurple500, ManageAccounts } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, } from '@mui/material';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, TextField, CardActions, DialogContent, Switch, FormControlLabel, DialogTitle, } from '@mui/material';
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
    const [productUpdates, setProductUpdates] = useState([]); // Store the updated product list
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const API_URL = "http://localhost:1337/api/products"; // Update with your API endpoint for products
    const location = useLocation(); // Get the current route
    const navigate = useNavigate(); // Navigate programmatically
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [originalProductDetails, setOriginalProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        discountedPrice: '',
        discountPercentage: '',
    });

    const handlePublishToggle = async (productId, currentState) => {
        const newState = currentState === true ? false : true; // Toggle logic for boolean

        try {
            const response = await axios.put(`http://localhost:1337/api/products/${productId}`, {
                data: {
                    Product_State: newState, // Update the state with boolean values
                },
            });

            console.log("Product state updated:", response.data);
            toast.success(`Product state updated to ${newState ? "Published" : "Draft"} successfully!`);
            fetchProducts(); // Refresh the product list after updating the state
        } catch (error) {
            console.error("Error updating product state:", error);
            toast.error("Failed to update product state.");
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:1337/api/products/${productId}`);
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
                price: productData.attributes.Product_MRP || '',
                stock: productData.attributes.Product_Stock || '',
                discountedPrice: productData.attributes.Product_DiscountedPrice || '',
                discountPercentage: productData.attributes.Prouduct_DiscountPercentage || '',
            });

            // Set the original product details for comparison
            setOriginalProductDetails({
                name: productData.attributes.Product_Title || '',
                price: productData.attributes.Product_MRP || '',
                stock: productData.attributes.Product_Stock || '',
                discountedPrice: productData.attributes.Product_DiscountedPrice || '',
                discountPercentage: productData.attributes.Prouduct_DiscountPercentage || '',
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
            Product_Title: productDetails.name || originalProductDetails.name,
            Product_MRP: Number(productDetails.price) || Number(originalProductDetails.price),
            Product_Stock: Number(productDetails.stock) || Number(originalProductDetails.stock),
            Product_DiscountedPrice: Number(productDetails.discountedPrice) || Number(originalProductDetails.discountedPrice),
            Product_DiscountPercentage: Number(productDetails.discountPercentage) || Number(originalProductDetails.discountPercentage),
        };

        console.log("Data to send:", dataToSend);

        // Check the payload structure before sending the request
        console.log("Sending PUT request to:", `http://localhost:1337/api/products/${selectedProduct.id}`);
        console.log("Payload being sent:", { data: dataToSend });

        try {
            const response = await axios.put(
                `http://localhost:1337/api/products/${selectedProduct.id}`,
                { data: dataToSend } // Wrap the data in a 'data' field
            );


            toast.success("Product updated successfully!");
            fetchProducts(); // Re-fetch products to see the updated data
            window.location.reload(); // Reload the page
        } catch (error) {
            // Add more detailed error logging
            if (error.response) {
                console.error('Error response:', error.response);
                console.error('Error response status:', error.response.status);
                console.error('Error response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            toast.error('Failed to update product.');
        }
    };

    const handleClickOpenDelete = (product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);  // Open the Delete confirmation dialog
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedProduct(null); // Reset selected product for delete
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null); // Close the deletion dialog
    };


    // Dialog to confirm product deletion
    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:1337/api/products');
            console.log("Fetched products:", response.data);
            setProductUpdates(response.data.data); // Update the product list
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
                    <Typography variant="h4" sx={{ marginTop: '20px' }} className='underline'>Product Listings</Typography>
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
                                            MRP: {product.attributes.Product_MRP}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Stock: {product.attributes.Product_Stock}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Discount Percentage: {product.attributes.Prouduct_DiscountPercentage}
                                        </Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={product.attributes.Product_State} // Check if the product is published (boolean)
                                                    onChange={() => handlePublishToggle(product.id, product.attributes.Product_State)} // Pass the product ID and current state
                                                    color="success"
                                                    name="publishSwitch"
                                                    inputProps={{ 'aria-label': 'publish-unpublish toggle' }}
                                                />
                                            }
                                            label={product.attributes.Product_State ? "Published" : "Draft"} // Display the correct label based on boolean value
                                        />

                                        <div className="flex justify-between items-center mt-3">

                                            {/* DELETE BUTTON */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents the click from propagating to parent elements
                                                    handleClickOpenDelete(product); // Open the Delete confirmation dialog
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md shadow"
                                            >
                                                DELETE
                                            </button>

                                            {/* EDIT BUTTON */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(product)} } // Correct function for Edit
                                                className="px-4 py-2 bg-[#3f72af] text-white rounded-md shadow hover:bg-white hover:text-[#3f72af]"
                                            >
                                                EDIT
                                            </button>

                                            {/* DETAILS BUTTON */}
                                            <Link to={`/details/${product.id}`}>
                                                <Button
                                                    className="px-4 py-2 rounded-md shadow text-2xl hover:bg-white hover:text-[#3f72af]"
                                                    sx={{
                                                        backgroundColor: '#3f72af',
                                                        color: 'white',
                                                    }}
                                                >
                                                    DETAILS
                                                </Button>
                                            </Link>
                                            

                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No products available.
                            </Typography>
                        )}
                    </div>

                    <Dialog open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
                        <DialogTitle className='text-3xl'>Edit Course</DialogTitle>
                        <div>
                            <DialogContent className='p-4 flex flex-wrap gap-2.5'>
                                <TextField
                                    label="Product Name"
                                    value={productDetails.name || ''}
                                    onChange={(e) => setCourseDetails({ ...productDetails, name: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Product Price"
                                    type="number" // For numeric input
                                    value={productDetails.price || ''}
                                    onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                                    fullWidth
                                />

                                <TextField
                                    label="Discounted Price"
                                    type="number" // For numeric input
                                    value={productDetails.discountedPrice || ''}
                                    onChange={(e) => setProductDetails({ ...productDetails, discountedPrice: e.target.value })}
                                    fullWidth
                                />

                                <TextField
                                    label="Discount Percentage"
                                    type="number" // For numeric input
                                    value={productDetails.discountPercentage || ''}
                                    onChange={(e) => setProductDetails({ ...productDetails, discountPercentage: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Stock"
                                    type="number" // For numeric input
                                    value={productDetails.stock || ''}
                                    onChange={(e) => setProductDetails({ ...productDetails, stock: e.target.value })}
                                    fullWidth
                                />
                            </DialogContent>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSubmit} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                            <Button onClick={handleDeleteProduct} color="primary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SellerProduct
