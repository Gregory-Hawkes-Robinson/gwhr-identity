import { useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { HomeView } from './View/Home/Home'
import { UsersView } from './View/Users/Users'
import { UserView } from './View/User/User'
import { UserDetails } from './View/UserDetails/UserDetails'
import { VirtualListControl } from './Components/VirtualList/VirtualListControl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='app'>
        {/* <Routes>
          <Route path="/" element={<HomeView />}>
            <Route path="users" element={<UsersView />}>
              <Route path=':id' element={<UserView />}>
                <Route path='details' element={<UserDetails />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes> */}
        <VirtualListControl></VirtualListControl>
      </div>
    </>
  )
}

export default App;
