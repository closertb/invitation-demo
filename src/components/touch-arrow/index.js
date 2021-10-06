import './index.less';

const node = `
  <div class="pre-wrap-bottom">
    <div class="pre-box1">
      <div class="pre1"></div>
    </div>
    <div class="pre-box2">
      <div class="pre2"></div>
    </div>
  </div>`;

const isHashEqual = (hash, targetHash) => {
  return Array.isArray(targetHash) ? targetHash.includes(hash) : targetHash === hash;
};

class TouchArrow {
  constructor() {
    this.options = {};
  }

  create(options = {}) {
    this.options = options;

    this.node = document.createElement('section', {
      id: 'flip-arrow',
      classList: 'u-arrow-bottom hide'
    });
    this.node.setAttribute('id', 'flip-arrow');
    this.node.classList.add('u-arrow-bottom');
    this.node.innerHTML = node;
    if (!this.options.hide) {
      this.node.classList.add('arrow-show');
    }
    document.body.appendChild(this.node);
    this.chooseDir();
    this.startListen()
  }

  // 就是向左滑动，向后翻页；
  toLeft() {
    this.node.classList.remove('rotate-arrow');
  }

  // 就是向右滑动，向前翻页；
  toRight() {
    this.node.classList.add('rotate-arrow');
  }

  chooseDir() {
    const hash = location.hash.slice(1);
    const { startHash, endHash } = this.options;
    if (isHashEqual(hash, startHash)) {
      this.toLeft();
      return;
    }

    if (isHashEqual(hash, endHash)) {
      this.toRight();
    }
  }
  startListen() {
    window.addEventListener('hashchange', () => {
      this.chooseDir();
      
      const callBack = this.options.callBack
      if (typeof callBack === 'function') {
        callBack(hash);
        return;
      }
    });
  }
}

export default new TouchArrow();