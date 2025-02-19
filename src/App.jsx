import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { HomePage } from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const Home = () => <h1>Hello home!</h1>

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage formType={"login"}/>}></Route>
          <Route path='/register' element={<LoginPage formType={"register"}/>}></Route>
          <Route path='/' element={<Layout><HomePage /></Layout>}></Route>
          <Route path='/tienda' element={
            <Layout>
              <ShopPage />
            </Layout>
          }></Route>
          <Route path='/otro' element={<Home />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
