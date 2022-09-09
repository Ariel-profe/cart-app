
import './App.css'
import { CartContainer } from './components/ui/CartContainer';
import { Navbar } from './components/ui/Navbar';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';

function App() {

  const {loading} = useContext(CartContext);

  return (
    <>
      <Navbar/>
      {
        loading 
          ? (
          <div className="loading"><h1>Loading...</h1></div>
        ) 
          : (
            <CartContainer />
          )
      }
    </>
  )
}

export default App
