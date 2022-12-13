import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h2">Планировщик</Typography>
      <Typography variant="h4">Заплонированные задачи</Typography>
    </Box>
  );
};

export default Header;
