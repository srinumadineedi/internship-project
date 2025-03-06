import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const ReportsAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    users: [],
    pets: [],
    matches: [],
  });

  // Simulating API call (Replace with real API later)
  useEffect(() => {
    setTimeout(() => {
      setChartData({
        users: [50, 80, 120, 150, 180, 250], // Dummy user growth data
        pets: [30, 50, 90, 120, 160, 200], // Dummy pet registrations
        matches: [10, 20, 40, 60, 90, 130], // Successful matches
      });
      setLoading(false);
    }, 1000); // Simulating delay
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" marginBottom={3}>
        📊 Reports & Analytics
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <Grid container spacing={3}>
          {/* Users Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" textAlign="center" marginBottom={2}>
                📈 User Growth Over Time
              </Typography>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }]}
                series={[{ data: chartData.users, label: "Users" }]}
                width={500}
                height={300}
              />
            </Paper>
          </Grid>

          {/* Pets Line Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" textAlign="center" marginBottom={2}>
                🐶 Pet Registrations
              </Typography>
              <LineChart
                xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }]}
                series={[{ data: chartData.pets, label: "Pets", color: "green" }]}
                width={500}
                height={300}
              />
            </Paper>
          </Grid>

          {/* Matches Line Chart */}
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" textAlign="center" marginBottom={2}>
                ❤️ Successful Matches Over Time
              </Typography>
              <LineChart
                xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }]}
                series={[{ data: chartData.matches, label: "Matches", color: "red" }]}
                width={800}
                height={300}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ReportsAnalytics;
