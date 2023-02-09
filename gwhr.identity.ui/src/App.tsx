import logo from './logo.svg';
import './App.css';
import React from 'react';
import { InputControl } from './Components/InputControl/InputControl';

export class App extends React.Component {
  public override render(): JSX.Element {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <InputControl value='greg'
          label='Username'
          isReadOnly={false}
          validator={(value: string) => { return value.length > 0 }}
          onChange={(value: string) => {
            console.log("value is:", value);
          }}></InputControl>
        <InputControl value='greg'
          label='Password'
          isReadOnly={false}
          validator={(value: string) => { return value.length > 0 }}
          onChange={(value: string) => {
            console.log("value is:", value);
          }}></InputControl>
      </div>
    );
  }
}

// function App(): JSX.Element {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer">
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
