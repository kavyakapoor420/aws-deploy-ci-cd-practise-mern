const express=require('express')
const itemRouter=express.Router() 
const Items=require('../models/Item')


// Get all items
itemRouter.get("/", async (req, res) => {
  const items = await Items.find();
  res.json(items);
});

// Add item
itemRouter.post("/", async (req, res) => {
  const newItem = new Items({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

// Update item
itemRouter.put("/:id", async (req, res) => {
  const updated = await Items.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updated);
});

// Delete item
itemRouter.delete("/:id", async (req, res) => {
  await Items.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = itemRouter;
