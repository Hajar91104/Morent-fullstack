import { Request, Response } from "express";
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";
import { calculateDateDifference } from "../utils/date";
import { Rent as TRent } from "../types/schema";

const getAll = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const filter: Record<string, string> = {};
    if (user?.role !== "admin") {
      filter.user = user?._id.toString() ?? "";
    }
    const reservations = await Reservation.find(filter)
      .populate("rent", "images price currency name description total")
      .populate("dropOffLocations")
      .populate("pickUpLocation");

    reservations.forEach((reservation) => {
      const rent = reservation.rent as TRent;
      if (rent.images) {
        console.log(rent.images);

        const newImages = rent.images.map((image) => {
          return `${process.env.BASE_URL}/public/rent/${image}`;
        });
        rent.images = [...newImages];
      }
      console.log(rent);
    });

    res.json({
      message: "reservations fetched successfully!",
      items: reservations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const {
      rentId,
      startDate,
      endDate,
      pickUpLocation,
      dropOffLocations,
      billingAddress,
      billingName,
      billingPhoneNumber,
      billingTownCity,
    } = req.matchedData;
    const rent = await Rent.findById(rentId);
    if (!rent) {
      res.status(404).json({ message: "Rent not found" });
      return;
    }
    const existReservation = await Reservation.findOne({
      rent: rentId,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
      status: {
        $in: ["pending", "approved"],
      },
    });
    if (existReservation) {
      res.status(400).json({
        message: "Car not available on these dates",
      });
      return;
    }
    const dateCount = calculateDateDifference(startDate, endDate);
    const total = dateCount * rent.price;
    const reservation = new Reservation({
      rent: rentId,
      user: req.user?._id,
      pickUpLocation,
      dropOffLocations,
      billing: {
        name: billingName,
        address: billingAddress,
        phoneNumber: billingPhoneNumber,
        townCity: billingTownCity,
      },
      startDate,
      endDate,
      total,
    });
    await reservation.save();
    res.json({
      message: "Reservation created successfully",
      item: reservation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const cancel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findOne({
      _id: id,
      user: req.user?._id,
      status: "pending",
    });

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    reservation.status = "canceled";
    await reservation.save();
    res.json({
      message: "Reservation canceled successfully",
      item: reservation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.matchedData;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    if (
      reservation.status === "canceled" ||
      reservation.status === "rejected"
    ) {
      res.status(400).json({
        message: "Reservation is already canceled or rejected",
      });
      return;
    }
    reservation.status = status;
    await reservation.save();
    res.json({
      message: "Reservation status updated!",
      item: reservation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  getAll,
  create,
  cancel,
  changeStatus,
};
