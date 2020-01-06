import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    Button,
    withStyles
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import PublishIcon from '@material-ui/icons/Publish';
import { Link } from 'react-router-dom';

const styles = () => ({
    icon: {
        marginLeft: "10px"
    }
})

const Menu = ({ classes, open, onClose }) => {
    return (
        <Drawer open={open} onClose={onClose} >
            <List>
                <ListItem>
                    <Link to="/">
                        <Button>
                            Imprimir voucher
                            <PrintIcon className={classes.icon} />
                        </Button>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="load-voucher">
                        <Button>
                            Carregar vouchers
                            <PublishIcon className={classes.icon} />
                        </Button>
                    </Link>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default withStyles(styles)(Menu);