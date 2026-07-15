// rafce  // to get boilerplate code for react functional component
import React from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getActivities } from "../services/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivities();
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Grid container spacing={2}>
      {activities.map((activity) => (
        <Grid item xs={12} sm={6} md={4} key={activity.id}>
          <Card
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {" "}
                🏃 {activity.type}
              </Typography>
              <Typography>⏱️Duration: {activity.duration} min</Typography>
              <Typography>
                🔥Calories: {activity.caloriesBurned} kcal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
