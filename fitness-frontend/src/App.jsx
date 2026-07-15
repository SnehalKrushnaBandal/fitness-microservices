import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import Box from "@mui/material/Box";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: 4,
      }}
    >
      <ActivityForm onActivitiesAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);

  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <>
      <Router>
        {!token ? (
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(135deg,#1976d2,#42a5f5)",
              color: "white",
              textAlign: "center",
              px: 3,
            }}
          >
            <h1>🏋️ Fitness Tracker</h1>

            <p style={{ maxWidth: "500px", fontSize: "18px" }}>
              Track your daily workouts, monitor calories burned, and receive
              AI-powered fitness recommendations.
            </p>

            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                mt: 3,
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontSize: "18px",
              }}
              onClick={() => {
                logIn();
              }}
            >
              Login with Keycloak
            </Button>
          </Box>
        ) : (
          <div>
            <Box
              component="section"
              sx={{
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
                p: 4,
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
                onClick={logOut}
              >
                LOGOUT
              </Button>
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route
                  path="/"
                  element={
                    token ? (
                      <Navigate to="/activities" replace />
                    ) : (
                      <div>Welcome! Please Login</div>
                    )
                  }
                />
              </Routes>
            </Box>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
