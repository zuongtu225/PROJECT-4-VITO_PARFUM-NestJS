import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import { Search } from "../../../../Interface";
import {
  getApiBrands,
  getApiCategories,
  getApiProducts,
  getApiUsers,
  getPayments,
} from "../../../../store/action";

const SearchComponent: React.FC<Search> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    switch (props.slug) {
      case "PRODUCTS":
        dispatch(getApiProducts({ data: value }));
        break;
      case "USERS":
        dispatch(getApiUsers({ data: value }));
        break;
      case "BRANDS":
        dispatch(getApiBrands({ data: value }));
        break;
      case "CATEGORY":
        dispatch(getApiCategories({ data: value }));
        break;
      case "PAYMENTS":
        dispatch(getPayments({ data: value }));
        break;

      default:
        break;
    }
  }, [value]);

  return (
    <div className="w-full md:w-100">
      <Input
        label="Search"
        value={value}
        crossOrigin={undefined}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
