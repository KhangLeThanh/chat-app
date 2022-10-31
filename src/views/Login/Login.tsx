import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constant";
import signInSchema from "../../validations/signInSchema";
import { TextVariant } from "../../enum";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: signInSchema,
    initialValues,
    onSubmit: (values) => {
      axios
        .post(`${API_URL}/auth/login`, {
          username: values.username,
          password: values.password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.id);
          navigate("/threads");
        })
        .catch((error) => console.log("error", error.response));
    },
  });
  return (
    <Paper elevation={3}>
      <Grid
        container
        spacing={2}
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
          width: {
            lg: "35vw",
            md: "50vw",
            xs: "70vw",
          },
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Sign in </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="body1">UserName:</Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              sx={{ width: "100%", minWidth: "100%" }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            {formik.touched.username && Boolean(formik.errors.username) && (
              <FormHelperText variant={TextVariant.STANDARD}>
                {formik.errors.username}
              </FormHelperText>
            )}
            <Typography variant="body1" sx={{mt: 2}}>Password:</Typography>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              sx={{ width: "100%", minWidth: "100%" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText variant={TextVariant.STANDARD}>
                {formik.errors.password}
              </FormHelperText>
            )}
            <Button variant="contained" size="large" fullWidth type="submit" sx={{mt: 2}}>
              Sign in{" "}
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="body1">
            Don't have an account?{" "}
            <span>
              <NavLink to="/signup">Sign Up</NavLink>
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Login;
