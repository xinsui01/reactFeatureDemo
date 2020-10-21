import React, {createContext, useState, useRef, useEffect} from 'react'
import Test, { ThemesBth } from './test';

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

export default function ThemeContextDemo() {
  const [theme, updateTheme] = useState(themes.dark);
  const [dataSource, updateDataSource] = useState([]);
  const [vip, updateVip] = useState([]);
  const ref = useRef();
  const timeHD = useRef();

  useEffect(() => {
    timeHD.current = setInterval(() => {
      const { length: len } = dataSource;
      if (len > 50 && timeHD.current) clearInterval(timeHD.current);

      const clientId = Math.floor(Math.random() * 50);
      updateDataSource(dataSource.concat({
        name: `user ${len}`,
        clientId: clientId,
        address: `rom ${len}`,
      }));

      
      let _vip = vip;
      if (clientId > 25) {
        _vip = _vip.concat(clientId);
      }
      updateVip(_vip)

    }, 3000);
    return () => {
      timeHD.current && clearInterval(timeHD.current);
    }
  }, [dataSource, vip])

  return <ThemeContext.Provider value={theme}>
    <button
          onClick={() => {
            updateTheme(theme === themes.dark ? themes.light : themes.dark)
          }}
        >
          change theme
        </button>
        <Test dataSource={dataSource} vip={vip}>
          {(props) => {
            return <ThemesBth ref={ref}></ThemesBth>;
          }}
        </Test>
  </ThemeContext.Provider>
}