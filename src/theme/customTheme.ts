// eslint-disable-next-line import/prefer-default-export
import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#2e4eb4",
    },
    secondary: {
      main: "#fffa90",
      light: "#FFFFFF",
    },
    // warning color for theme
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
  },
  components: {
    MuiFormHelperText: {
      variants: [
        {
          props: { variant: "standard" },
          style: {
            fontWeight: "300",
            color: "#B31913",
            fontSize: "0.875rem",
          },
        },
      ],
    },
  },
});
