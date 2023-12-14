import { PayPalButtons } from "@paypal/react-paypal-js";
import { createAddress } from "../../../../Api/address";
import { ToastContainer, toast } from "react-toastify";
type Props = {
  amount: number;
  paymentPaypal: any;
  infoAddress: any;
  hasErrorQuantity: boolean;
};
const Paypal = (props: Props) => {
  const { amount, paymentPaypal, infoAddress, hasErrorQuantity } = props;

  localStorage.setItem("infoAddress", JSON.stringify(infoAddress));
  const handlePaymentSuccess = async () => {
    const infoAddress = localStorage.getItem("infoAddress");
    const newAddress = infoAddress ? JSON.parse(infoAddress) : [];
    const resAddress: any = await createAddress(newAddress);
    await paymentPaypal(resAddress?.data?.data.id);
  };
  return (
    <div>
      <ToastContainer />
      {hasErrorQuantity === false ? (
        <PayPalButtons
          createOrder={(_data, actions) => {
            {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: String(amount),
                    },
                    description: `purchase at ${new Date().toDateString()}`,
                  },
                ],
              });
            }
          }}
          onApprove={(_, action): any => {
            return action.order?.capture().then(() => handlePaymentSuccess());
          }}
        />
      ) : (
        <p className="pt-10 pb-10 text-red-600">
          Không thể thanh toán vì sản phẩm không đủ số lượng trong kho
        </p>
      )}
    </div>
  );
};

export default Paypal;
