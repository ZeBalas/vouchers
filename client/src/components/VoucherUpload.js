import React, { useState, useEffect } from 'react';
import {
    Grid,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import PublishIcon from '@material-ui/icons/Publish';

import { api } from '../services/api';
import { formatVouchers } from '../services/formatter';

const VoucherUpload = ({ classes, context }) => {
    const [csvFile, setCsvFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadVouchers = async () => {
            const response = await api.get("/vouchers");
            const vouchers = formatVouchers(response.data);
            context.dispatch({
                type: "SET_VOUCHERS",
                payload: vouchers
            })
        }
        loadVouchers();
    }, [context])

    const handleSubmit = async e => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData();
        formData.append("file", csvFile);
        try {
            const response = await api.post("/upload-file", formData);
            const vouchers = formatVouchers(response.data);
            context.dispatch({
                type: "SET_VOUCHERS",
                payload: vouchers
            })
            if (response.status === 200)
                setCsvFile(null);
        } catch (err) {
            setErrors({ file: "Houve um erro. Pergunta ao Torre" });
        }
        setUploading(false);
    }

    const handleChange = e => {
        const file = e.target.files[0];

        setErrors({});
        setCsvFile(file);

    }

    return (
        <Grid
            container
            justify="center"
        >
            <Grid item lg={12}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input
                        type="file"
                        id="file"
                        onChange={handleChange}
                        className={classes.input}
                    />
                    <FormHelperText className={classes.formHelperText}>
                        {errors.file}
                    </FormHelperText>
                    <label htmlFor="file">
                        <Button
                            style={{ color: csvFile && "green" }}
                            component="span"
                            size="small"
                            className={classes.button}
                        >
                            Mete aqui o mambo
                            <AttachmentIcon
                                className={classes.icon}
                            />
                        </Button>
                    </label>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        {!uploading && (
                            <PublishIcon />
                        )}
                        {uploading && (
                            <CircularProgress
                                size={24}
                                color="inherit"
                            />
                        )}
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}

export default VoucherUpload;