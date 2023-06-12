import './style.css'
import { VirtualListControl } from './VirtualListControl/VirtualListControl.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
function addList(): void {
  const items: number[] = [];
  for (let i: number = 0; i < 900; i++) {
    items.push(i);
  }
  new VirtualListControl(items);
}

addList();

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
