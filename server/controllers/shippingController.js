const { ShippingDetail } = require("../models");

// ✅ UPDATE Shipping Status
exports.updateShippingStatus = async (req, res) => {
  try {
    const [updated] = await ShippingDetail.update(
      { ShippingStatus: req.body.ShippingStatus },
      { where: { ShippingId: req.params.id } }
    );
    if (!updated) return res.status(404).json({ message: "Shipping not found" });
    res.json({ message: "Shipping status updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ✅ GET All Shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await ShippingDetail.findAll();
    res.json(shipments);
  } catch (error) {
    res.status(500).json(error);
  }
};
