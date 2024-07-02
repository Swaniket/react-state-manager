import "./App.css";
import { createStateHook } from "./simpleStateManager";

const useCounter = createStateHook(0);

const Counter = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add One</button>
      <div>Count = {count}</div>
    </div>
  );
};

function App() {
  return (
    <>
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <Counter />
    </>
  );
}

export default App;
