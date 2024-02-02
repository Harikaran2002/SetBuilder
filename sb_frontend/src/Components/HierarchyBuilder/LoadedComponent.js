import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoaderComponent = ({data}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 >{data}</h1>
        <CircularProgress className="p=5" />
      </Box>
    </div>
  );
};

export default LoaderComponent;
