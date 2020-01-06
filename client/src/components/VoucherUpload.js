import React, { useState } from 'react';
import {
    Grid,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckIcon from '@material-ui/icons/Check';
import PublishIcon from '@material-ui/icons/Publish';

import { api } from '../services/api';
import { withContext } from '../services/context';

const VoucherUpload = ({ classes, context }) => {
    const [csvFile, setCsvFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData();
        formData.append("file", csvFile);
        try {
            const response = await api.post("/upload-file", formData);
            response.data = response.data.map((data, index) => {
                return {
                    id: index,
                    ...data,
                    timeLeft: {
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    },
                    counting: false
                }
            });
            context.dispatch({
                type: "SET_VOUCHERS",
                payload: response.data
            })
            if (response.status === 200)
                setSuccess(true);
        } catch (err) {
            setErrors({ file: "Houve um erro. Pergunta ao Torre" });
        }
        setUploading(false);
    }

    const handleChange = e => {
        const file = e.target.files[0];
        if (file.type !== "text/csv")
            setErrors({ file: "Tem de ser um ficheiro CSV" });
        else {
            setErrors({});
            setCsvFile(file);
        }
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
                    {!success && (
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
                    )}
                    {success && (
                        <label>
                            <Button
                                style={{ color: "green" }}
                                component="span"
                                size="small"
                                className={classes.button}
                            >
                                Já está
                            <CheckIcon />
                            </Button>
                        </label>
                    )}
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