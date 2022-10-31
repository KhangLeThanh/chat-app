import React from "react";
import Typography from "@mui/material/Typography";
import SignalCellularNoSimOutlinedIcon from "@mui/icons-material/SignalCellularNoSimOutlined";
import { styled } from "@mui/material";

type NotMatchFoundProps = {
  text: string;
};
const WrapperNotFound = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(6),
  "& svg": {
    fontSize: "3rem",
  },
}));
export default function NotMatchFound({ text }: NotMatchFoundProps) {
  return (
    <WrapperNotFound>
      <SignalCellularNoSimOutlinedIcon />
      <Typography variant="h4">{text}</Typography>
    </WrapperNotFound>
  );
}
