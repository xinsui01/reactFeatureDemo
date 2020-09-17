import React, { createContext, createRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Test, { ThemesBth } from './test';
import DiffDemo from './DiffDemo';
import BatchUpdateDemo from './BatchUpdate';
import ReactEventDemo from './ReactEvent';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = createContext(themes.light);

export default class App extends React.Component {
  state = {
    dataSource: [],
    vip: [],
    themes: themes.dark,
  };

  refBind = createRef();

  // componentDidMount() {
  //   this.timeHD = setInterval(() => {
  //     const { dataSource, vip } = this.state;
  //     const { length: len } = dataSource;
  //     if (len > 50 && this.timeHD) clearInterval(this.timeHD);
  //     const clientId = Math.floor(Math.random() * 50);
  //     let _vip = vip;
  //     if (clientId > 25) {
  //       _vip = _vip.concat(clientId);
  //     }
  //     this.setState({
  //       dataSource: dataSource.concat({
  //         name: `user ${len}`,
  //         clientId: clientId,
  //         address: `rom ${len}`,
  //       }),
  //       vip: _vip,
  //     });
  //   }, 3000);
  // }

  // componentWillUnmount() {
  //   this.timeHD && clearInterval(this.timeHD);
  // }

  render() {
    const { dataSource, vip } = this.state;
    console.log(this.refBind.current);
    return (
      <ThemeContext.Provider value={this.state.themes}>
        {/* <div className="App">
          <header className="App-header">
            <img
              width="100"
              height="100"
              style={{ height: 'auto', position: 'absolute', top: 0, left: 0 }}
              src={logo}
              className="App-logo"
              alt="logo"
            />
            <button
              onClick={() => {
                this.setState({
                  themes: this.state.themes === themes.dark ? themes.light : themes.dark,
                });
              }}
            >
              change theme
            </button>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <Test dataSource={dataSource} vip={vip}>
              {(props) => {
                return <ThemesBth ref={this.refBind}></ThemesBth>;
              }}
            </Test>
          </header>
        </div>
        <DiffDemo></DiffDemo> */}
        <BatchUpdateDemo></BatchUpdateDemo>
        {/* <ReactEventDemo></ReactEventDemo> */}
        <footer style={{ height: '300px' }}></footer>
      </ThemeContext.Provider>
    );
  }
}
