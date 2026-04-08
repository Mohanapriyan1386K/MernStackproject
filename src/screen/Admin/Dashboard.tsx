import { useEffect, useState } from "react";
import { getDashbarddata } from "../../Service/Service";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import { UseLoader } from "../../Hooks/UseLoder";
import type { DashboardData } from "../../Type";
import PageHeader from "../../component/PageHeader";


function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const { startLoading, stopLoading } = UseLoader();

  useEffect(() => {
    fetchdashboarddata();
  }, []);

  const fetchdashboarddata = () => {
    startLoading();
    getDashbarddata()
      .then((res: any) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
      })
      .finally(() => stopLoading());
  };

  const cardStyle = {
    borderRadius: "20px",
    color: "#fff",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    },
  };

  return (
    <Box>
     
     <PageHeader label1="" title="Admin Dashboard" subtitle="Overview of key metrics" /> 
      <Grid container spacing={4}>
        {/* USERS CARD */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background:
                "linear-gradient(135deg, #008080 0%, #20c997 100%)",
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {data?.totalUsers ?? 0}
                  </Typography>
                </Box>

                <PeopleIcon sx={{ fontSize: 50, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* PRODUCTS CARD */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background:
                "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Total Products</Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {data?.totalProducts ?? 0}
                  </Typography>
                </Box>

                <InventoryIcon sx={{ fontSize: 50, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>

          
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              ...cardStyle,
              background:
                "linear-gradient(135deg, #4800ff 0%, #2226ffcb 100%)",
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">Total Categories</Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {data?.totalCategory ?? 0}
                  </Typography>
                </Box>

                <InventoryIcon sx={{ fontSize: 50, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>

          
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;