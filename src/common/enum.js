import { EventEmitter } from "events";

//eventBus 利用这个对象可以发送或者监听事件
export const eventBus = new EventEmitter();

export const baseIndfo = {
  man: '胖大熊',
  woman: '美宜静',
  time: '2021.09.26',
  hotel: '快乐星球大酒店',
  detailHotel: '快乐星球大酒店(青羊店)',
  address: '成都市青羊区'
};

const domain = 'https://doddle.oss-accelerate.aliyuncs.com/demo/img'; // 'http://localhost:5000';

export const Urls = {
  top: `${domain}/top.jpeg`,
  btm: 'https://doddle.oss-accelerate.aliyuncs.com/strong/btm.jpeg',
  icon: 'https://doddle.oss-accelerate.aliyuncs.com/wedding/icon.png',
  bridgeRoom: `${domain}/bridgeRoom.jpeg`,
  bridge: `${domain}/bridge.jpeg`,
  couple: `${domain}/couple1.jpeg`,
  map: 'https://doddle.oss-accelerate.aliyuncs.com/strong/map.jpeg',
  hug: `${domain}/hug.jpeg`,
  knee: `${domain}/knee.jpeg`,
  welcome: `${domain}/welcome.jpeg`,
  longer: `${domain}/longer.jpeg`,
}