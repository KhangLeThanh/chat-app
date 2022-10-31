import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { API_URL } from "../../../constant";
import { useFormik } from "formik";
import { Message } from "../../../api.types";
import { ButtonSize, TextVariant } from "../../../enum";
import { io } from "socket.io-client";
import messageSchema from "../../../validations/messageSchema";

type ThreadDetailsType = Readonly<{
  id: string;
}>;
function ThreadDetails({ id }: ThreadDetailsType) {
  const socket = io(API_URL, {
    path: "/socket",
    query: { thread: id },
  });
  const [messages, setMessages] = useState<Message[]>([]);

  const initialValues = {
    content: "",
  };
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: messageSchema,
    initialValues,
    onSubmit: (values, { resetForm }) => {
      axios
        .post(
          `${API_URL}/threads/${id}/messages`,
          {
            content: values.content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          socket.emit("message", {
            content: response.data.content,
          });
          resetForm();
        })
        .catch((error) => console.log("error", error.response));
    },
  });
  useEffect(() => {
    axios
      .get(`${API_URL}/threads/${id}/messages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        setMessages(response.data);
      })
      .catch((error) => console.log("error", error.response));
  }, []);
  useEffect(() => {
    //listens for the event list from the backend
    socket.on("message", (content) => {
      setMessages((messages) => [...messages, content]);
    });
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Grid item xs={12} sx={{ pb: 2, maxHeight: "15rem", overflow: "auto" }}>
        {messages &&
          Array.from(new Set(messages)).map((mess, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body2">
                <PersonIcon
                  sx={{ mr: 1, verticalAlign: "middle", fontSize: "1.1rem" }}
                />
                <span
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "500",
                    marginRight: "1rem",
                  }}
                >
                  {mess.user.username}:
                </span>
                <span>{mess.content}</span>
              </Typography>
            </Box>
          ))}
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={
                  formik.touched.content &&
                  formik.values.content.length === 0 &&
                  Boolean(formik.errors.content)
                }
                size={ButtonSize.Small}
              />
              {Boolean(formik?.errors?.content) &&
                formik.values.content.length === 0 && (
                  <FormHelperText variant={TextVariant.STANDARD}>
                    {formik?.errors?.content}
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" fullWidth type="submit">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
}

export default ThreadDetails;
