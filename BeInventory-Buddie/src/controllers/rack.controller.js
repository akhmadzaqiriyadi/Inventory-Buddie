const prisma = require('../config/database');

// GET all racks
const getAllRacks = async (req, res) => {
  try {
    const racks = await prisma.rack.findMany();
    res.status(200).json(racks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch racks' });
  }
};

// POST create new rack
const createRack = async (req, res) => {
  const { location } = req.body;

  try {
    const newRack = await prisma.rack.create({
      data: { location },
    });
    res.status(201).json(newRack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rack' });
  }
};

// PUT update rack
const updateRack = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;

  try {
    const updatedRack = await prisma.rack.update({
      where: { id: parseInt(id) },
      data: { location },
    });
    res.status(200).json(updatedRack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rack' });
  }
};

// DELETE rack
const deleteRack = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.rack.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rack' });
  }
};

module.exports = {
  getAllRacks,
  createRack,
  updateRack,
  deleteRack,
};
