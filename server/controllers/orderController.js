const { Order } = require("../models");

// ✅ CREATE a New Order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ message: "Order placed successfully", orderId: order.OrderId });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ GET All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ GET a Single Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ UPDATE Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const [updated] = await Order.update(
      { OrderStatus: req.body.OrderStatus },
      { where: { OrderId: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ DELETE an Order
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { OrderId: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
