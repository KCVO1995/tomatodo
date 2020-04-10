import React, {useState} from 'react';
import {Button, Input} from 'antd';
import {Tomato} from '@/types';
import Countdown from '@/components/Tomato/Countdown/Countdown';
import {CloseCircleOutlined} from '@ant-design/icons';
import {Modal} from 'antd';
import './TomatoesAction.less';

interface TomatoActionProps {
  startTomato: () => void
  unfinishedTomato: Tomato
  updateTomato: (id: number, params: any) => void
}

const TomatoesAction = (props: TomatoActionProps) => {
  const [editText, setEditText] = useState('');
  const [rest, setRest] = useState(false);

  const commit = () => {
    const {id} = props.unfinishedTomato;
    props.updateTomato(id, {description: editText, ended_at: new Date()});
    // updateTomato 可能网络延迟，避免用户看到空的input
    setRest(true);
    setTimeout(() => {
      setEditText('');
    }, 500);
  };

  const onfinish = () => {
    // 为了代替 forceUpdate 的曲线救国
    setRest(false);
    setEditText(' ');
    setEditText('');
  };

  const abortTomato = () => {
    const {id} = props.unfinishedTomato;
    props.updateTomato(id, {aborted: true});
  };

  const {confirm} = Modal;
  const showConfirm = () => {
    confirm({
      title: rest ? '要取消休息时间吗？' : '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
      width: 500,
      mask: true,
      keyboard: true,
      onOk() {
        rest ? setRest(false) : abortTomato();
      },
      onCancel() {},
    });
  };

  const HTML = () => {
    if (!props.unfinishedTomato && !rest) {
      return <Button onClick={props.startTomato}
                     className="startTomato">开始一个番茄</Button>;
    } else {
      let duration;
      let startedAt = 0;
      const {unfinishedTomato} = props;
      const nowTime = Date.parse(new Date().toString());
      if (rest) {
        duration = 300000;
      } else {
        startedAt = Date.parse(unfinishedTomato.started_at.toString());
        duration = unfinishedTomato.duration;
      }
      if (nowTime - startedAt <= duration || rest) {
        return (
          <div className="timer-wrapper">
            <Countdown timer={!rest ? duration - nowTime + startedAt : duration}
                       onfinish={onfinish}
                       duration={duration}
                       rest={rest}
            />
            <CloseCircleOutlined className="abort" onClick={showConfirm}/>
          </div>
        );
      } else if (nowTime - startedAt > duration) {
        return (
          <div className="input-wrapper">
            <Input value={editText}
                   placeholder="你刚刚完成了什么工作？"
                   onChange={e => setEditText(e.target.value)}
                   onPressEnter={commit}
            />
            <CloseCircleOutlined className="abort" onClick={showConfirm}/>
          </div>
        );
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
