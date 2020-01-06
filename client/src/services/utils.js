import moment from 'moment';

export const startTimer = (voucher) => {
    const expiresAt = moment(voucher.expiresAt, "DD/MM/YYYY HH:mm:ss")
    const now = moment();

    const timeLeftInMs = expiresAt.diff(now);

    const seconds = parseInt(Math.floor((timeLeftInMs / 1000) % 60));
    const minutes = parseInt(Math.floor((timeLeftInMs / 1000 / 60) % 60));
    const hours = parseInt(Math.floor(timeLeftInMs / 1000 / 60 / 60));

    return {
        seconds,
        minutes,
        hours
    };

    
}

export const stopTimer = () => {
    return {
        seconds: 0,
        minutes: 0,
        hours: 0
    }
}