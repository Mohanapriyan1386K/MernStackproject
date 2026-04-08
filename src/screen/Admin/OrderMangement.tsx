import { useEffect, useState } from "react";
import { Avatar, Chip, Grid } from "@mui/material";
import toast from "react-hot-toast";
import PageHeader from "../../component/PageHeader";
import CustomTable, { type Column } from "../../component/CustomTable";
import CustomTextField from "../../component/CustomTextField";
import CustomDropdown from "../../component/CustomDropdown";
import CustomButton from "../../component/CustomButton";
import { UseLoader } from "../../Hooks/UseLoder";
import { getOrders } from "../../Service/Service";
import type { Order } from "../../Type";

function OrderMangement() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { startLoading, stopLoading } = UseLoader();

  const [filters, setFilters] = useState({
    orderId: "",
    userName: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    orderId: "",
    userName: "",
    status: "",
  });

  useEffect(() => {
    getOrderList();
  }, [page, size, appliedFilters]);

  const getOrderList = async () => {
    startLoading();
    try {
      const payload: {
        page?: number;
        limit?: number;
        orderId?: string;
        userName?: string;
        status?: string;
      } = {
        page: page + 1,
        limit: size,
      };

      if (appliedFilters.orderId.trim()) {
        payload.orderId = appliedFilters.orderId.trim();
      }
      if (appliedFilters.userName.trim()) {
        payload.userName = appliedFilters.userName.trim();
      }
      if (appliedFilters.status) {
        payload.status = appliedFilters.status;
      }

      const res = await getOrders(payload);

      const list =
        res.data.orders ??
        res.data.data ??
        res.data?.data?.orders ??
        res.data?.orders ??
        [];

      const totalFromApi =
        res.data.total ??
        res.data.totalOrders ??
        res.data.count ??
        res.data.totalCount ??
        res.data.pagination?.total ??
        list.length ??
        0;

      setOrderList(list);
      setTotalCount(totalFromApi);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to fetch orders");
    } finally {
      stopLoading();
    }
  };

  const handleApplyFilters = () => {
    setPage(0);
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    const cleared = { orderId: "", userName: "", status: "" };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(0);
  };

  const statusColor = (status?: string) => {
    const s = (status || "").toLowerCase();
    if (s === "pending") return "warning";
    if (s === "completed" || s === "delivered") return "success";
    if (s === "cancelled" || s === "canceled") return "error";
    if (s === "processing") return "info";
    return "default";
  };

  const columns: Column<Order>[] = [
    {
      key: "image",
      title: "Image",
      render: (_, record) => {
        const img = record.productDetails?.images?.[0];
        return <Avatar src={img} alt={record.productDetails?.productname} />;
      },
    },
    {
      key: "_id",
      title: "Order ID",
      render: (value) => (value ? String(value).slice(-6) : "-"),
    },
    {
      key: "user",
      title: "User",
      render: (value, record) => {
        if (record.userName) return record.userName;
        if (value && typeof value === "object") {
          const v = value as any;
          return v.name || v.user_name || v.email || v._id || "-";
        }
        return value || "-";
      },
    },
    {
      key: "product",
      title: "Product",
      render: (_, record) => record.product?.productname || "-",
    },
    {
      key: "price",
      title: "Price",
      render: (_, record) =>
        typeof record.product?.price === "number"
          ? record.product.price
          : "-",
    },
    {
      key: "orderQuantity",
      title: "Qty",
    },
    {
      key: "total",
      title: "Total",
      render: (_, record) =>
        typeof record.product?.price === "number"
          ? record.product.price * record.orderQuantity
          : "-",
    },
    {
      key: "status",
      title: "Status",
      render: (value) => (
        <Chip size="small" label={value || "-"} color={statusColor(value)} />
      ),
    },
    {
      key: "createdAt",
      title: "Created",
      render: (value) => (value ? new Date(value).toLocaleString() : "-"),
    },
  ];

  return (
    <div>
      <PageHeader title="Order Management" label1="" />

      <Grid container alignItems={"center"} spacing={2} sx={{ mt: 2 }}>
        <Grid width={250}>
          <CustomTextField
            name="orderId"
            labelname="Order ID"
            placeholder="Search by Order ID"
            value={filters.orderId}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, orderId: e.target.value }))
            }
          />
        </Grid>

        <Grid width={250}>
          <CustomTextField
            name="userName"
            labelname="User Name"
            placeholder="Search by User Name"
            value={filters.userName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, userName: e.target.value }))
            }
          />
        </Grid>

        <Grid width={250} mt={-2}>
          <CustomDropdown
            label="Status"
            value={filters.status}
            options={[
              { label: "All", value: "" },
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Completed", value: "completed" },
              { label: "Cancelled", value: "cancelled" },
            ]}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, status: val }))
            }
          />
        </Grid>

        <Grid>
          <CustomButton
            label="Filter"
            variant="contained"
            backgroundColor="#008080"
            onClick={handleApplyFilters}
          />
        </Grid>

        <Grid>
          <CustomButton
            label="Reset"
            variant="outlined"
            onClick={handleResetFilters}
          />
        </Grid>
      </Grid>

      <CustomTable
        columns={columns}
        data={orderList}
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

export default OrderMangement;
