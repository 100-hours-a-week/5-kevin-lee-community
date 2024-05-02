import logo from './logo.svg';
import './App.css';
import Name from "./Components/Name"
import Index from "./Pages/index"
import Counter from "./Components/Counter"
function App() {
  const name = "Anger";
  
  return (
    <div className='App'>
      {/* <Index name={name} age={30} children = {0}></Index> */}
      <Counter></Counter>
    </div>    
  );
}

export default App;
