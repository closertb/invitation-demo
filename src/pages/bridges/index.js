import React from 'react';
import { baseIndfo, Urls } from '../../common/enum';
import style from './index.less';

export default function Bridge(porps) {
  return (
  <div className={style.Bridge}>
    <div>
      <div className="bravo top">
        <p>The day that you meet is the beginning of our whole life</p>
        <p className="ml-10">It is the happiness of my life to be in love with you</p>
      </div>
      <div className="mid-block">
        <img className="photo" src={Urls.bridge} />
        <p className="bridges">新娘： {baseIndfo.woman}</p>
        <p className="tips">INVITATION LETTER</p>
      </div>
      <div className="bravo bottom">
        <p>...绸缪束薪，三星在天。</p>
        <p className="ml-20">今夕何夕，见此粲者。</p>
      </div>
    </div>
  </div>);
}