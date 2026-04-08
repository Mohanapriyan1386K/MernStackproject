import { Box, Grid, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import type { ProductModalProps } from "../Type";
import CustomButton from "../component/CustomButton";
import CustomTextField from "../component/CustomTextField";
import CustomDropdown from "../component/CustomDropdown";
import { closeModal } from "../Redux/Slice/modalSlice";
import { UseLoader } from "../Hooks/UseLoder";
import {
  categorydropdown,
  createProduct,
  updateProduct,
} from "../Service/Service";
import { useEffect, useState } from "react";

function ProductModal({
  mode,
  data,
  onok,
}: ProductModalProps & { onok?: () => void }) {
  const dispatch = useDispatch();
  const { startLoading, stopLoading } = UseLoader();

  const [dropDownData, setDropDowndata] = useState<
    { label: string; value: string }[]
  >([]);

  const productSchema = Yup.object({
    productname: Yup.string().required("Product name required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .min(0, "Price must be positive")
      .required("Price required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .min(0, "Quantity must be positive")
      .required("Quantity required"),
    category: Yup.string().required("Category required"),
    description: Yup.string().required("Description required"),
  });

  const formik = useFormik({
    initialValues: {
      productname: data?.productname ?? "",
      price: data?.price ?? "",
      quantity: data?.quantity ?? "",
      category: data?.category?._id ?? "",
      description: data?.description ?? "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      startLoading();

      const payload: any = {
        productname: values.productname.trim(),
        price: Number(values.price),
        quantity: Number(values.quantity),
        category: values.category,
        description: values.description.trim(),
      };

      const apiCall =
        mode === "Add"
          ? createProduct(payload)
          : updateProduct(data?._id, payload);

      apiCall
        .then((res) => {
          stopLoading();
          dispatch(closeModal());
          resetForm();
          toast.success(
            res?.data?.message ||
              (mode === "Add"
                ? "Product created successfully"
                : "Product updated successfully"),
          );
          onok?.();
        })
        .catch((err: any) => {
          stopLoading();
          toast.error(err?.response?.data?.message || "Something went wrong");
        });
    },
  });

  useEffect(() => {
    handleCategroyDropdown();
  }, []);

  const handleCategroyDropdown = () => {
    startLoading();
    categorydropdown()
      .then((res) => {
        if (res.status == 200) {
          const options =
            res.data.data?.map((item: any) => ({
              label: item.name,
              value: item._id,
            })) ?? [];
          setDropDowndata(options);
        }
      })
      .catch((err) => toast.error(err))
      .finally(() => stopLoading());
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Product Name"
            name="productname"
            placeholder="Enter product name"
            formik={formik}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Price"
            name="price"
            type="number"
            placeholder="Enter price"
            formik={formik}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Quantity"
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            formik={formik}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomDropdown
            label="Category"
            value={formik.values.category}
            options={dropDownData}
            onChange={(val) => {
              formik.setFieldValue("category", val);
              formik.setFieldTouched("category", true, true);
            }}
          />
          {formik.touched.category && formik.errors.category ? (
            <Typography
              variant="caption"
              sx={{ color: "error.main", display: "block", mt: 0.5 }}
            >
              {formik.errors.category as string}
            </Typography>
          ) : null}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Description"
            name="description"
            placeholder="Enter description"
            formik={formik}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <CustomButton
          variant="text"
          label="Cancel"
          onClick={() => dispatch(closeModal())}
        />
        <CustomButton
          type="submit"
          label={mode === "Edit" ? "Update Product" : "Create Product"}
        />
      </Box>
    </Box>
  );
}

export default ProductModal;
