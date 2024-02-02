import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <AppBar
            position="sticky"
            style={{ backgroundColor: "rgb(19, 84, 161)" }}
          >
            <Toolbar variant="dense" className="header-bar header-toolbar">
                <div className="header-logo">
                  <img
                    className="SW-logo"
                    src="./sw-logo-bm.png"
                    alt="logo"
                    style={{ maxWidth: "50px" }}
                  />
                  <img
                    className="SW-logo"
                    src="./sw-logo-txt.png"
                    alt="logo-title"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "30%",
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.17px",
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Volkorn",
                }}
                className="header-title"
              >
                Set Builder
              </Typography>
            </Toolbar>
          </AppBar>
  )
}

export default Header