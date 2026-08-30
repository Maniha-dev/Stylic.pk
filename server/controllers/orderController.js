import Order from "../models/Order.js"
import Product from "../models/product.js"

// Place Order : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address, paymentType = "COD" } = req.body
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })
        }

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        const selectedPaymentType = paymentType === "JazzCash" ? "JazzCash" : "COD";

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: selectedPaymentType,
            isPaid: selectedPaymentType === "COD" ? false : false,
        });

        return res.json({ success: true, message: "Order Placed Successfully" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { paymentType: "JazzCash" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { paymentType: "JazzCash" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}