let map: google.maps.Map;
const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

export const Contact = () => {
  return (
    <>
      <h1 className="pl-[40%] mt-10 font-bold ">
        Hệ Thống Cửa Hàng Chi Nhánh Đà Nẵng
      </h1>
      <div className="flex">
        <iframe
          className="m-10"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.834529296841!2d108.21613297494424!3d16.07407423930862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218373f7b209d%3A0x6733c0f4bc3181a2!2zODEgUXVhbmcgVHJ1bmcsIFRo4bqhY2ggVGhhbmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700056427613!5m2!1svi!2s"
          width={600}
          height={450}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="mt-5">
          <div className="flex">
            <img
              className="m-4"
              src="https://theme.hstatic.net/1000340570/1000964732/14/q1-mat_tien_cua_hang.jpg?v=2928"
              alt=""
            />
            <img
              className="m-4"
              src="https://theme.hstatic.net/1000340570/1000964732/14/q1-men.jpg?v=2928"
              alt=""
            />
          </div>
          <div className="flex">
            <img
              className="m-4"
              src="https://theme.hstatic.net/1000340570/1000964732/14/q1-goc_rong.jpg?v=2928"
              alt=""
            />
            <img
              className="m-4"
              src="https://theme.hstatic.net/1000340570/1000964732/14/q1-brand.jpg?v=2928"
              alt=""
            />
          </div>
        </div>
      </div>
      <p className="m-10 ml-[15%]">
        Nước hoa Vito Perfume tư vấn nước hoa luôn sẵn sàng hỗ trợ khách hàng từ
        hotline, tin nhắn website và email một cách nhanh nhất GỌI NGAY 19000129
      </p>
    </>
  );
};
