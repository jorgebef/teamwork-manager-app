import { Box, Container } from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (router.asPath === "/") {
    return (
      <>
          <NavBar />
          <Container
            sx={{
              pt: 10,
              display: "flex",
              justifyContent: "center",
              minHeight: "100vh",
              boxSizing: "border-box"
            }}
          >
            {children}
          </Container>
          <Footer />
      </>
    );
  }
  return (
    <>
        <NavBar />
        <Container
          sx={{
            pt: 10,
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            boxSizing: "border-box"
          }}
        >
          <CustomDrawer />
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box"
            }}
          >
            {children}
          </Container>
        </Container>
    </>
  );
};

export default Layout;
