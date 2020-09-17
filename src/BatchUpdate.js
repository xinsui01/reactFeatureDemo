
import React from "react";
import { unstable_batchedUpdates } from "react-dom";

export default class BatchUpdateDemo extends React.PureComponent {
  constructor(props) {
    super(props);
    // 记录 render 的执行次数
    this.renderCount = 0;
  }
  fn1 = () => {
    this.setState({ a: Math.random() });
    this.setState({ b: Math.random() });
  };
  fn2 = () => {
    // 模拟一个异步操作，真实业务里面可能是网络请求等
    setTimeout(() => {
      this.setState({ a: Math.random() });
      this.setState({ a: Math.random() });
    }, 0);
  };
  fn3 = () => {
    // 模拟一个异步操作，真实业务里面可能是网络请求等
    setTimeout(
      unstable_batchedUpdates(() => {
        this.setState({ a: Math.random() });
        this.setState({ a: Math.random() });
      }),
      0
    );
  };
  render() {
    ++this.renderCount;
    return (
      <div>
        <h1>截止到目前 render 执行次数{this.renderCount}</h1>
        <button onClick={this.fn1}>同步的 setState 两次</button>
        <br />
        <button onClick={this.fn2}>在一个异步的事件循环里 setState 两次</button>
        <br />
        <button onClick={this.fn3}>
          在一个异步的事件循环里 setState 两次, 但是使用
          ReactDOM.unstable_batchedUpdates 强制 batch
        </button>
      </div>
    );
  }
}