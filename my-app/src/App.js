import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

function App() {

  return <div  className="vh100">
    <NavBar/>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/SignIn' element={<SignIn />}/>
      <Route path='/User' element={<User />}/>
    </Routes>
    <Footer/>
  </div>
}

export default App
