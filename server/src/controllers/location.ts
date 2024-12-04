import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";

const getAll = async (req: Request, res: Response) => {
  const locations = await Location.find();

  res.json({
    message: "Locations retrieved successfully!",
    items: locations,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const location = new Location({ name });

  await location.save();

  res.status(201).json({
    message: "Location created successfully!",
    item: location,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const location = await Location.findById(id);

  if (!location) {
    res.status(404).json({
      message: "Location not found!",
    });
    return;
  }

  location.name = name;

  await location.save();

  res.status(201).json({
    message: "Location updated successfully!",
    item: location,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const location = await Location.findById(id);

  if (!location) {
    res.status(404).json({
      message: "Location not found!",
    });
    return;
  }

  await location.deleteOne();

  res.status(201).json({
    message: "Location deleted successfully!",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
