import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import HeartFilledImg from "@/assets/icons/heart-filled.svg";
import Car from "@/assets/images/Car.png";
import FuelImg from "@/assets/icons/fuel.svg";
import TransmissionImg from "@/assets/icons/transmission.svg";
import PeopleImg from "@/assets/icons/people.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RentCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold text-secondary-500 text-base lg:text-xl leading-[150%] tracking-[-0.6px]">
            Rolls - Royce
          </h4>
          <p className="text-secondary-300 text-xs lg:text-sm leading-[150%] tracking-[-0.28px]">
            Sedan
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
      <div className="mt-8 lg:mt-12 relative">
        <img src={Car} alt="car" className="w-full h-32 object-contain" />
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.00)0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
      </div>
      <div className="flex justify-between items-center mt-5 lg:mt-9">
        <div className="flex gap-1.5 items-center">
          <img src={FuelImg} alt="fuel" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            70L
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={TransmissionImg} alt="transmission" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            Manual
          </p>
        </div>
        <div className="flex gap-1.5 items-center">
          <img src={PeopleImg} alt="people" />
          <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">
            4 People
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 lg:mt-6">
        <p className="text-secondary-500 text-xl font-bold">
          $99.00/ <span className="text-sm text-secondary-300">day</span>
        </p>
        <Button>Rent Now</Button>
      </div>
    </div>
  );
};

export default RentCard;
