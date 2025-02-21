import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { HomePage } from './pages/HomePage'
import AdminPanelPage from './pages/AdminPanelPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"
import image403 from "./assets/img/403.jpg";
import ProductsPage from './pages/ProductsPage';
function App() {

  const Unauthorized = () => <div className='min-h-screen justify-items-center'>
    <h1 className='text-4xl text-center mt-40'>Permiso denegado</h1>
    <img className='mt-10' src={image403} alt="" />
  </div>

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage formType={"login"} />}></Route>
          <Route path='/register' element={<LoginPage formType={"register"} />}></Route>
          <Route path='/' element={<Layout><HomePage /></Layout>}></Route>
          <Route path='/products' element={
            <ProtectedAdminRoute>
              <Layout><ProductsPage></ProductsPage></Layout>
            </ProtectedAdminRoute>}></Route>
          <Route path='/admin' element={
            <ProtectedAdminRoute>
              <Layout><AdminPanelPage /></Layout>
            </ProtectedAdminRoute>}></Route>
          <Route path='/tienda' element={
            <Layout>
              <ShopPage />
            </Layout>
          }></Route>
          <Route path='/unauthorized' element={<Layout><Unauthorized /></Layout>}>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
