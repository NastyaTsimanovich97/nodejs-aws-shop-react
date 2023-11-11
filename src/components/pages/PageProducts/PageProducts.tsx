import Products from "~/components/pages/PageProducts/components/Products";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function PageProducts() {
  return (
    <Box py={3}>
      <Typography my={4} color="secondary" fontWeight={600}>Hello! Task 2 (Serve SPA in AWS S3 and Cloudfront Services)</Typography>
      <Products />
    </Box>
  );
}
