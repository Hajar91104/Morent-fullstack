import { ReviewStar } from "@/components/shared/ReviewStar";
import { useState } from "react";

import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import HeartFilledImg from "@/assets/icons/heart-filled.svg";
import { Button } from "@/components/ui/button";
import { Rent } from "@/types";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectUserData } from "@/store/features/userSlice";
import { ModalTypeEnum, useDialog } from "@/hooks/useDialog";
import { toast } from "sonner";

type Props = {
  rent: Rent;
};
export const InformationSection = ({ rent }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useSelector(selectUserData);
  const { openDialog } = useDialog();
  const {
    _id,
    name,
    description,
    fuel,
    gearBox,
    capacity,
    category,
    price,
    discount,
    reviews,
  } = rent;
  const rating = Math.round(
    reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length
  );
  return (
    <div className="bg-white rounded-[10px] p-4 lg:p-6 relative">
      <h1 className="text-secondary-500 text-2xl lg:text-[32px] !leading-[-0.96px] font-bold">
        {name}
      </h1>
      <div className="mt-2 flex items-center gap-x-2">
        <ReviewStar rating={rating} />
        <p className="text-secondary text-sm font-medium tracking-[-0.28px]">
          {reviews.length} Reviewers
        </p>
        <button
          onClick={() => {
            setIsLiked(!isLiked);
          }}
          className="h-fit absolute right-6 top-6"
        >
          <img src={isLiked ? HeartFilledImg : HeartOutlinedImg} alt="heart" />
        </button>
      </div>
      <p className="min-h-[120px] my-5 lg:my-8 text-lg lg:text-xl !leading-[200%] tracking-[-0.4px] text-secondary">
        {description}
      </p>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Type Car
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] ">
            {category.name}
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Capacity
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] ">
            {capacity} People
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Steering
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] ">
            {gearBox}
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Gasoline
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] ">
            {fuel}L
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-12 lg:mt-16">
        <div>
          <p className="text-secondary-500 text-[28px] font-bold">
            {formatPrice(price - discount)}/{" "}
            <span className="text-base text-secondary-300">day</span>
          </p>
          <p className="line-through text-secondary-300 text-base font-bold">
            {formatPrice(price)}
          </p>
        </div>
        <Button asChild>
          <Link
            to={paths.PAYMENT(_id)}
            onClick={() => {
              if (!user) {
                toast.warning("Please login to rent a car");
                openDialog(ModalTypeEnum.LOGIN);
              }
            }}
          >
            Rent Now
          </Link>
        </Button>
      </div>
    </div>
  );
};
