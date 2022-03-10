import { Box } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: (t) => t.palette.grey[200],
          zIndex: (t) => t.zIndex.drawer,
          justifyContent: "center",
          width: "100%",
          position: "relative",
          bottom: 0
        }}
      >
        Footer goasdfasdfes here
      </Box>
    </footer>
  );
};

export default Footer;
