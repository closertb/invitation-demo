import React from 'react';
import { Urls } from '../../common/enum';
import style from './index.less';



export default function guide() {
  return (
  <div className={style.Guide}>
    <div className="block top">
      <img src={Urls.longer} className="pic" />
      <div>
        <p>只因人群中多看了</p>
        <p>你一眼</p>
        <p>从此便无法忘记</p>
        <p>你的脸</p>
      </div>
    </div>
    <div className="block bottom">
      <div>
        <p>从相遇相识到相知</p>
        <p>许是上天垂怜</p>
        <p>让我遇见了你</p>
      </div>
      <img src={Urls.couple} className="pic"/>
    </div>  </div>)
}