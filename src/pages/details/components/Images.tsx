import DetailImg1 from "@/assets/images/detail-1.png";
import DetailImg2 from "@/assets/images/detail-2.png";
import DetailImg3 from "@/assets/images/detail-3.png";
import DetailImg4 from "@/assets/images/detail-4.png";

export const ImagesSection = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-[1fr_124px] gap-6">
      <img
        src={DetailImg1}
        alt="main"
        className="col-span-3 w-full h-full object-cover"
      />
      <img src={DetailImg2} alt="other" />
      <img src={DetailImg3} alt="other" />
      <img src={DetailImg4} alt="other" />
    </div>
  );
};
