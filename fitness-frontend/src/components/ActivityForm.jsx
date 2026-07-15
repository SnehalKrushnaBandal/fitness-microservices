import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addActivity } from "../services/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ActivityForm = ({ onActivitiesAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit clicked");

    try {
      console.log("Calling API...");
      const response = await addActivity(activity);
      onActivitiesAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Activity Type</InputLabel>

            <Select
              value={activity.type}
              label="Activity Type"
              onChange={(e) =>
                setActivity({
                  ...activity,
                  type: e.target.value,
                })
              }
            >
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Duration (in minutes)"
            type="number"
            sx={{ mb: 2 }}
            value={activity.duration}
            onChange={(e) =>
              setActivity({
                ...activity,
                duration: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Calories Burned"
            type="number"
            sx={{ mb: 2 }}
            value={activity.caloriesBurned}
            onChange={(e) =>
              setActivity({
                ...activity,
                caloriesBurned: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
          >
            Add Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
