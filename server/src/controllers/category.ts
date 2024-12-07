import { Request, Response } from "express";
import Category from "../mongoose/schemas/category";

const getAll = async (req: Request, res: Response) => {
  const data = await Category.find();

  const items = data.map((item) => ({
    _id: item._id,
    name: item.name,
    count: item.rents.length,
    createdAt: item.createdAt,
  }));

  res.json({
    message: "Categories retrieved successfully!",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const { name } = req.matchedData;

  const category = new Category({ name });

  await category.save();

  res.status(201).json({
    message: "Category created successfully!",
    item: category,
  });
};

const update = async (req: Request, res: Response) => {
  const { name } = req.matchedData;
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404).json({
      message: "Category not found!",
    });
    return;
  }

  category.name = name;

  await category.save();

  res.status(201).json({
    message: "Category updated successfully!",
    item: category,
  });
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    res.status(404).json({
      message: "Category not found!",
    });
    return;
  }

  await category.deleteOne();

  res.status(201).json({
    message: "Category deleted successfully!",
  });
};

export default {
  getAll,
  create,
  update,
  remove,
};
