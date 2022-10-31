import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Typography, Button, Paper, Box } from "@mui/material";
import { Thread } from "../../api.types";
import NotMatchFound from "../../components/NotMatchFound/NotMatchFound";
import axios from "axios";
import ThreadDetails from "./ThreadDetails/ThreadDetails";
import { ButtonSize } from "../../enum";
import {API_URL} from "../../constant";

function Threads() {
  const [threadList, setThreadList] = useState<ReadonlyArray<Thread>>();
  const [threadId, setThreadId] = useState("0");
  useEffect(() => {
    axios
      .get(`${API_URL}/threads`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(function (response) {
        setThreadList(response.data);
      })
      .catch((error) => console.log("error", error.response));
  }, []);
  const handleToggle = (id: string) => {
    setThreadId(id);
  };
  return (
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
      <Grid item xs={9} sx={{ pb: 2 }}>
        <Typography variant="h4">Threads</Typography>
      </Grid>
      <Grid item xs={3} sx={{ pb: 2 }}>
        <NavLink to="/add-new-thread"><Button variant="contained">Add New Thread</Button></NavLink>
      </Grid>
      <Grid item xs={12} sx={{ pb: 2 }}>
        {threadList && threadList.length > 0 ? (
          threadList?.map((thread) => (
            <Box key={thread.id} sx={{ p: 4, mb: 3, borderTop: "1px solid grey" }}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h6">{thread.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    onClick={() => handleToggle(thread.id)}
                    size={ButtonSize.Small}
                  >
                    View Message
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  {threadId === thread.id && <ThreadDetails id={threadId} />}
                </Grid>
              </Grid>
            </Box>
          ))
        ) : (
          <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
            <NotMatchFound text="No Threads" />
          </Paper>
        )}
      </Grid>
    </Grid>
  );
}

export default Threads;
