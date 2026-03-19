const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// CREATE
router.post("/", auth, upload.single("image"), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    count: req.body.count,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image: req.file ? req.file.filename : "",
  });

  await product.save();
  res.json(product);
});

// GET ALL
router.get("/", auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  const updateData = {
    name: req.body.name,
    count: req.body.count,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
  };

  if (req.file) updateData.image = req.file.filename;

  const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;