import * as XLSX from "xlsx";
type Props = {
  data: [];
  slug: string;
};

const Export = (props: Props) => {
  const ProductExport = (filename: string) => {
    const data = props.data?.map((item: any) => ({
      id: item.id,
      Tên_sản_phẩm: item.title,
      description: item.description,
      category: item.category.title,
      images: item.images?.map((item: any) => item.url).join(", "),
      price: item.price,
      status: item.status,
      stock: item.stock,
    }));
    //chuyen trang thai tu jsonn sang excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    //
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "xxxxxx");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const UserExport = (filename: string) => {
    const data = props.data?.map((item: any) => ({
      id: item.id,
      avatar: item.avatar,
      email: item.email,
      fullName: item.firstName + item.lastName,
      address: item.address?.map((address: any) => address.address).join(", "),
      role: item.role.role,
      status: item.status,
    }));
    //chuyen trang thai tu jsonn sang excel
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handleExport = () => {
    switch (props.slug) {
      case "PRODUCTS":
        ProductExport("PRODUCTS");
        break;
      case "USERS":
        UserExport("USERS");
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Export
      </button>
    </div>
  );
};
export default Export;
