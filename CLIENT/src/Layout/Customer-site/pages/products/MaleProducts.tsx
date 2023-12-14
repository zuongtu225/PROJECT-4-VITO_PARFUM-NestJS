import React, { useEffect, useState } from "react";
import { LiaHomeSolid, LiaCartArrowDownSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { getApiBrands, getApiProducts } from "../../../../store/action";
import { IProduct } from "../../../../Interface";
import { NavLink, useNavigate } from "react-router-dom";
const MaleProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetail: any = useSelector(
    (state: any) => state?.userReducer?.userDetail
  );
  const dataProduct = useSelector(
    (state: any) => state?.productReducer?.products
  );
  const brands = useSelector((state: any) => state?.brandReducer?.brands);
  const malePerfum = dataProduct?.filter(
    (item: IProduct) => item.category?.title == "Male"
  );
  const [data, setData] = useState<IProduct[]>(malePerfum);
  const [id, setId] = useState<number>(0);

  const sortProduct = (idBrand: number) => {
    const productSort = malePerfum.filter(
      (item: IProduct) => item.brand?.id == idBrand
    );
    if (productSort.length > 0) {
      setData(productSort);
    }
  };

  const navigate = useNavigate();
  const productDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };
  useEffect(() => {
    dispatch(getApiBrands(null));
    dispatch(getApiProducts(null));
    setData(malePerfum);
  }, []);

  useEffect(() => {
    sortProduct(id);
  }, [id]);

  return (
    <>
      <main>
        <div className="site-breakcrumb container">
          <NavLink className="flex text-black gap-1 items-center" to={"/"}>
            Trang chủ <LiaHomeSolid />
          </NavLink>
        </div>
        <div className="main-content container">
          <div className="brands">
            <div className="left-wrapper">
              <h4>Thương hiệu</h4>
              <div className="all-brands">
                <ul className="render-allBrands">
                  {brands?.map((item: any) => {
                    return (
                      <li
                        onClick={() => setId(item.id)}
                        className="cursor-pointer hover:text-red-500 hover:font-bold brand-left p-20  items-center"
                      >
                        <label className="ml-5">{item.title}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="all-products">
            <div className="result-info">
              <div className="info-left">
                <p>Nước hoa Nam</p>
                <p>/</p>
                <p className="brand-name">Thương hiệu</p>
              </div>
            </div>
            <div className="product-content-main">
              {data?.map((item: IProduct) => {
                console.log(item);

                return (
                  <div className="product">
                    <div className="product">
                      <div className="buy-now-container">
                        <img
                          onClick={() => productDetail(item.id)}
                          src={`${item.images[0].url}`}
                          alt=""
                        />
                        <button>MUA NGAY</button>
                      </div>
                      <div className="content-product">
                        <p
                          className="brand-title-product"
                          onClick={() => productDetail(item.id)}
                        >
                          {item.brand.title}
                        </p>
                        <p
                          className="name-product"
                          onClick={() => productDetail(item.id)}
                        >
                          {item.title}
                        </p>
                        <div className="price-cart-add items-center pt-10">
                          <p
                            className="price-product pl-5"
                            onClick={() => productDetail(item.id)}
                          >
                            {item.price.toLocaleString()}
                          </p>
                          {userDetail?.id ? (
                            <LiaCartArrowDownSolid className="w-6 h-5" />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MaleProducts;
