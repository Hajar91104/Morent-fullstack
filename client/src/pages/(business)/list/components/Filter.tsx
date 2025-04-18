import MultiRangeSlider from "@/components/shared/multi-range-slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import categoryService from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { FilterIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";

type Filters = {
  label: string;
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
};

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: categoryResponse } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

  const categoryOptions = useMemo(() => {
    if (!categoryResponse) return [];
    return categoryResponse.data.items.map((category) => ({
      value: category._id,
      label: category.name,
      count: category.count,
    }));
  }, [categoryResponse]);

  const filters: Filters[] = useMemo(
    () => [
      {
        label: "Category",
        options: categoryOptions,
      },
      {
        label: "Capacity",
        options: [
          {
            value: "2",
            label: "2 People",
          },
          {
            value: "4",
            label: "4 People",
          },
          {
            value: "6",
            label: "6 People",
          },
          {
            value: "8",
            label: "8 or More",
          },
        ],
      },
    ],
    [categoryOptions]
  );

  function toggle() {
    setIsOpen(!isOpen);
  }
  function handleClose() {
    setIsOpen(false);
  }
  function handleChange(type: string, option: string) {
    const params = searchParams.getAll(type.toLowerCase());
    let newParams: string[] = [];
    if (params.includes(String(option))) {
      newParams = params.filter((param) => param !== String(option));
    } else {
      newParams = [...params, String(option)];
    }
    searchParams.delete(type.toLowerCase());
    newParams.forEach((param) => {
      searchParams.append(type.toLowerCase(), param);
    });
    setSearchParams(searchParams);
  }

  function handleRangeChange(min: number, max: number) {
    if (min === 0) {
      searchParams.delete("min_price");
    } else {
      searchParams.set("min_price", String(min));
    }
    if (max === 555) {
      searchParams.delete("max_price");
    } else {
      searchParams.set("max_price", String(max));
    }
  }
  useOnClickOutside(ref, handleClose);
  return (
    <>
      <div
        ref={ref}
        className={cn(
          "p-8 bg-white w-[360px] h-[calc(100vh-94px)] md:h-[calc(100vh-128px)] fixed top-[94px] md:top-[128px] z-20 duration-200 overflow-auto pb-20",
          isOpen ? "left-0" : "-left-[360px] xl:left-0"
        )}
      >
        <div className="flex flex-col gap-y-8 lg:gap-y-14">
          {filters.map((filter) => (
            <div key={filter.label}>
              <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase">
                {filter.label}
              </h4>
              <div className="flex flex-col gap-y-4 lg:gap-y-8">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex gap-x-2 items-center">
                    <Checkbox
                      id={`${filter.label}-${option.value}`}
                      onClick={() => {
                        handleChange(filter.label, option.value);
                      }}
                      defaultChecked={searchParams
                        .getAll(filter.label.toLowerCase())
                        .includes(option.value)}
                      className="h-5 w-5"
                    />
                    <label
                      htmlFor={`${filter.label}-${option.value}`}
                      className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px] cursor-pointer"
                    >
                      {option.label}{" "}
                      {option.count && (
                        <span className="text-secondary-300">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase">
              Price
            </h4>
            <MultiRangeSlider min={0} max={555} onChange={handleRangeChange} />
            {/* <div>
              <Slider />
              <p className="text-secondary text-lg lg:text-xl font-semibold tracking-[-0.4px] leading-[150%] mt-4">
                Max. $100.00
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <Button
        onClick={toggle}
        variant={"outline"}
        className="xl:hidden w-fit ml-6 lg:ml-8 mt-4 -mb-4"
      >
        <FilterIcon className="text-primary" />
      </Button>
    </>
  );
};
