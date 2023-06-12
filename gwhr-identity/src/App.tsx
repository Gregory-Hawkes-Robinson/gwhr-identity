import { useEffect, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { HomeView } from './View/Home/Home'
import { UsersView } from './View/Users/Users'
import { UserView } from './View/User/User'
import { UserDetails } from './View/UserDetails/UserDetails'
import { VirtualListControl } from './Components/VirtualList/VirtualListControl'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const populateItems = () => {
    const tmp: number[] = [];
    for (let i: number = 0; i < 300; i++) {
      tmp.push(i);
    }
    setItems(tmp);
  };

  //Mount
  useEffect(() => {
    populateItems();
  }, []);

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
        <VirtualListControl items={items}></VirtualListControl>
      </div>
    </>
  )
}

export default App;
