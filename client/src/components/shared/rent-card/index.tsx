import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import HeartFilledImg from "@/assets/icons/heart-filled.svg";
import Car from "@/assets/images/Car.png";
import FuelImg from "@/assets/icons/fuel.svg";
import TransmissionImg from "@/assets/icons/transmission.svg";
import PeopleImg from "@/assets/icons/people.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";
import { Skeleton } from "@/components/ui/skeleton";
import { Rent } from "@/types";

type Props = {
  rent: Rent;
};

const RentCard = ({ rent }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const id = "ecubhb";

  const { name, category, fuel, gearBox, images, capacity, price } = rent;
  const mainImage = images[0];
  function NavigateDetail() {
    navigate(paths.DETAIL(id));
  }
  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <h4
            onClick={NavigateDetail}
            className="font-bold text-secondary-500 text-base lg:text-xl leading-[150%] tracking-[-0.6px] cursor-pointer hover:underline"
          >
            {name}
          </h4>
          <p className="text-secondary-300 text-xs lg:text-sm leading-[150%] tracking-[-0.28px]">
            {category.name}
          </p>
        </div>
        <button
          onClick={() => {
            setIsLiked(!isLiked);
          }}
          className="h-fit"
        >
          <img src={isLiked ? HeartFilledImg : HeartOutlinedImg} alt="heart" />
        </button>
      </div>
      <div
        onClick={NavigateDetail}
        className="mt-8 lg:mt-12 relative cursor-pointer"
      >
        <img src={mainImage} alt="car" className="w-full h-32 object-contain" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
      </div>
      <div className="flex justify-between items-center mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <img src={FuelImg} alt="fuel" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            {fuel}L
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={TransmissionImg} alt="transmission" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            {gearBox}
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={PeopleImg} alt="people" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            {capacity} People
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6">
        <p className="text-secondary-500 text-xl font-bold">
          ${price}/ <span className="text-sm text-secondary-300">day</span>
        </p>
        <Button>Rent Now</Button>
      </div>
    </div>
  );
};

RentCard.Skeleton = function () {
  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="mt-8 lg:mt-12 relative">
        <Skeleton className="w-full h-32 object-contain" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,#FFF_)]" />
      </div>
      <div className="flex justify-between items-center mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-1.5 items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-1.5 items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6 ">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
};

export default RentCard;
