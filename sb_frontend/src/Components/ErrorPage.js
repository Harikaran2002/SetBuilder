import React from "react";
import { Typography, Container, Box, Icon } from "@mui/material";
import GppBad from "@mui/icons-material/GppBadOutlined";

const ErrorPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "10%" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="40vh"
        padding="20px"
        border="1px solid #ccc"
        borderRadius="8px"
      >
        <Icon
          component={GppBad}
          style={{
            fontSize: "100px",
            color: "red",
            marginBottom: "16px",
          }}
        />
        <Typography variant="h6" gutterBottom>
        Oops! An error occurred while loading the page.
        </Typography>
        <Typography variant="body1">
        Please check the url and retry the action.
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
