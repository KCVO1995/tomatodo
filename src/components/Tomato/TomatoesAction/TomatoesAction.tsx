import React from 'react';
import {Button} from 'antd';

interface TomatoActionProps {
  startTomato: () => void
}

const TomatoesAction = (props: TomatoActionProps) => {

  return (
    <div className="tomato-action">
      <Button onClick={props.startTomato}>开始一个番茄</Button>
    </div>
  );
};


export default TomatoesAction;
