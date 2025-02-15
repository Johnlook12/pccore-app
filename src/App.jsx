import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

function App() {

  const Home = () => <h1>Hello home!</h1>

  return (
    <>
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/otro' element={<Home/>}></Route>
      </Routes>
    </Layout>
    </>
  )
}

export default App
