import React, { useState } from "react";
import {
  Container, Typography, Paper, Grid, Button, Card, CardContent, CardActions
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const plans = [
  {
    name: "Free Plan",
    price: "$0/month",
    features: ["Basic matchmaking", "Limited messaging", "Standard support"],
    color: "gray",
  },
  {
    name: "Premium Plan",
    price: "$9.99/month",
    features: ["Advanced matchmaking", "Unlimited messaging", "Priority support"],
    color: "blue",
  },
  {
    name: "VIP Plan",
    price: "$19.99/month",
    features: ["Exclusive pet matches", "Direct breeder contacts", "24/7 VIP support"],
    color: "gold",
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    alert(`You selected: ${plan.name}`);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" marginBottom={3}>
        🏆 Choose Your Subscription Plan
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ textAlign: "center", borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color={plan.color}>
                  {plan.name}
                </Typography>
                <Typography variant="h6" marginBottom={2}>
                  {plan.price}
                </Typography>
                {plan.features.map((feature, i) => (
                  <Typography key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <CheckCircleIcon color="success" /> {feature}
                  </Typography>
                ))}
              </CardContent>
              <CardActions sx={{ justifyContent: "center", marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleSelectPlan(plan)}>
                  Select Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Subscription;
