import logo from './logo.svg';
import './App.css';
import React from 'react';
import { GhTextInputControl } from './Components/InputControl/InputControl';
import ghNotificationsManager, { GhNotificationType } from './State/Managers/GhNotificationsManager';
import { observer } from 'mobx-react-lite';
import { GhNotificationControl } from './Components/GhNotification/GhNotificationControl';

export const App = observer((): JSX.Element => {
  return (
    <div className="App" >
      <GhNotificationControl></GhNotificationControl>
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

      <GhTextInputControl value='greg'
        label={"hi"}
        error='Username must not be null'
        isReadOnly={false}
        validator={(value: string) => { return value.length > 0 }}
        onChange={async (value: string): Promise<void> => {
          console.log("value is:", value);
          await ghNotificationsManager.addAsync({ type: GhNotificationType.Information, name: value, description: "", icon: "x" });
        }} />
      <GhTextInputControl value='greg'
        label={"hi"}
        error='Username must not be null'
        isReadOnly={false}
        validator={(value: string) => { return value.length > 0 }}
        onChange={async (value: string): Promise<void> => {
          console.log("value is:", value);
          await ghNotificationsManager.addAsync({ type: GhNotificationType.Information, name: value, description: "", icon: "x" });
        }} />
      <GhTextInputControl value='greg'
        label={"hi"}
        error='Username must not be null'
        isReadOnly={false}
        validator={(value: string) => { return value.length > 0 }}
        onChange={async (value: string): Promise<void> => {
          console.log("value is:", value);
          await ghNotificationsManager.addAsync({ type: GhNotificationType.Information, name: value, description: "", icon: "x" });
        }} />

      <p>{ghNotificationsManager.store.activeNotification.name}</p>
      {/* <GhTextInputControl value={`${ghNotificationsManager.store.notifications.length}`}
          label='PasswordY'
          isReadOnly={false}
          validator={(value: string) => { return value.length > 0 }}
          onChange={(value: string) => {
            console.log("value is:", value);
          }}></GhTextInputControl> */}
    </div >
  );
});

// export const App = observable({

//   return(
//       <div className = "App" >

//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.tsx</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer">
//             Learn React
//           </a>
//         </header>
//         <GhTextInputControl value='greg'
//           label='Username'
//           isReadOnly={false}
//           validator={(value: string) => { return value.length > 0 }}
//           onChange={async (value: string): Promise<void> => {
//             console.log("value is:", value);
//             await ghNotificationsManager.addAsync({ type: GhNotificationType.Information, name: value, description: "", icon: "x" });
//           }}></GhTextInputControl>
//         <p>{ghNotificationsManager.store.notifications.length}</p>
//         {/* <GhTextInputControl value={`${ghNotificationsManager.store.notifications.length}`}
//           label='PasswordY'
//           isReadOnly={false}
//           validator={(value: string) => { return value.length > 0 }}
//           onChange={(value: string) => {
//             console.log("value is:", value);
//           }}></GhTextInputControl> */}
//       </div >
//     );

// });

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
