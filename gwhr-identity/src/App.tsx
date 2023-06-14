import { useEffect, useState } from 'react'
import './App.scss'

import { VirtualListControl } from './Components/VirtualList/VirtualListControl'
import { ListControl } from './Components/List/ListControl'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const populateItems = () => {
    const tmp: number[] = [];
    for (let i: number = 0; i < 900; i++) {
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
        <ListControl items={items}
          itemTemplate={(item: number) => {
            return <span>{item}p</span>
          }}></ListControl>
      </div>
    </>
  )
}

export default App;
