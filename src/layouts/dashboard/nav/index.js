import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Drawer, Typography, Avatar } from "@mui/material";
// mock
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const data = useSelector((state) => state.useApiData.data);

  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5, backgroundColor: "#860003" ,borderRadius:1.5}}>
        <RouterLink
          underline="none"
          to="/dashboard/edit"
          style={{ textDecoration: "none" }}
        >
          <StyledAccount>
            <Avatar src={data.image} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              {data.image ? (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#fff" }}
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#fff" }}
                  >
                    {data.email}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    {data.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    {data.category}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: "#fff" }}>
                    {data.description}
                  </Typography> */}
                </>
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#fff" }}
                >
                  Edit Profile
                </Typography>
              )}
            </Box>
          </StyledAccount>
        </RouterLink>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
