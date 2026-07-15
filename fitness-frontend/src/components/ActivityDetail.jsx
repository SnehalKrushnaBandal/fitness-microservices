import { Typography, Box, Card, CardContent, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivity, getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const activityResponse = await getActivity(id);

        const recommendationResponse = await getActivityDetail(id);

        setActivity(activityResponse.data);

        setRecommendation(recommendationResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          mb: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {" "}
            Activity Details
          </Typography>

          <Typography>🏃Type: {activity.type}</Typography>
          <Typography>⏱️Duration: {activity.duration} minutes</Typography>

          <Typography>
            🔥Calories Burned: {activity.caloriesBurned} kcal
          </Typography>

          <Typography>
            Date: {new Date(activity.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {recommendation && (
        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              🤖AI Recommendations
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Analysis
            </Typography>
            <Typography paragraph> {recommendation.recommendation}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Improvements</Typography>
            {recommendation.improvements?.map((improvement, index) => (
              <Typography key={index} paragraph>
                • {improvement}
              </Typography>
            ))}
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Suggestions</Typography>
            {recommendation?.suggestions?.map((suggestion, index) => (
              <Typography key={index} paragraph>
                • {suggestion}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Safety Guidelines</Typography>
            {recommendation?.safety?.map((safety, index) => (
              <Typography key={index} paragraph>
                • {safety}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
