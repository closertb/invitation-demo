import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AnimatedRouter from './components/AnimatedRouter';
import { eventBus } from './common/enum';
import Audio from './common/audio';
import touchManage from './common/move';
import Home from './pages/Home';
import Bridge from './pages/bridges/index';
import BridgeRoom from './pages/bridges/bridgeRoom';
import Guide from './pages/guide/index';
import GuideLast from './pages/guide/guide';
import Location from './pages/location/index';
import touchArrow from './components/touch-arrow';
import './assets/global.less';
import './assets/animate.less';

const WAIT_TIME = 3000;
let stop = false;
const actions = [];

async function wait(action, sec) {
  return new Promise((resolve, rejection) => {    
    setTimeout(() => {
      if (!stop) {
        action();
        resolve();
      } else {
        actions.push(() => {
          action();
          resolve();
        });
      }
    }, sec)
  });
}

eventBus.on('play', () => {
  const action = actions.pop();
  setTimeout(() => {
    action && action();
  }, 2000);
});

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.audio = new Audio({
      start: this.autoPlay,
      play: () => {
        stop = false;
        eventBus.emit('play');
      },
      stop: () => {
        stop = true;
      },
    });
  }

  // componentDidMount() {
  //   this.autoPlay();
  // }

  autoPlay = async () => {
    await wait(() => { this.props.history.push('/bridge'); }, WAIT_TIME);
    await wait(() => { this.props.history.push('/bridgeRoom'); }, WAIT_TIME);
    await wait(() => { this.props.history.push('/guide'); }, WAIT_TIME);
    await wait(() => { this.props.history.push('/next'); }, WAIT_TIME);
    await wait(() => { this.props.history.push('/location'); }, WAIT_TIME);
    touchArrow.create({ startHash: ['/', '/home' ], endHash: '/location' });
    touchManage(this.props.history);
  }


  render() {

    return (
      <AnimatedRouter>
        <Route path="/" exact component={Home} />
        <Route path="/guide" exact component={Guide} />
        <Route path="/next" exact component={GuideLast} />
        <Route path="/location" exact component={Location} />
        <Route path="/bridge" exact component={Bridge} />
        <Route path="/bridgeRoom" exact component={BridgeRoom} />
        <Redirect to="/" component={Home} />
      </AnimatedRouter>
    );
  }
}

const root = render((
  <Router>
    <Route path="/" component={Root} />
  </Router>
), document.getElementById('app'));
