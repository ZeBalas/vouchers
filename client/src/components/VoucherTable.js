import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import PrintIcon from '@material-ui/icons/Print';
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import Countdown from './Countdown';
import { startTimer, stopTimer } from '../services/utils';

const VoucherTable = ({
    classes,
    rows,
    handleOpen
}) => {
    const [page, setPage] = useState(0);
    const [vouchers, setVouchers] = useState(rows);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setVouchers(rows);
        console.log(rows);
        if(rows)
            rows.map((row, index) => {
                if(row.timeLeft.seconds !== 0 && row.timeLeft.minutes !== 0 && row.timeLeft.hours !== 0){
                    startCounting(row, index);
                }
            });
    }, [rows])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const startCounting = (voucher, index) => {
        rows[index] = {
            ...rows[index],
            timeLeft: startTimer(voucher),
            counting: true
        }
        setVouchers([...rows]);
    }

    const stopCounting = index => {
        rows[index] = {
            ...rows[index],
            timeLeft: stopTimer(),
            counting: false
        }
        setVouchers([...rows]);
    }

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

        return vouchers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>
                            {row.code}
                        </TableCell>
                        {/* <TableCell>
                            {row.expiresAt}
                        </TableCell>
                        <TableCell>
                            <Countdown counting={row.counting} time={row.timeLeft} />
                        </TableCell> */}
                        <TableCell>
                            <Tooltip title="Imprimir" placement="left">
                                <IconButton
                                    className={classes.printButton}
                                    onClick={() => handleOpen(row)}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            {/* {
                                row.timeLeft.seconds === 0 &&
                                row.timeLeft.minutes === 0 &&
                                row.timeLeft.hours === 0 ? (
                                    <Tooltip title="Começar" placement="right">
                                        <IconButton
                                            className={classes.startButton}
                                            onClick={() => startCounting(row, index)}
                                        >
                                            <TimerIcon />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Parar" placement="right">
                                        <IconButton
                                            className={classes.stopButton}
                                            onClick={() => stopCounting(index)}
                                        >
                                            <TimerOffIcon />
                                        </IconButton>
                                    </Tooltip>
                                )
                            } */}
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
                            {/* <TableCell>
                                Válido até
                            </TableCell>
                            <TableCell>
                                Tempo restante
                            </TableCell> */}
                            {/* <TableCell align="right" /> */}
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