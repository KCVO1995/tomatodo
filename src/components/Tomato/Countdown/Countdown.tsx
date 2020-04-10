import React from 'react';
import './Countdown.less';

interface ICountDownProps {
  timer: number,
  duration: number,
  onfinish: () => void
  rest: boolean
}

interface IContDownStates {
  remaining: number
}

let timerID: NodeJS.Timeout;

class CountDown extends React.Component <ICountDownProps, IContDownStates> {

  constructor(props: ICountDownProps) {
    super(props);
    this.state = {
      remaining: this.props.timer
    };
  };

  componentDidMount(): void {this.startCountDown();};

  componentWillUnmount(): void {this.onTimeOver();};

  get clock() {
    const minutes = Math.floor(this.state.remaining / 1000 / 60);
    const seconds = Math.floor(this.state.remaining / 1000 % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  startCountDown = () => {
    timerID = setInterval(() => {
      const restTime = this.state.remaining;
      this.setState({remaining: restTime - 1000});
      this.props.rest ? document.title = `${this.clock} - 休息时间` :
      document.title = `${this.clock} - 有一个番茄正在进行`;
      if (restTime < 1000) {
        this.onTimeOver();
        document.title = `Tomatodo`;
      }
    }, 1000);
  };

  onTimeOver = () => {
    this.props.onfinish();
    document.title = `Tomatodo - 你的番茄土豆`;
    clearInterval(timerID);
  };

  public render() {
    const percent = 1 - this.state.remaining / this.props.duration;
    return (
      <div className="countdown">
        <span>{this.clock}</span>
        <div className="progress" style={{width: `${percent * 100}%`}}/>
      </div>
    );
  }
}

export default CountDown;