import React, { useState } from 'react';
import { compose } from 'redux';
import {
    Container,
    Button,
    withStyles,
    Divider,
} from '@material-ui/core';

import Layout from '../components/Layout';
import VoucherUpload from '../components/VoucherUpload';
import VoucherTable from '../components/VoucherTable';
import PrintModal from '../components/PrintModal';
import DeleteVouchers from '../components/DeleteVouchers';
import { withContext } from '../services/context';
import { api } from '../services/api';

const styles = () => ({
    input: {
        display: "none"
    },
    icon: {
        margin: "10px"
    },
    formHelperText: {
        color: "red"
    },
    button: {
        margin: "20px"
    },
    printButton: {
        color: "blue"
    },
    startButton: {
        color: "green"
    },
    stopButton: {
        color: "red"
    }
});

const LoadVouchers = ({ 
    classes,
    context
}) => {
    const [open, setOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleOpen = voucher => {
        setSelectedVoucher(voucher);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedVoucher(null);
        setOpen(false);
    };

    const deleteVouchers = async () => {
        const response = await api.delete("/vouchers");
        if (response.status === "200")
            context.dispatch({
                type: "SET_VOUCHERS",
                payload: null
            })
    }

    return (
        <Layout>
            <DeleteVouchers 
                open={deleteOpen}
                handleClose={() => setDeleteOpen(false)}
                action={deleteVouchers}
            />
            <Container maxWidth="lg">
                <VoucherUpload 
                    classes={ classes }
                    context={ context }
                />
                <Button 
                    variant="contained"
                    color="secondary"
                    onClick={() => setDeleteOpen(true)}
                >
                    Apagar todos os vouchers
                </Button>
                <Divider />
                <VoucherTable 
                    classes={ classes }
                    rows={context.vouchers}
                    handleOpen={handleOpen}
                />
                <PrintModal 
                    open={ open }
                    handleClose={handleClose}
                    voucher={selectedVoucher}
                />
            </Container>
        </Layout>
    );
}

export default compose(
    withContext,
    withStyles(styles),
)(LoadVouchers);