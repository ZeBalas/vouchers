import React, { useState, useEffect, useCallback } from 'react';
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TablePagination,
    IconButton,
    Tooltip
} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { startTimer } from '../services/utils';

const VoucherTable = ({
    classes,
    rows,
    handleOpen
}) => {
    const [page, setPage] = useState(0);
    const [vouchers, setVouchers] = useState(rows);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const startCounting = useCallback(
        (voucher, index) => {
            rows[index] = {
                ...rows[index],
                timeLeft: startTimer(voucher),
                counting: true
            }
            setVouchers([...rows]);
        },
        [rows]
    );

    useEffect(() => {
        setVouchers(rows);
        if (rows)
            rows.map((row, index) => {
                if (row.timeLeft?.seconds !== 0 && row.timeLeft?.minutes !== 0 && row.timeLeft?.hours !== 0) {
                    startCounting(row, index);
                }
                return "";
            });
    }, [rows, startCounting]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const renderTableBody = vouchers => {
        if (!vouchers) {
            return (
                <TableRow>
                    <TableCell colSpan={3}>
                        Não tenho vouchers
                    </TableCell>
                </TableRow>
            );
        }

        if(vouchers.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={3}>
                        Não tenho vouchers
                    </TableCell>
                </TableRow>
            );
        }

        return vouchers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            {row.code}
                        </TableCell>
                        <TableCell>
                            <Tooltip title="Imprimir" placement="left">
                                <IconButton
                                    className={classes.printButton}
                                    onClick={() => handleOpen(row)}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
            })
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Código
                            </TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTableBody(vouchers)}
                    </TableBody>
                </Table>
            </TableContainer>
            {vouchers && <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={vouchers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Por página"
            />}
        </Paper>
    );
}

export default VoucherTable;