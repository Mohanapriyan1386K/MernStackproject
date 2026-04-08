import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@mui/material";
import PageHeader from "../../component/PageHeader";
import { closeModal, openModal } from "../../Redux/Slice/modalSlice";
import CustomTable, { type Column } from "../../component/CustomTable";
import { deleteProduct, getProducts } from "../../Service/Service";
import toast from "react-hot-toast";
import CustomTextField from "../../component/CustomTextField";
import CustomDropdown from "../../component/CustomDropdown";
import CustomButton from "../../component/CustomButton";
import type { Product } from "../../Type";

function Products() {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  // Temp states for input before clicking Search
  const [tempSearch, setTempSearch] = useState("");
  const [tempPrice, setTempPrice] = useState("");

  useEffect(() => {
    getProductList();
  }, [page, size, search, priceFilter]); // fetch only on actual filters

  const getProductList = async () => {
    try {
      const payload: any = { page: page + 1, limit: size };

      if (search.trim()) payload.productname = search.trim();

      if (priceFilter) {
        switch (priceFilter) {
          case "0-100":
            payload.minPrice = 0;
            payload.maxPrice = 100;
            break;
          case "101-500":
            payload.minPrice = 101;
            payload.maxPrice = 500;
            break;
          case "501-1000":
            payload.minPrice = 501;
            payload.maxPrice = 1000;
            break;
          case "1000+":
            payload.minPrice = 1001;
            break;
        }
      }

      const res = await getProducts(payload);

      // API returns products array and totalProducts
      setProductList(res.data.products ?? []);
      setTotalCount(res.data.totalProducts ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to fetch products");
    }
  };

  const handleModalopen = () => {
    dispatch(
      openModal({
        modalname: "PRODUCT",
        modalprops: {
          size: "xs",
          title: "Add Product",
          mode: "Add",
          onok: getProductList,
        },
      }),
    );
  };

  const handleEditModalOpen = (record: Product) => {
    dispatch(
      openModal({
        modalname: "PRODUCT",
        modalprops: {
          size: "xs",
          title: "Edit Product",
          id: record._id,
          name: record.productname,
          data: record,
          mode: "Edit",
          onok: getProductList,
        },
      }),
    );
  };

  const handleSearchClick = () => {
    setSearch(tempSearch);
    setPriceFilter(tempPrice);
    setPage(0); // reset page on new search
  };

  const handleDelete = (record: Product) => {
    deleteProduct(record._id).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        getProductList();
        dispatch(closeModal());
      }
    }).catch((err) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    });
  }

  const handleDeleteModalopen = (record: Product) => {
    dispatch(
      openModal({
        modalname: "DELETE",
        modalprops: {
          title: "Delete Product",
          size: "xs",
          data: record,
          onDelete: handleDelete,
        },
      }),
    );
  };
  const handleReset = () => {
    setTempSearch("");
    setTempPrice("");
    setSearch("");
    setPriceFilter("");
    setPage(0);
  };

  const columns: Column<Product>[] = [
    { key: "productname", title: "Product Name" },
    { key: "price", title: "Price" },
    { key: "quantity", title: "Quantity" },
    { key: "description", title: "Description" },
    // {key:[],title:"Category"},
    {
      key: "createdAt",
      title: "Created",
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
    },
    {
      key: "action",
      title: "Action",
      render: (_, record) => (
        <div>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEditModalOpen(record)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ ml: 1 }}
            onClick={() =>  handleDeleteModalopen(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Product Management"
        label1="Add Product"
        handleClick={handleModalopen}
      />

      <Grid container alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <Grid width={250}>
          <CustomTextField
            name="search"
            labelname="Product Name"
            placeholder="Search product by name"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
          />
        </Grid>

        <Grid width={250} mt={-2}>
          <CustomDropdown
            label="Price Range"
            value={tempPrice}
            options={[
              { label: "All", value: "" },
              { label: "0 - 100", value: "0-100" },
              { label: "101 - 500", value: "101-500" },
              { label: "501 - 1000", value: "501-1000" },
              { label: "1000+", value: "1000+" },
            ]}
            onChange={(val) => setTempPrice(val)}
          />
        </Grid>

        <Grid>
          <CustomButton
            label="Search"
            variant="contained"
            backgroundColor="#008080"
            onClick={handleSearchClick}
          />
        </Grid>

        <Grid>
          <CustomButton
            label="Clear"
            variant="outlined"
            backgroundColor=""
            onClick={handleReset}
          />
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        data={productList}
        totalCount={totalCount}
        page={page}
        rowsPerPage={size}
        onPageChange={setPage}
        onRowsPerPageChange={(rows) => {
          setSize(rows);
          setPage(0);
        }}
      />
    </div>
  );
}

export default Products;
