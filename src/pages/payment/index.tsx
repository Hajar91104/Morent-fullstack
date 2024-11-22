import { Steps } from "./components/Steps";
import { PaymentSummary } from "./components/Summary";

export const PaymentPage = () => {
  return (
    <div className="container py-6 lg:py-8 grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_492px] lg:gap-x-8 gap-y-8">
      <Steps />
      <PaymentSummary />
    </div>
  );
};
