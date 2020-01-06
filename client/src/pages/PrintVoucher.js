import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { compose } from 'redux';
import {
    Button,
    withStyles,
    Container,
    Grid
} from '@material-ui/core';

import { withContext } from '../services/context';
import PrintModal from '../components/PrintModal';
import { startTimer } from '../services/utils';

const styles = () => ({
    container: {
        height: "calc(100vh - 100px)"
    },
    button: {
        margin: "10px"
    }
})

const PrintVoucher = ({
    classes,
    context
}) => {
    const [open, setOpen] = useState(false);
    const [nextVoucher, setNextVoucher] = useState(null);
    useEffect(() => {
        const { vouchers } = context;
        if(vouchers) {
            setNextVoucher(vouchers.find(voucher => !voucher.counting));
        }
    }, []);

    const giveVoucher = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            let { vouchers, dispatch } = context;
            vouchers = vouchers.filter(voucher => voucher.id !== nextVoucher.id);
            setNextVoucher(vouchers.find(voucher => !voucher.counting));
            dispatch({ type: "SET_VOUCHERS", payload: vouchers });
        }, 300)
    }

    return (
        <Layout>
            <Container className={classes.container}>
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ height: "60vh" }}
                >
                    <Button 
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={giveVoucher}
                    >
                        Imprimir
                    </Button>

                {context.vouchers && <PrintModal 
                    open={open}
                    handleClose={handleClose}
                    voucher={nextVoucher}
                />}
                </Grid>
            </Container>
        </Layout>
    )
} 

export default compose(
    withContext,
    withStyles(styles)
)(PrintVoucher);