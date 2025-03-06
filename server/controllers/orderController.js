const { Order, Product, User } = require("../models"); // ✅ Ensure correct imports

// ✅ CREATE a New Order
const createOrder = async (req, res) => {  // ✅ Define the function before exporting
  try {
    const { UserId, ProductId, quantityOrdered } = req.body;
const user = await User.findByPk(UserId);


    // 🔹 Check if Customer exists
    
    if (!user) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // 🔹 Check if Product exists
    const product = await Product.findByPk(ProductId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 🔹 Check if there is enough stock
    if (product.Quantity < quantityOrdered) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // 🔹 Calculate Total Price
    const TotalAmount = product.UnitPrice * quantityOrdered;

    // 🔹 Reduce Stock
    await product.update({ Quantity: product.Quantity - quantityOrdered });

    // 🔹 Create the Order
    const order = await Order.create({
      UserId,
      ProductId,
      quantityOrdered,
      TotalAmount,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET Order by ID with Product & Customer Details
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["ProductId", "ProductName", "UnitPrice"],
        },
        {
          model: User, // ✅ Use 'User' instead of 'Customer'
          attributes: ["UserId", "UserName", "EmailId"],
        },
      ],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const [updated] = await Order.update(
      { OrderStatus: req.body.OrderStatus },
      { where: { OrderId: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE an Order
const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { OrderId: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ EXPORT ALL FUNCTIONS CORRECTLY
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
