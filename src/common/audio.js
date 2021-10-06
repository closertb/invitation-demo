export default class Audio {
  constructor(props) {
    this.audio = window.document.querySelector('.media-audio');
    this.icon = window.document.querySelector('.icon');
    this._play = window.document.querySelector('#audio-play');
    this._pause = window.document.querySelector('#audio-pause');
    this.loading = window.document.querySelector('.loading');
    this.props = props;
    this.tapped = false;
    this.audio.load();
    this.addListener();
  }
  addListener() {
    this.audio.addEventListener("canplay", event => {      
      this.loading.classList.add('pause');
      this.icon.classList.remove('waiting');
      this.icon.classList.add('stop');
      this.audioAutoPlay();
    });
    document.addEventListener("WeixinJSBridgeReady", () => {  
      this.loading.classList.add('pause');
      this.icon.classList.remove('waiting');
      this.icon.classList.add('stop');
      this.audioAutoPlay();
    }, false);
  }
  play() {
    this.audio.play().then(() => {
      this.icon.classList.add('play');
      this.icon.classList.remove('stop');
    });
  }
  stop() {
    this.audio.pause()
    this.icon.classList.add('stop');
    this.icon.classList.remove('play');
  }
  audioAutoPlay() {
    // this.audio.play();
    //控制小喇叭的播放状态
    this.audio.addEventListener("playing", () => {        
        this.icon.classList.add('play');
        this.icon.classList.remove('stop');
        if (this.tapped) {
          this.props.play();
        } else {
          this.tapped = true;
          this.props.start();
        }
    });
    this.audio.addEventListener("pause", () => {
        this.props.stop();
        this.icon.classList.add('stop');
        this.icon.classList.remove('play');
    });               
    this._play.addEventListener("click", () => {
        this.play()
    }, false);
    this._pause.addEventListener("click", () => {
      console.log('what');
      
        this.stop()
    }, false);
    // document.addEventListener("touchstart", () => {
    //   if(!this.isPlay) {
    //       this.play();
    //       this.isPlay = true;
    //   }
    // }, false) 
  }
}
