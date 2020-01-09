import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { compose } from 'redux';
import {
    Button,
    withStyles,
    Container,
    Grid,
    Typography
} from '@material-ui/core';

import { withContext } from '../services/context';
import PrintModal from '../components/PrintModal';
import { api } from '../services/api';

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
        if (vouchers) {
            setNextVoucher(vouchers.find(voucher => !voucher.counting));
        }
    }, [context]);

    const giveVoucher = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(async () => {
            let { vouchers, dispatch } = context;
            const response = await api.delete(`/give-voucher/${nextVoucher.code}`);
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

                    {
                        (!context.vouchers ||
                            context.vouchers.length === 0) &&
                        <Typography variant="h6" component="p">
                            Não tenho vouchers
                        </Typography>
                    }
                    {
                        context.vouchers &&
                        context.vouchers.length <= 10 &&
                        context.vouchers.length > 0 &&
                        <Typography variant="h6" component="p" style={{ color: "red" }}>
                            Já só tenho mais {context.vouchers.length} {context.vouchers.length === 1 ? "voucher" : "vouchers"}
                        </Typography>
                    }
                    <Button
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={giveVoucher}
                        disabled={!context.vouchers || context.vouchers.length === 0}
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