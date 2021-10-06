import React, { useState, useEffect } from 'react';
import { baseIndfo, Urls } from '../../common/enum';
import style from './index.less';

  /**
    * 根据地图类型、位置获取不同的地图页面跳转链接
    * @param {*} mapType 地图类型
    * @param {*} location 经纬度 lat:纬度 lng:经度
    * @param {*} address 详细地址
    */
function openApp() {
  const [lat, lng, address ] = [31.454567, 104.651151, baseIndfo.hotel];
  // if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
  //   wx.openLocation({
  //     latitude: s,
  //     longitude: u,
  //     address: l,
  //     name: i
  //   });
  // }
  const url = 'https://apis.map.qq.com/uri/v1/marker?marker=coord:' + lat + ',' +  lng +';addr:'+ address +';title:地址&referer=keyfree'
  // 'https://uri.amap.com/marker?position='+ lng + ',' + lat +'&name='+ address +'&callnative=1';;
  // return url;
  window.open(url, 'blank');
}


export default function guide() {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 1000);
  }, []);
  
  return (
  <div className={style.Location}>
    <img className="back" src={Urls.welcome} />
    <div className="btm">
      <img src={Urls.map} className="map" />
      <div className="info">
        <img className="welcome" src={Urls.icon} />
        <div className="address-block">
          <p className="wel">Welcome to our weddding</p>
          <h4 className="tx-c">
            婚礼地址
          </h4>
          <div className="detail">
            <span>{baseIndfo.address}-{baseIndfo.hotel}</span>
            <div onClick={openApp} className="navigation">
              <svg t="1616594175518" className="map-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4301" width="200" height="200"><path d="M918.741333 810.517333L938.666667 916.842667a42.666667 42.666667 0 0 1-42.666667 42.666666H128a42.666667 42.666667 0 0 1-42.666667-42.666666L111.872 810.666667H106.666667a42.666667 42.666667 0 0 1-42.666667-42.666667l85.333333-256c6.656-20.224 19.093333-42.666667 42.666667-42.666667h145.578667a821.546667 821.546667 0 0 0 41.450666 64h-160.874666a26.773333 26.773333 0 0 0-21.333334 21.333334l-59.882666 170.666666a21.333333 21.333333 0 0 0 21.333333 21.333334h707.456a21.333333 21.333333 0 0 0 21.333333-21.333334l-60.778666-170.666666a23.850667 23.850667 0 0 0-21.333334-21.333334h-159.466666a826.154667 826.154667 0 0 0 41.28-64H832a46.549333 46.549333 0 0 1 42.666667 42.666667l85.333333 256a42.666667 42.666667 0 0 1-41.258667 42.517333zM854.272 810.666667H174.784l-16.512 63.509333a21.333333 21.333333 0 0 0 21.333333 21.333333h664.789334a21.333333 21.333333 0 0 0 21.333333-21.333333z" fill="#5A8DF2" p-id="4302"></path><path d="M512 661.333333c-37.610667 0-234.666667-233.066667-234.666667-362.666666a234.666667 234.666667 0 0 1 469.333334 0c0 129.6-199.061333 362.666667-234.666667 362.666666z m0-533.333333a170.666667 170.666667 0 0 0-170.666667 170.666667c0 94.250667 148.416 277.333333 170.666667 277.333333 20.266667 0 170.666667-183.082667 170.666667-277.333333a170.666667 170.666667 0 0 0-170.666667-170.666667z m0 258.005333a74.666667 74.666667 0 1 1 74.666667-74.666666 74.666667 74.666667 0 0 1-74.666667 74.666666z" fill="#F2A355" p-id="4303"></path></svg>
              <span className="go">点这里</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={display ? 'shadow-welcome display' : 'shadow-welcome'}>
      <div className="inline-block">
        <p>沉浸在幸福中的我们</p>
        <p>即将举行婚礼</p>
        <p>邀请您及您的家人</p>
        <p>共同见证,举杯畅饮</p>
      </div>
    </div>
  </div>);
}