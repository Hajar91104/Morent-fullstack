import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";
// import Category from "./category";
// import rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      type,
      take = 10,
      skip = 0,
      search,
      category,
      capacity,
      min_price,
      max_price,
      pickup_location,
      dropoff_location,
    } = req.matchedData;

    const filter: Record<string, any> = {
      $and: [],
    };
    if (type === "recommended") {
      filter.showInRecommendation = true;
    }
    if (search) {
      filter.OR = [
        { name: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];
    }

    if (capacity) {
      const capacityList = typeof capacity === "string" ? [capacity] : capacity;
      filter.capacity = { $in: capacityList };
    }

    if (category) {
      const categoryList = typeof category === "string" ? [category] : category;
      filter.category = { $in: categoryList };
    }

    if (min_price) {
      filter.$and.push({ price: { $gte: +min_price } });
    }

    if (max_price) {
      filter.$and.push({ price: { $lte: +max_price } });
    }

    if (pickup_location) {
      filter.pickup_location = pickup_location;
    }
    if (dropoff_location) {
      filter.dropoff_location = {
        $elemMatch: {
          location: pickup_location,
        },
      };

      // if (filter.$and.lenght === 0) {
      //   delete filter.$and;
      // }

      const items = await Rent.find(filter)
        .skip(skip)
        .limit(take)
        .populate(["category", "pickUpLocation", "dropOffLocations"]);
      res.json({
        message: "success",
        items,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      pickUpLocation,
      dropOffLocations,
      categoryId,
      fuel,
      gearBox,
      capacity,
      price,
      currency,
      discount,
    } = req.matchedData;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }

    const images =
      (req.files as any)?.map((file: any) => {
        file.filename;
      }) || [];
    const rent = new Rent({
      name,
      description,
      pickUpLocation,
      dropOffLocations,
      category,
      fuel,
      gearBox,
      capacity,
      price,
      currency,
      discount,
      images,
    });

    await rent.save();
    category.rents.push(rent._id);
    await category.save();
    res.status(201).json({
      message: "success",
      item: rent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = {
      ...req.matchedData,
    };
    const { categoryId } = data;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }

    if (req.files && (req.files as any).length > 0) {
      data.iamges = (req.files as any).map((file: any) => file.filename);
    }

    const rent = await Rent.findById(id);

    if (!rent) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    const oldCategoryId = rent.category;

    const oldCategory = await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: {
        rents: id,
      },
    });
    category.rents.push(rent._id);
    await category.save();
    rent.updateOne(data);
    res.json({
      message: "success",
      item: rent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rent = await Rent.findByIdAndDelete(id);

    if (!rent) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.json({
      message: "success",
      item: rent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default {
  getAll,
  create,
  edit,
  remove,
};
