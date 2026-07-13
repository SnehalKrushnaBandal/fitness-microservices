// rafce  // to get boilerplate code for react functional component
import React from 'react';
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
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
            <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                <Card sx={{cursor: 'pointer'}}
                onClick={() => navigate(`/activities/${activity.id}`)}
                >
                    <CardContent>
                        <Typography variant='h6'> {activity.type}</Typography>
                         <Typography>Duration : {activity.duration}</Typography>
                         <Typography>Calories:  {activity.caloriesBurned}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}


    </Grid>
  )
}

export default ActivityList