const Order = require('../Model/Orders');
const Product = require('../Model/Products');
const { StatusCodes } = require('http-status-codes');

// Create a new order
const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "No order items" });
    }

    let totalPrice = 0;

    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Product not found: ${item.product}` });
        }

        totalPrice += product.price * item.qty;
    }

    const order = await Order.create({
        user: req.user.userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    });

    res.status(StatusCodes.CREATED).json({ order });
};

// Get all orders for a logged-in user
const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId }).sort('-createdAt');
    res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

// Get single order (admin or user)
const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId).populate('user', 'name email');

    if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
    }

    // Only allow owner or admin to access
    if (req.user.userId !== order.user._id.toString() && req.user.role !== 'admin') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not authorized to view this order" });
    }

    res.status(StatusCodes.OK).json({ order });
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

// Mark order as paid
const updateOrderToPaid = async (req, res) => {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.status(StatusCodes.OK).json({ message: "Order marked as paid", order });
};

// Mark order as delivered (admin only)
const updateOrderToDelivered = async (req, res) => {
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(StatusCodes.OK).json({ message: "Order marked as delivered", order });
};

module.exports = {
    createOrder,
    getUserOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered
};
