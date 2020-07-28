import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RedocStandalone } from 'redoc';
import yaml from 'js-yaml';
import data from './MediaServer2.yaml'


const nativeObject = yaml.load(data)


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <RedocStandalone spec={JSON.parse(JSON.stringify(nativeObject))}
      
      options={{
        nativeScrollbars: false,
        theme: {
          colors: { primary: { main: "blue" } },
          typography: {
            fontSize: "14px",
            code: {
              fontSize: "13px"
            }
          }
        },
        lazyRendering: true
        // scrollYOffset: 150,
      }}
      
      
      
      
      
      
      />
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
