import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { Label, Visibility, VisibilityOff } from "@mui/icons-material";

type Props = TextFieldProps & {
  name: string;
  formik?: any;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sizeVariant?: "small" | "medium";
  borderColor?: string; // default border
  focusBorderColor?: string; // border on focus
  hoverBorderColor?: string;
  labelname?: string; // border on hover
  height?: number;
};

export default function CustomTextField({
  name,
  formik,
  type = "text",
  startIcon,
  endIcon,
  sizeVariant = "medium",
  borderColor = "#ccc",
  focusBorderColor = "#008080",
  hoverBorderColor = "#008080",
  labelname,
  height = 40,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const error = formik?.touched?.[name] && Boolean(formik?.errors?.[name]);
  const helperText = formik?.touched?.[name] && formik?.errors?.[name];
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <p>{labelname}</p>
      <TextField
        fullWidth
        name={name}
        type={inputType}
        size={sizeVariant}
        value={formik ? formik.values[name] : rest.value}
        onChange={formik ? formik.handleChange : rest.onChange}
        onBlur={formik ? formik.handleBlur : rest.onBlur}
        error={error}
        helperText={helperText}
        variant="outlined"
        {...rest}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            height: height, // rounded corners
            "& fieldset": {
              borderColor: borderColor,
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: hoverBorderColor,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: " #008080", // your focus border color
              borderWidth: 2,
              boxShadow: "2px 2px 8px rgba(0,0,0,0.4)", // shadow on focus
            },
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
          },
          ...rest.sx,
        }}
      />
    </div>
  );
}
