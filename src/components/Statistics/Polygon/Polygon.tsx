import React from 'react';

interface PolygonProps {
  dailyTodo: {}
  totalCompleted: number
}

const Polygon = (props: PolygonProps) => {

  const getPoints = () => {
    const dates = Object.keys(props.dailyTodo).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const firstDay = dates[0];
    if (firstDay) {
      const lastDay = dates[dates.length - 1];
      let range = Date.parse(lastDay) - Date.parse(firstDay);
      if (firstDay === lastDay) {
        range = 1
      }
      let finishedCount = 0;
      const pointArr = dates.map(date => {
        const x = (Date.parse(date) - Date.parse(firstDay)) / range * 240;
        console.log(Date.parse(date),Date.parse(firstDay));
        // @ts-ignore
        finishedCount += props.dailyTodo[date].length;
        const y = (1 - finishedCount / props.totalCompleted) * 60;
        return `${x},${y}`;
      });
      return ['0,60', ...pointArr, '240,60'].join(' ');
    } else {
      return '0,60 240,60';
    }

  };


  return (
    <div className="polygon">
      <svg>
        <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" strokeWidth="1"
                 points={getPoints()}/>
      </svg>
    </div>
  );
};

export default Polygon;