import React from 'react';
import { baseIndfo, Urls } from '../../common/enum';
import style from './index.less';


export default function Bridge(porps) {
  return (
  <div className={style.Bridge}>
    <div>
      <div className="bravo top">
        <p>　　One day you and I sit in front of the court</p>
        <p className="ml-20">old age, flowers fall, a life time.</p>
      </div>
      <div className="mid-block">
        <img className="photo" src={Urls.bridgeRoom} />
        <p className="bridges">新郎：{baseIndfo.man}</p>
        <p className="tips">INVITATION LETTER</p>
      </div>
      <div className="bravo bottom">
        <p>...百日不到处,青春恰自来。</p>
        <p className="ml-20">苔花如米小,也学牡丹开。</p>
      </div>
    </div>
  </div>);
}