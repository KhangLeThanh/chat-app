import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../constant";
import signUpSchema from "../../validations/signUpSchema";
import { TextVariant } from "../../enum";

function SignUp() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    passwordConfirm: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: signUpSchema,
    initialValues,
    onSubmit: (values) => {
      axios
        .post(`${API_URL}/auth/register/`, {
          username: values.username,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        })
        .then(function (response) {
          navigate("/");
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
          <Typography variant="h6">Sign Up </Typography>
        </Grid>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="body1">Username:</Typography>
            <TextField
              fullWidth
              id="username"
              name="username"
              sx={{ width: "100%", minWidth: "100%", marginBottom: "0.5rem" }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            {formik.touched.username && Boolean(formik.errors.username) && (
              <FormHelperText variant={TextVariant.STANDARD}>
                {formik.errors.username}
              </FormHelperText>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              Password:
            </Typography>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              sx={{ width: "100%", minWidth: "100%", marginBottom: "0.5rem" }}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              onChange={formik.handleChange}
            />
            {formik.touched.password && Boolean(formik.errors.password) && (
              <FormHelperText variant={TextVariant.STANDARD}>
                {formik.errors.password}
              </FormHelperText>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              Confirmation Password:
            </Typography>
            <TextField
              fullWidth
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              sx={{ width: "100%", minWidth: "100%", marginBottom: "0.5rem" }}
              value={formik.values.passwordConfirm}
              error={
                formik.touched.passwordConfirm &&
                Boolean(formik.errors.passwordConfirm) &&
                formik.values.password !== formik.values.passwordConfirm
              }
              onChange={formik.handleChange}
            />
            {formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm) && (
                <FormHelperText variant={TextVariant.STANDARD}>
                  {formik.errors.passwordConfirm}
                </FormHelperText>
              )}
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              fullWidth
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SignUp;
