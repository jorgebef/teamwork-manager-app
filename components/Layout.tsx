import { Box, Container } from "@mui/material";
import CustomDrawer from "./CustomDrawer";
import { DrawerCtxProvider } from "../context/DrawerCtx";
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
        <DrawerCtxProvider>
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
        </DrawerCtxProvider>
      </>
    );
  }
  return (
    <>
      <DrawerCtxProvider>
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
      </DrawerCtxProvider>
    </>
  );
};

export default Layout;
