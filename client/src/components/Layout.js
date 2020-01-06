import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from './Drawer';

const styles = () => ({
    children: {
        marginTop: "84px"
    }
})

const Layout = ({ children, classes }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography
                        variant="h6"
                    >
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        Os vouchers
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
            <div className={ classes.children }>
                { children }
            </div>
        </>
    );
};

export default withStyles(styles)(Layout);