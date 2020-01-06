import React from 'react';
import {
    Dialog,
    DialogActions,
    IconButton,
    withStyles,
    Container,
    Grid,
    Typography
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';

const styles = {
    modalContainer: {
        width: "40vh",
        height: "65vh"
    },
    modalContent: {
        height: "50%",
        marginTop: "10vh"
    },
    typography: {
        fontFamily: "'Courier Prime', monospace",
    }
};

class PrintContent extends React.Component {
    render() {
        const { classes, voucher } = this.props;

        return (
            <Grid 
                container 
                justify="center"
            >
                <Grid item className={classes.modalContent}>
                    <Typography 
                        className={classes.typography}
                        align="center" 
                        variant="h6" 
                        component="p"
                    >
                        Código
                    </Typography>
                    <Typography 
                        className={classes.typography}
                        align="center" 
                        variant="h5" 
                        component="p"
                    >
                        { voucher.code }
                    </Typography>
                </Grid>
                {/* <Grid item className={classes.modalContent}>
                    <Typography 
                        className={classes.typography}
                        align="center" 
                        variant="h6" 
                        component="p"
                    >
                        Válido até
                    </Typography>
                    <Typography 
                        className={classes.typography}
                        align="center" 
                        variant="h5" 
                        component="p"
                    >
                        { voucher.expiresAt }
                    </Typography>
                </Grid> */}
            </Grid>
        );
    }
};

class PrintModal extends React.Component {
    render() {
        const {
            classes,
            open,
            handleClose,
            voucher
        } = this.props;

        if (!voucher)
            return "";

        return (
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <Container className={classes.modalContainer}>
                    <PrintContent
                        classes={classes}
                        ref={el => (this.componentRef = el)}
                        voucher={voucher}
                    />
                </Container>
                <ReactToPrint
                    trigger={() => (
                        <DialogActions>
                            <IconButton>
                                <PrintIcon />
                            </IconButton>
                        </DialogActions>
                    )}
                    content={() => this.componentRef}
                />
            </Dialog>
        );
    }
}

export default withStyles(styles)(PrintModal);