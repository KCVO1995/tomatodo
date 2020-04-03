import React, {useEffect, useState} from 'react';

interface CountdownProps {
  timer: number
}

const Countdown = (props: CountdownProps) => {
  const [countdown, setCountdown] = useState(props.timer);

  let timerId: NodeJS.Timeout;

  useEffect(() => {
    timerId = setInterval(() => {
      const time = (countdown - 1000);
      setCountdown(time);
      if (time < 0) {
        clearInterval(timerId);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [countdown]);


  const min = Math.floor(countdown / 1000 / 60);
  const second = Math.floor(countdown / 1000 % 60);
  const timer = `${min < 10 ? `0${min}` : min} : ${second < 10 ? `0${second}` : second}`;

  return (
    <div className="countdown">
      {timer}
    </div>
  );
};

export default Countdown;