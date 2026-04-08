import { Grid, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import CustomTextField from "../component/CustomTextField";
import CustomButton from "../component/CustomButton";
import { createUser, updateUser } from "../Service/Service";
import { useDispatch } from "react-redux";
import { closeModal } from "../Redux/Slice/modalSlice";

import {UseLoader} from "../Hooks/UseLoder"

interface UserFormModalProps {
  mode: "Add" | "Edit";
  data?: any;
  onok?: () => void;
}

function UserFormModal({ onok, mode, data }: UserFormModalProps) {
  const dispatch = useDispatch();
  const{startLoading,stopLoading}=UseLoader()
  
  // Yup schema: password required only in Add mode
  const signupSchema = Yup.object({
    username: Yup.string().required("Username required"),
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password:
      mode === "Add"
        ? Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password required")
        : Yup.string().min(6, "Minimum 6 characters").notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      username: data?.user_name ?? "",
      name: data?.name ?? "",
      email: data?.email ?? "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values, { resetForm }) => {
      startLoading()

      // Payload: only include password if user typed it
      const payload: any = {
        name: values.name,
        user_name: values.username.trim().toLowerCase(),
        email: values.email.trim().toLowerCase(),
      };
      if (values.password) payload.password = values.password;

      // Mode-based API call
      const apiCall =
        mode === "Add" ? createUser(payload) : updateUser(data?._id, payload);

      apiCall
        .then((res) => {
          stopLoading();
          dispatch(closeModal());
          resetForm();
          toast.success(
            res?.data?.message ||
              (mode === "Add" ? "User created successfully" : "User updated successfully")
          );
          onok?.();
        })
        .catch((err: any) => {
          stopLoading();
          toast.error(err?.response?.data?.message || "Something went wrong");
        });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 1 }}>
      <Grid container spacing={1}>
        {/* Name */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Name"
            name="name"
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            //@ts-ignore
            error={formik.touched.name && formik.errors.name}
          />
        </Grid>

        {/* Username */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Username"
            placeholder="Enter User Name"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            //@ts-ignore
            error={formik.touched.username && formik.errors.username}
          />
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <CustomTextField
            labelname="Email"
            placeholder="Enter Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            //@ts-ignore
            error={formik.touched.email && formik.errors.email}
          />
        </Grid>

        {/* Password */}
        {mode === "Add" && (
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <CustomTextField
              labelname="Password"
              placeholder="Enter Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //@ts-ignore
              error={formik.touched.password && formik.errors.password}
            />
          </Grid>
        )}
      </Grid>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <CustomButton
          variant="text"
          label="Cancel"
          onClick={() => dispatch(closeModal())}
          />
        <CustomButton
          type="submit"
          label={mode === "Edit" ? "Update User" : "Create User"}
          backgroundColor="#008080"
        />
      </Box>
    </Box>
  );
}

export default UserFormModal;