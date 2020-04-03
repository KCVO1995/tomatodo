import React, {useState} from 'react';
import {Button, Input} from 'antd';
import {Tomato} from '@/types';
import Countdown from '@/components/Tomato/Countdown/Countdown';

interface TomatoActionProps {
  startTomato: () => void
  unfinishedTomato: Tomato
  updateTomato: (id: number, params: any) => void
}

const TomatoesAction = (props: TomatoActionProps) => {
  const [editText, setEditText] = useState('');

  const commit = () => {
    const {id} = props.unfinishedTomato;
    props.updateTomato(id, {description: editText, ended_at: new Date()});
    // updateTomato 可能网络延迟，避免用户看到空的input
    setTimeout(()=> {
      setEditText('');
    }, 500)
  };

  const onfinish = () => {
    // 为了代替 forceUpdate 的曲线救国
    setEditText(' ');
    setEditText('');
  };


  const HTML = () => {
    if (!props.unfinishedTomato) {
      return <Button onClick={props.startTomato}>开始一个番茄</Button>;
    } else {
      const {unfinishedTomato} = props;
      // @ts-ignore
      const nowTime = Date.parse(new Date());
      // @ts-ignore
      const startedAt = Date.parse(unfinishedTomato.started_at);
      const {duration} = unfinishedTomato;
      if (nowTime - startedAt <= duration) {
        return <Countdown timer={duration - nowTime + startedAt}
                          onfinish={onfinish}/>;
      } else if (nowTime - startedAt > duration) {
        return <Input value={editText}
                      placeholder="你刚刚完成了什么工作？"
                      onChange={e => setEditText(e.target.value)}
                      onPressEnter={commit}
        />;
      }
    }
  };

  return (
    <div className="tomato-action">
      {HTML()}
    </div>
  );
};


export default TomatoesAction;
