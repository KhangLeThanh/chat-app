import * as React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import customTheme from "../../theme/customTheme";
import { Button, styled } from "@mui/material";

const WrapperLink = styled("div")(() => ({
  "& a": {
    textDecoration: "none",
    color: "black",
  },
  "&.WrapperNavigationLink.active": {
    "& a": {
      color: customTheme.palette.primary.main,
    },
  },
}));
export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <WrapperLink
            className={`WrapperNavigationLink ${
              location.pathname === "/" || location.pathname === "/login"
                ? "active"
                : "inactive"
            }`}
          >
            <NavLink to="/">
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textDecoration: "none" }}
              >
                Home
              </Typography>
            </NavLink>
          </WrapperLink>

          {localStorage.getItem("token") && (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}
              >
                LogOut
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
