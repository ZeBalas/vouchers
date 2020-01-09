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
import trevo3Img from '../media/img/trevo3.jpg';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';

const styles = {
    modalContainer: {
        width: "40vh",
        height: "30vh"
    },
    modalContent: {
        height: "100%",
        marginTop: "1vh"
    },
    typography: {
        fontFamily: "'Courier Prime', monospace",
    },
    logo: {
        width: "100px",
        height: "100px",
        margin: "auto"
    },
    logoGrid: {
        width: "100%",
        marginLeft: "calc(50% - 50px)",
        marginTop: "20px"
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
                <Grid item sm={12} className={classes.logoGrid}>
                    <img src={trevo3Img} className={classes.logo} alt="logo" />
                </Grid>
                <Grid item sm={12} className={classes.modalContent}>
                    <Typography 
                        className={classes.typography}
                        align="center" 
                        variant="h5" 
                        component="p"
                    >
                        { voucher.code }
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        align="center"
                        component="p"
                    >
                        Obrigado e volte sempre!
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