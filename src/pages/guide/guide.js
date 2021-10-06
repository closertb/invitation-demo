import React from 'react';
import { Urls } from '../../common/enum';
import style from './index.less';



export default function guide() {
  return (
  <div className={style.Guide}>
    <div className="block top">
      <img src={Urls.knee} className="pic" />
      <div>
        <p>你微笑的看着我</p>
        <p>不说一句话</p>
        <p>而我知道</p>
        <p>为了这个</p>
        <p>你已经等了很久了</p>
      </div>
    </div>
    <div className="block bottom">
      <div>
        <p>我喜欢夏天的雨</p>
        <p>和雨后的光</p>
        <p>和任何时候的你</p>
      </div>
      <img src={Urls.hug} className="pic"/>
    </div>  </div>)
}