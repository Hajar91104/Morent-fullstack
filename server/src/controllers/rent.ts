import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Rent from "../mongoose/schemas/rent";
// import rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
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
};

const create = async (req: Request, res: Response) => {
  const {
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
  } = req.matchedData;

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
  });

  await rent.save();
  res.status(201).json({
    message: "seccess",
    item: rent,
  });
};

export default {
  getAll,
  create,
};
