import './App.css';
import Header from "./Header/Header.js"
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './CheckOut/Checkout';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={[<Home />]} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='*' element="404 NOT FOUND" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
