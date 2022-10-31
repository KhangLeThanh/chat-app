import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { UserInfo } from "../../api.types";
import axios from "axios";
import { API_URL } from "../../constant";
import { ButtonSize, TextVariant } from "../../enum";
import threadSchema from "../../validations/threadSchema";

function NewThreadsForm() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<UserInfo[]>();
  useEffect(() => {
    axios
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        setUserList(response.data);
      })
      .catch((error) => console.log("error", error.response));
  }, []);
  const initialValues = {
    userId: "",
    threadName: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: threadSchema,
    initialValues,
    onSubmit: (values) => {
      axios
        .post(
          `${API_URL}/threads`,
          {
            participantId: values.userId,
            name: values.threadName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          navigate("/threads");
        })
        .catch((error) => console.log("error", error.response));
    },
  });
  console.log("test user", userList)
  console.log("test getitem", localStorage.getItem("userId"))

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
          <Typography variant="h4">Create a new thread</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="body1">Pariticipant*:</Typography>
            <FormControl
              fullWidth
              error={
                Boolean(formik?.errors?.userId) &&
                formik.values.userId.length === 0
              }
            >
              <Select
                value={formik.values.userId}
                fullWidth
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                name="userId"
              >
                {userList &&userList.filter(itemUser => itemUser.id.toString() !== localStorage.getItem("userId")
                  ).map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
              </Select>
              {Boolean(formik?.errors?.userId) &&
                formik.values.userId.length === 0 && (
                  <FormHelperText variant={TextVariant.STANDARD}>{formik?.errors?.userId}</FormHelperText>
                )}
            </FormControl>

            <Typography sx={{ mt: 2 }} variant="body1">
              Thread Name*:
            </Typography>
            <TextField
              fullWidth
              id="threadName"
              name="threadName"
              value={formik.values.threadName}
              error={
                formik.touched.threadName &&
                formik.values.threadName.length === 0 &&
                Boolean(formik.errors.threadName)
              }
              onChange={formik.handleChange}
            />
            {Boolean(formik?.errors?.threadName) &&
              formik.values.threadName.length === 0 && (
                <FormHelperText variant={TextVariant.STANDARD}>{formik?.errors?.threadName}</FormHelperText>
              )}
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              size={ButtonSize.Large}
              fullWidth
              type="submit"
            >
              Add new thread
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NewThreadsForm;
