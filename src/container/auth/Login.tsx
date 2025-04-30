import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignUp from "./Signup";
import "./Style.scss";

const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Fill all the field's",
        severity: "error"
      });
      return;
    }
  }


  return (
    <>
      <Button variant="contained" sx={{ backgroundColor: "sandybrown" }} onClick={handleOpen}>
        Login
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: "black", color: "white" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>{activeTab === 0 ? "Login" : "Sign Up"}</span>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "black", color: "white" }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered textColor="secondary" indicatorColor="secondary">
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {activeTab === 0 && (
            <Box mt={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                className="login-btn"
              >
                Login
              </Button>
            </Box>
          )}

          {activeTab === 1 && (
            <Box mt={2}>
              <SignUp onClose={handleClose} />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleSnackbarClose} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
