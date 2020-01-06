import React, { useState } from 'react';
import { compose } from 'redux';
import {
    Container,
    withStyles,
} from '@material-ui/core';

import Layout from '../components/Layout';
import VoucherUpload from '../components/VoucherUpload';
import VoucherTable from '../components/VoucherTable';
import PrintModal from '../components/PrintModal';
import { withContext } from '../services/context';

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

    const handleOpen = voucher => {
        setSelectedVoucher(voucher);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedVoucher(null);
        setOpen(false);
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <VoucherUpload 
                    classes={ classes }
                    context={ context }
                />
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