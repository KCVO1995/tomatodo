import React, {useEffect, useState} from 'react';

interface CountdownProps {
  timer: number
  onfinish: () => void
}

const Countdown = (props: CountdownProps) => {
  const [countdown, setCountdown] = useState(props.timer);

  let timerId: NodeJS.Timeout;
  const min = Math.floor(countdown / 1000 / 60);
  const second = Math.floor(countdown / 1000 % 60);
  const timer = `${min < 10 ? `0${min}` : min} : ${second < 10 ? `0${second}` : second}`;


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timerId = setInterval(() => {
      document.title = `${timer} - Tomatodo`;
      setCountdown(countdown - 1000);
      if (countdown < 1000) {
        document.title = `Tomatodo`;
        props.onfinish();
        clearInterval(timerId);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [countdown]);


  return (
    <div className="countdown">
      {timer}
    </div>
  );
};

export default Countdown;