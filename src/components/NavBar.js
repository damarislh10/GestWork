import React from "react";
import UserPerfil from "../hooks/UserPerfil";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

export const NavBar = () => {
  const user = UserPerfil();

  return (
    <AppBar style={{ backgroundColor: "#1c1b1b" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
              <Link to="/profile" className="link-name">
                <Button className="subtitle_navBar" color="inherit">
                  {user.nombre !== undefined ? user.nombre : (user.nombre = "")}
                </Button>
                </Link>
                {user.foto !== undefined ? (
                  <Avatar alt="Remy Sharp" src={user.foto} />
                ) : (
                  (user.foto =
                    "https://res.cloudinary.com/dss4kjwzk/image/upload/v1649172010/GestWork/Gestwork_oieal5.png")
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
