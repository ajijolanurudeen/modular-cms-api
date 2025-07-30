const express = require('express');
const {
    createOrder,
    getUserOrders,
    getSingleOrder,
    getAllOrders,
    updateOrderToPaid,
    updateOrderToDelivered
} = require('../controllers/Orders');

const { authenticateUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

//  Only authenticated users can create orders
router.post('/', authenticateUser, createOrder);

//  User's own orders
router.get('/my-orders', authenticateUser, getUserOrders);

//  Single order view (user or admin)
router.get('/:id', authenticateUser, getSingleOrder);

// Admin-only routes
router.get('/', authenticateUser, authorizeRoles('admin'), getAllOrders);
router.patch('/:id/pay', authenticateUser, updateOrderToPaid);
router.patch('/:id/deliver', authenticateUser, authorizeRoles('admin'), updateOrderToDelivered);

module.exports = router;
