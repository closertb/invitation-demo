# 怎么为自己设计一个婚礼邀请函

## 前奏

一个前端，成家之时，需要一份婚礼邀请函。用网上哪些网站（婚礼纪、易企秀）生成出来的，样式、动画效果感觉很赞，但公司logo、广告弹窗、加载速度、自定义版图都让我这个职（qiang）业（po）前（zheng）端（huanzhe）感觉，这需求肯定过不了产品验收。

除了这是一份简单的婚礼邀请函架构之外，这更多是一个前端入门H5性能优化的开胃菜。
![20211006092843](https://doddle.oss-cn-beijing.aliyuncs.com/oldNotes/20211006092843.png)
查看效果，可点击: [演示demo](https://closertb.site/static/invitation/index.html)

仓库地址：[Invitation-Demo](https://github.com/closertb/invitation-demo)

## 架构设计

### 框架选型

市面上哪些低代码输出的邀请函，基本都是基于juery的；对于我这种没有经历过juery，IE摧残的年轻前端，什么jquery的架构设计，基本不会;原生JS，那也是不可能的；React一把梭，才是我的最优解，写起来顺手，自己的积累也最多；

基本就纯react，没有依赖什么其他第三方库，就外加了个React-Router 和 动画库；

```js
<AnimatedRouter>
  <Route path="/home" exact component={Home} />
  <Route path="/guide" exact component={Guide} />
  <Route path="/location" exact component={Location} />
  <Route path="/bridge" exact component={Bridge} />
  <Route path="/bridgeRoom" exact component={BridgeRoom} />
  <Redirect to="/" component={Home} />
</AnimatedRouter>
```

### 架构设计

传统设计，如婚礼纪、易企秀这些，大多采用基于锚点的单页设计，和SPA有所区别, 是以前那种很纯正的单页, 可以理解为SPA的前身，就是所有的页面内容都同时存在于一个html中,通过可见性或滚动来展示某个或多个页面, 来个代码直观点。

```html
  <body>
    <header>
      <a href="#first">1</a>
      <a href="#sec">2</a>
      <a href="#thi">3</a>
    </header>
    <content>
      <div id="first">这是第一页</div>
      <div id="sec">这是第2页</div>
      <div id="thi">这是第3页</div>
      <div id="for">这是第4页</div>
    </content>
  </body>
```

当我点击2时，会跳到第2页，点击3时，跳到3页，id在这里作为一种描点标记。

SPA也是hash，但把锚点换了一种玩法，他是每一次切换hash时，动态在一个节点上卸载和重新挂载内容，不存在内容同时存在的情形。和上面的单页相比：  

缺点：页面与页面之间切换没有那么顺滑，如果不做特殊处理，切换就会显得很生硬；

优点：更符合现代前端的开发习惯

交互差别：锚点页面切换，更多是上下滑动；而spa的切换，可上下，也可左右，这取决于开发者的处理方式；

所以在框架选型一节可以看到，我总共有5个页面，为了页面切换顺滑，我使用了`react-transition-group`组件来处理我的页面过渡。

另外，为了把邀请函做的更像邀请函，我采用了幻灯片式的自动播放，播放完后支持手动滑动的方式。

```js
autoPlay = async () => {
  // 开始自动播放；
  await wait(() => { this.props.history.push('/bridge'); }, WAIT_TIME);
  await wait(() => { this.props.history.push('/bridgeRoom'); }, WAIT_TIME);
  await wait(() => { this.props.history.push('/guide'); }, WAIT_TIME);
  await wait(() => { this.props.history.push('/next'); }, WAIT_TIME);
  await wait(() => { this.props.history.push('/location'); }, WAIT_TIME);
  // 加滑动操作指示箭头
  touchArrow.create({ startHash: ['/', '/home' ], endHash: '/location' });
  // 开启滑动
  touchManage(this.props.history);
}
```

所以在这些基础上，我写邀请函，就可以像写一个普通前端应用那样自如。
### 其他

因为要做成邀请函，又是自动播放，那肯定就少不了音乐，不然邀请函的代入感就大打折扣。

播放音乐其实是个很简单的操作，在这个版权为王的时代，下首自己中意的歌才是最难的。

另外，为了更少的引入三方库，减少包体积，所以在滑动手势操作检测和loading动画上，我都采用了纯手写js和css的方式来实现。
## 样式优化

作为一个婚礼邀请函，除了婚礼新人图片一定要选漂亮的之外，网页本身的样式也需要过硬的设计。

基本的样式排版，构图，可以参考婚礼纪、图怪兽上面的一些现成作品, 毕竟别人是靠这个吃饭的，设计上我不得不低头。

### 翻页动画

在架构设计设计一节已讨论过，spa 的页面切换，如果不做特殊处理，切换时就会显得很生硬，所以我引入了`react-transition-group`组件，组件设计很面面俱到，你可以根据自己的需求，自定义过渡动画；

组件使用很简单，自定义一下css动画就好。

### 图片进场动画

由于图片，我做了压缩处理和在页面加载时做了prelaod，所以基本不用考虑图片load的问题，只需考虑进场问题，做过ppt的就知道，进场动画可以提升你演示文稿的水平，邀请函也一样。



### 字体样式
一般来说，我们用个默认字体，作为一个邀请函，整个页面效果会显得比较生硬，所以，最好的做法，是去网上选一个让自己满意的字体，然后css里设置一下;

```css
@font-face {
  font-family: special;
  src: url('./font.ttf');
}
body {
  font-family: special;
}
```
## 加载优化
### 网络

如果你打包的静态资源都放github pages里，这肯定会很慢的。所以，有钱就买个好点的静态资源服务，或者oss，这里我强烈推荐阿里云的，再有胜者，可以直接搞个cdn加速。

我个人都是部署一体化，静态资源都部署在阿里云服务器上，图片等媒体资源都放oss上，加上我域名开启了http2，这样的配置，基本能保证到首屏秒开。

### 预加载

因为我所有的资源都放在了oss上，整体架构是采用翻页设计，所以采用了preload提前加载。

```html
<link rel="preload" href="https://doddle.oss-accelerate.aliyuncs.com/strong/font.ttf" as="font" />
<link rel="preload" href="https://doddle.oss-accelerate.aliyuncs.com/strong/top.jpeg" as="image" />
<link rel="preload" href="https://doddle.oss-accelerate.aliyuncs.com/strong/btm.jpeg" as="image" />
```

这种方式，基本能保证下一页，图片不会loading,都是秒开。
### 图片处理

一般一张婚纱照，图片大小在8M以上，如果你直接拿这个去加载，你的邀请函别人打开指定都是混乱不堪的, 所以图片大小压缩很重要，这里我推荐一个网站，前端必收藏：[squoosh](https://squoosh.app/editor), 基本上图片大小能减少80% 以上。

![20210829111142](https://doddle.oss-cn-beijing.aliyuncs.com/oldNotes/20210829111142.png)

加上前面的preload, 基本能保证图片秒开；

### 字体处理

因为字体源文件5M，加载肯定会很慢，所以采用了 font-spider 来做压缩处理，处理完之后，一般文件大小在100kb左右;

操作步骤：

1. 全局安装font-spider 插件

```
npm i font-spider -g
```

font-spider的字符压缩，其实是基于html页面的字符和字体样式进行压缩的，所以当下的开发方式(html内容写在js中)，字符压缩基本干不了什么；所以只有先提取js中的内容放到一个空html中，然后再做压缩；为了让这一工程简化，我写了一段命令，你只需运行一个指令，即可完成压缩：

2. 运行指令

```
npm run font
```

自动化的字符提取思路，可以查看我仓库中的代码。

## 其他

这里做最重要的一个提醒，因为我们的邀请函多是走微信发出给亲朋好友，那腾讯安全的那倒砍你必须先淌过，我记忆中需要做两件事：1、域名最好是https，并且是国内的；2、域名根路径含有腾讯颁发的序列化文件。我邀请函刚发出时，就发现没法访问，就识别为诈骗，后面和对方邮件沟通，才解封：
![20211006095215](https://doddle.oss-cn-beijing.aliyuncs.com/oldNotes/20211006095215.png)

至此，终于把5个月前打算写的东西写完了，做这个分享，愿能有一点小帮助。自己写一个邀请函，虽然折腾，但自己做的，能充分表达自己，媳妇满意，感觉就很值得了。