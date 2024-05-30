/***
 * @name seamlessCarousel
 * 无缝轮播的一个class
 * 你需要要把主视口的css类设置为.viewport，
 * 图片的盒子为.swipeBox
 * {
 * 以下可不加
 * 左右箭头的类 .control-prev .control-next
 * 下面小圆点的类 .control-indicators
 * 如果你需要默认的的css样式请用类里 defaultStyle的方法
 * }
 * 自动轮播的方法为 autoPlay(time)
 * **/
class seamlessCarousel {
  count = 0;
  current = 0;
  constructor() {
    this.initDom();
    this.bindEvent();
  }
  initDom = () => {
    const dom = {
      IamgeList: document.querySelector(".swipeBox"),
      ctrlItem: document.querySelector(".control-indicators") || null,
      prev: document.querySelector(".control-prev") || null,
      next: document.querySelector(".control-next") || null,
      viewport: document.querySelector(".viewport") || null,
    };
    console.log(dom.IamgeList);
    this.count = dom.IamgeList.childElementCount;
    console.log(this);
    dom.IamgeList.style = "position:relative;";
    const firstElement = dom.IamgeList.firstElementChild.cloneNode(true);
    const lastElement = dom.IamgeList.lastElementChild.cloneNode(true);
    lastElement.style = "position: absolute;top: 0;left: -100%;";
    dom.IamgeList.appendChild(firstElement);
    dom.IamgeList.insertBefore(lastElement, dom.IamgeList.firstChild);
    this.docu = dom;
  };

  moveTo(index) {
    if (this.docu.ctrlItem != null) {
      const active = document.querySelector(".active");
      active.classList.remove("active");
      this.docu.ctrlItem.children[index].classList.add("active");
    }
    let imgs = this.docu.IamgeList;
    imgs.style = "transition:1s;";
    imgs.style.transform = `translateX(${-index * 100}%)`;
    this.current = index;
  }
  autoPlay(time) {
    this.time = time;
    const timer = setInterval(() => {
      this.moveRight();
    }, time);
    this.docu.viewport.onmouseenter = () => {
      clearInterval(timer);
    };
    this.docu.viewport.onmouseleave = () => {
      console.log("leave");
      clearInterval(timer);
      this.autoPlay(this.time);
    };
  }
  moveRight() {
    if (this.current >= this.count - 1) {
      this.docu.IamgeList.style.transition = "none";
      this.docu.IamgeList.style.transform = `translateX(${100}%)`;
      this.docu.IamgeList.clientHeight;
      this.moveTo(0);
    } else {
      this.moveTo(this.current + 1);
    }
  }
  moveLeft() {
    console.log("left");
    if (this.current <= 0) {
      this.docu.IamgeList.style.transition = "none";
      this.docu.IamgeList.style.transform = `translateX(${-this.count}00%)`;
      this.docu.IamgeList.clientHeight; //强制刷新 读取元素的几何属性
      this.moveTo(this.count - 2);
    } else {
      this.moveTo(this.current - 1);
    }
  }
  bindEvent() {
    if (this.docu.prev != null) {
      const prev = this.docu.prev;
      prev.onclick = () => this.moveLeft(); // 绑定箭头函数以确保正确的上下文
    }
    if (this.docu.next != null) {
      const next = this.docu.next;
      next.onclick = () => this.moveRight(); // 绑定箭头函数以确保正确的上下文
    }
    if (this.docu.ctrlItem != null) {
      for (let i = 0; i < this.docu.IamgeList.children.length - 2; i++) {
        this.docu.ctrlItem.children[i].onclick = () => {
          this.moveTo(i);
        };
      }
    }
  }
  defaultStyle() {
    const head = document.querySelector("head");
    const style = document.createElement("style");
    const text = document.createTextNode(`



img {
    width: 100%;
    height: 100%;
}

.control-indicators span {
    transition: all 0.3s ease-out;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 10px;
    background: #333;
    border-radius: 50%;
}
.control-indicators{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.active{
    border: #f8f7f7 solid 1px;
}
.control-prev,.control-next
{
    width: 40px;
    height: 40px;
    padding: 8px;
    cursor: pointer;
}
.control-prev{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}
.control-next{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.arrow-prev, .arrow-next{
    
    width: 100%;
    height: 100%;
    mask: conic-gradient(
        at 20px 20px,
         transparent 75%,
         blue 75%
         );
    border:3px solid white;
}
.arrow-prev{
    transform: rotate(-45deg);
}
.arrow-next{
    transform: rotate(135deg);
}
.control-indicators>span:hover{
    border: #f8f7f7 solid 2px;
}`);
    style.append(text);
    head.append(style);
  }
}

window.onload = function () {
  const carousel = new seamlessCarousel();
  carousel.autoPlay(1000);
};
