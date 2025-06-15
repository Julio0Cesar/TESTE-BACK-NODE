import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import NavBar from "./layouts/NavBars"
import Home from "./pages/home/Home"
import Error404 from "./pages/error-404/Error404"
import Footer from "./layouts/Footer"
import CriarConta from "./pages/criar-conta/CriarConta"
import Login from "./pages/login/Login"
import { useAuth } from "./hooks/useAuth"
import CriarProduto from "./pages/criar-produto/CriarProduto"
import NotaFiscal from "./pages/nota-fiscal/NotaFiscal"

function App() {
  const {user} = useAuth()
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/criarConta' element={user ? <Navigate to='/'/> :<CriarConta/>} />
          <Route path='/login' element={user ? <Navigate to='/'/> :<Login />} />
          <Route path='/criarProduto' element={user ? <CriarProduto /> : <Navigate to='/'/>} />
          <Route path='/notaFiscal' element={user ? <NotaFiscal /> : <Navigate to='/'/>} />
          <Route path='*' element={<Error404 />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App