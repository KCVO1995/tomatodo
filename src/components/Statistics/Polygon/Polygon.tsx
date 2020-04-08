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
    const firstDay = Date.parse(dates[0]) - 24 * 60 * 60 *1000;
    if (firstDay) {
      const range = new Date().getTime() - firstDay;
      let finishedCount = 0;
      const pointArr = dates.map(date => {
        let x = (Date.parse(date) - firstDay) / range * 240;
        if (range) {x = 240}
        // @ts-ignore
        finishedCount += props.dailyTodo[date].length;
        console.log(finishedCount);
        const y = (1 - finishedCount/props.totalCompleted) * 60;
        return `${x},${y}`;
      });
      return ['0,60', ...pointArr,'240,0','240,60'].join(' ');
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