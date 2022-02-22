import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [prompt,setPrompt] = useState()
  const [state,setState] = useState()

  useEffect(()=>{
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
            function (registration) {
              console.log("Service Worker registration successful with scope: ", registration.scope);

              window.addEventListener('beforeinstallprompt', (e) => {
                // Prevent Chrome 67 and earlier from automatically showing the prompt
                e.preventDefault();
                // Stash the event so it can be triggered later.
                setPrompt(e);
                setState("install");
                // Update UI to notify the user they can add to home screen
                console.log("------------- PWA ---------------")

                // setOpenPWA(true)

              });

            },
            function (err) {
              console.log("Service Worker registration failed: ", err);
            }
        )
      })
    }
    else{
      console.log("errpr")}
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
          <button onClick={()=>prompt.prompt()}>{state??null}</button>
      </header>
    </div>
  );
}

export default App;
