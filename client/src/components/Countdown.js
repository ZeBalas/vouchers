import React from 'react';
import {
    withStyles
} from '@material-ui/core';

const styles = {
    text: {
        fontWeight: "900",
        fontSize: "2.5em"
    }
}

class Countdown extends React.Component {
    state = {
        seconds: this.props.time.seconds,
        minutes: this.props.time.minutes,
        hours: this.props.time.hours
    };

    componentDidMount() {
        const { seconds, minutes, hours } = this.props.time;
        this.setState({
            seconds,
            minutes,
            hours,
        })
    }

    componentDidUpdate(prevProps) {
        let timeout = null;
        const {
            seconds,
            minutes,
            hours
        } = this.state;

        if (prevProps.time !== this.props.time)
            this.setState({
                seconds: this.props.time.seconds,
                minutes: this.props.time.minutes,
                hours: this.props.time.hours
            });

        if (this.props.time.seconds === 0 &&
            this.props.time.minutes === 0 &&
            this.props.time.hours === 0)
            clearTimeout(timeout);


        if (seconds > 0 || minutes > 0 || hours > 0) {
            timeout = setTimeout(() => {
                if (this.props.time.seconds === 0 &&
                    this.props.time.minutes === 0 &&
                    this.props.time.hours === 0)
                    clearTimeout(timeout);
                else {
                    if (seconds === 0) this.setState({ seconds: 59 })
                    else this.setState({ seconds: seconds - 1 })

                    if (seconds === 0) {
                        if (minutes === 0) this.setState({ minutes: 59 })
                        else this.setState({ minutes: minutes - 1 })
                    }

                    if (minutes === 0 && seconds === 0) {
                        this.setState({ hours: hours - 1 })
                    }
                }
            }, 1000);
        }
    }

    render() {
        const { classes } = this.props;
        const { seconds, minutes, hours } = this.state;

        return (
            <div>
                <span
                    className={classes.text}
                >
                    {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </div>
        );
    }

}

export default withStyles(styles)(Countdown);