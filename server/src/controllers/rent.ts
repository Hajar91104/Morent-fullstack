import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";
import Review from "../mongoose/schemas/review";
// import Category from "./category";

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
      $or: [],
    };
    if (type === "recommended") {
      filter.showInRecommendation = true;
    }
    if (search) {
      filter.$or.push(
        { name: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } }
      );
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
      filter.pickUpLocation = pickup_location;
    }
    if (dropoff_location) {
      filter.dropOffLocations = {
        $in: [dropoff_location],
      };

      // if (filter.$and.lenght === 0) {
      //   delete filter.$and;
      // }
    }
    const items = await Rent.find(filter)
      .skip(+skip)
      .limit(+take)
      .populate(["category", "pickUpLocation", "dropOffLocations"]);

    const total = await Rent.countDocuments(filter);
    items.forEach((item) => {
      item.images = item.images.map(
        (image) => `${process.env.BASE_URL}/public/rent/${image}`
      );
    });
    res.status(201).json({
      message: "success",
      items,
      total,
      take: +take,
      skip: +skip,
    });
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
      showInRecommendation,
    } = req.matchedData;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }

    // const images =
    //   (req.files as any)?.map((file: any) => {
    //     file.filename;
    //   }) || [];
    const images = (req.files as any)?.map((file: any) => file.filename) || [];

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
      showInRecommendation,
    });

    await rent.save();

    category.rents.push(rent._id);
    await category.save();
    res.status(201).json({
      message: "success",
      item: rent,
    });
  } catch (error) {
    console.error("Error creating rent:", error);

    res.json({
      message: error,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findById(id).populate([
      "category",
      "pickUpLocation",
      "dropOffLocations",
    ]);

    if (!rent) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    const reviews = await Review.find({
      rent: id,
      status: "approved",
    }).populate("author", "name surname");

    rent.images = rent.images.map(
      (image) => `${process.env.BASE_URL}/public/rent/${image}`
    );

    res.json({
      message: "success",
      item: { ...rent.toObject(), reviews },
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

    // data.dropOffLocations = JSON.parse(req.body.dropOffLocations || "[]");
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

    rent.name = data.name;
    rent.description = data.description;
    rent.category = data.categoryId;
    rent.pickUpLocation = data.pickUpLocation;
    rent.dropOffLocations = data.dropOffLocations;
    rent.fuel = data.fuel;
    rent.gearBox = data.gearBox;
    rent.capacity = data.capacity;
    rent.price = data.price;
    rent.discount = data.discount;
    if (data.images) rent.images = data.images;
    if (data.showInRecommendation !== undefined)
      rent.showInRecommendation = data.showInRecommendation;

    await rent.save();

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
  getById,
  create,
  edit,
  remove,
};
