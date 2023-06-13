import { useEffect, useState } from 'react'
import './App.scss'

import { VirtualListControl } from './Components/VirtualList/VirtualListControl'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState<number[]>([])

  const populateItems = () => {
    const tmp: number[] = [];
    for (let i: number = 0; i < 5; i++) {
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
        <VirtualListControl items={items}
          itemRenderer={(item: number) => {
            return <span>{item}p</span>
          }}></VirtualListControl>
      </div>
    </>
  )
}

export default App;
