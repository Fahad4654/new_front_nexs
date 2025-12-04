import React, { useState } from "react";
import { Grid, Container, IconButton, Drawer, useMediaQuery, useTheme, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleNav = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setNavOpen(!navOpen);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "hsl(206 67% 95%)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "hsl(211 51% 55%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          flexShrink: 0,
          height: "64px",
          zIndex: 1100,
        }}
      >
        <IconButton
          onClick={toggleNav}
          size="large"
          sx={{ flexShrink: 0, color: "hsl(0 0% 100%)" }}
        >
          {mobileDrawerOpen || navOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Header />
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Navbar />
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {navOpen && !isMobile && (
          <Box
            sx={{
              flexShrink: 0,
              display: { xs: 'none', sm: 'block' },
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Navbar />
          </Box>
        )}

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            backgroundColor: "hsl(206 67% 95%)",
            overflowY: "auto",
            overflowX: "hidden",
            flex: 1,
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Container maxWidth="lg" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          flexShrink: 0,
          height: "60px",
          backgroundColor: "hsl(211 51% 55%)",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
