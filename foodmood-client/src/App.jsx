//import './App.css'

//function App() {

//return (
//<>
//<h1 className='bg-green'>Hello,Developers!</h1>
//</>
//)
//}

//export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound"; // Custom 404 Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Routes>
    </Router>
  );
}

export default App;
