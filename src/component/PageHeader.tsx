import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import CustomButton from "./CustomButton";
import { AddCircleOutlined } from "@mui/icons-material";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode; // buttons / icons
  label1:string,
  color?: "primary" | "secondary" | "error" | "success";
  handleClick?:()=>void
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  label1,
  handleClick
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        pb: 2,
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* LEFT SIDE */}
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={2}>
            {label1&&(
                <CustomButton  startIcon={<AddCircleOutlined />} label={label1}  backgroundColor="#008080" onClick={handleClick}/>

            )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PageHeader;