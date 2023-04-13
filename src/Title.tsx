import React from "react";
import { Typography, Box } from "@mui/material";

const Title: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(135deg, #3a8dff 0%, #86b9ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          paddingBottom: "20px",
        }}
      >
        Lifegame
      </Typography>
    </Box>
  );
};

export default Title;
