import React from 'react';
import style from './index.less';
import { baseIndfo, Urls } from '../../common/enum';

export default function Home() {
  return (
  <div className={style.homePage}>
    <img className="background top" src={Urls.top} />
    <img className="background bottom" src={Urls.btm} />
    <div className="invite-block">
      <img className="welcome-icon" src={Urls.icon} />
      <div className="title"> 婚礼 </div>
      <div className="sub-title"> 邀请函 </div>
      <div className="major">{baseIndfo.man} & {baseIndfo.woman}</div>
      <div className="mini-title">国历: {baseIndfo.time}</div>
      <div className="mini-title">农历：贰壹年八月二十</div>
      <div className="mini-title">{baseIndfo.detailHotel || baseIndfo.hotel}</div>
    </div>
  </div>);
}