import { isPageChanging, histories } from '../common/history';

const ABS = 100;

export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

const nextMap = {
  '#/': '/bridge',
  '#/bridge': '/bridgeRoom',
  '#/bridgeRoom': '/guide',
  '#/guide': '/next',
  '#/next': '/location',
  '#/location': '',
}

export default function touchManage(history, arrow) {
  const axis = {};
  document.body.addEventListener("touchstart", (e) => {
    if (isPageChanging()) {
      return;
    }
　　// e.preventDefault();
    // console.log('start');
    axis.isMove = true;
    axis.time = Date.now();
  　axis.startX = e.changedTouches[0].pageX;
  　axis.startY = e.changedTouches[0].pageY;
　});

//   const handlers = debounce((e) => {
//     　　　　e.preventDefault();
//            axis.isMove = false;
//            axis.moveEndX = e.changedTouches[0].pageX;
// 　　　　    axis.moveEndY = e.changedTouches[0].pageY;
//       }, 200);
  document.body.addEventListener("touchmove", (e) => {
    if (!axis.isMove || isPageChanging()) {
      return;
    }
    // e.preventDefault();
    // axis.isMove = false;
    axis.moveEndX = e.changedTouches[0].pageX;
    axis.moveEndY = e.changedTouches[0].pageY;
  });

  document.body.addEventListener("touchend", function(e){
    if (!axis.isMove || isPageChanging()) {
      return;
    }
    // e.preventDefault();
    console.log('end');
    axis.isMove = false;
    const moveX = axis.moveEndX - axis.startX;
    const time = Date.now() - axis.time;
        
    if(!axis.isMove && time < 400 && Math.abs(moveX) > ABS){
        axis.time = 0; 
        if(moveX > 0){
          if (histories.length > 1) {
            history.goBack();
          }
        } else {
          const next = nextMap[location.hash];
          // history.goForward();
          if (!next) {
            return;
          }
          console.log('now time:', Date.now());
          
          history.push(next);
        }
    }
  });	
}