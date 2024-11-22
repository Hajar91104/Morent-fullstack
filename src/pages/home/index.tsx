import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { Hero } from "./components/Hero";
import List from "../../components/shared/RentList";

const HomePage = () => {
  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
      <Hero />
      <AvailabilityFilter />
      <List heading="Popular Cars" />
      <List heading="Recomendation Cars" />
    </div>
  );
};

export default HomePage;
