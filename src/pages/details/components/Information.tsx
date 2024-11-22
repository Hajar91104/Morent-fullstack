import { ReviewStar } from "@/components/shared/ReviewStar";
import { useState } from "react";

import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import HeartFilledImg from "@/assets/icons/heart-filled.svg";
import { Button } from "@/components/ui/button";

const specifications = [
  {
    label: "Type Car",
    value: "Sport",
  },
  {
    label: "Capacity",
    value: "2 People",
  },
  {
    label: "Steering",
    value: "Manual",
  },
  {
    label: "Gasoline",
    value: "70L",
  },
];

export const InformationSection = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="bg-white rounded-[10px] p-4 lg:p-6 relative">
      <h1 className="text-secondary-500 text-2xl lg:text-[32px] !leading-[-0.96px] font-bold">
        Rolls-Royce
      </h1>
      <div className="mt-2 flex items-center gap-x-2">
        <ReviewStar rating={5} />
        <p className="text-secondary text-sm font-medium tracking-[-0.28px]">
          440+ Reviewer
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
      <p className="my-5 lg:my-8 text-lg lg:text-xl !leading-[200%] tracking-[-0.4px] text-secondary">
        NISMO has become the embodiment of Nissan's outstanding performance,
        inspired by the most unforgiving proving ground, the "race track".
      </p>
      <div className="flex flex-wrap justify-between items-center gap-4">
        {specifications.map((specification) => (
          <div className="w-[200px] flex justify-between">
            <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
              {specification.label}
            </p>
            <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] ">
              {specification.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-12 lg:mt-16">
        <div>
          <p className="text-secondary-500 text-[28px] font-bold">
            $99.00/ <span className="text-base text-secondary-300">day</span>
          </p>
          <p className="line-through text-secondary-300 text-base font-bold">
            $100.00
          </p>
        </div>
        <Button>Rent Now</Button>
      </div>
    </div>
  );
};
