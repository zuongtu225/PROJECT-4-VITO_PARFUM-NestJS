import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EditPaymentForm = (props: any) => {
  const paymentDetail = useSelector(
    (state: any) => state?.paymentReducer?.paymentDetail
  );

  const [payment, setNewPayment] = useState<any>({
    id: paymentDetail?.id,
    title: paymentDetail?.title,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const payment = {
      id: paymentDetail?.id,
      [name]: value,
    };
    setNewPayment(payment);
  };
  useEffect(() => {
    props.handleGetData(payment);
  }, [payment]);
  return (
    <div className="md:w-1/2 px-3  md:mb-0">
      <label>Tên phương thức thanh toán</label>
      <input
        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        id="grid-first-name"
        type="text"
        name="title"
        value={payment.title}
        onChange={handleChange}
      />
    </div>
  );
};

export default EditPaymentForm;
