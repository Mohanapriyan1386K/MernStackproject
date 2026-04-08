import { useState, useRef, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type CustomDropdownProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <p>{label}</p>
      <Box sx={{ position: "relative", minWidth: 150 }} ref={dropdownRef}>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: 2,
            px: 2,
            py: 1,
            cursor: "pointer",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "&:hover": { borderColor: "#008080" },
            "&:focus": {
              borderColor: "#008080 !important ",
              outline: "none", // removes default blue outline
              boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.2) !important", // optional glow
            },
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography sx={{ color: value ? "inherit" : "#B0B1B3" }}>
            {value ? options.find((o) => o.value === value)?.label : label}
          </Typography>
          <ArrowDropDownIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
        </Box>

        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              border: "1px solid gray",
              borderRadius: 1,
              backgroundColor: "#fff",
              zIndex: 10,
              mt: 0.5,
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <Stack>
              {options.map((opt) => (
                <Box
                  key={opt.value}
                  sx={{
                    px: 2,
                    py: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#008080", color: "white" },
                  }}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </div>
  );
}
