const { PaymentDetail } = require("../models");

// ✅ CREATE Payment
exports.createPayment = async (req, res) => {
  try {
    const payment = await PaymentDetail.create(req.body);
    res.status(201).json({ message: "Payment recorded", paymentId: payment.PaymentId });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ GET All Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentDetail.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ UPDATE Payment Status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const [updated] = await PaymentDetail.update(
      { PaymentStatus: req.body.PaymentStatus },
      { where: { PaymentId: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment status updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};
