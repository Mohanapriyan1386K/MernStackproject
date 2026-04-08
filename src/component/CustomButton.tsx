import { Button, CircularProgress } from "@mui/material";
import React from "react";

type CustomButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  backgroundColor?: string;
  type?: "submit" | "button" | "reset"; // ✅ fixed type
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  variant = "contained",
  size = "medium",
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  backgroundColor="",
  type = "button", // default type
}) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      type={type}
      sx={{
        backgroundColor: backgroundColor,
        textTransform: "none",
        borderRadius: "8px",
        fontWeight: 500,
        px: 2.5,
        py: 1,
        color: variant === "contained" ? "white" : backgroundColor ? backgroundColor : "red",
        "&:hover": {
          backgroundColor: backgroundColor
            ? backgroundColor
            : undefined, // keeps hover color consistent
        },
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
};

export default CustomButton;