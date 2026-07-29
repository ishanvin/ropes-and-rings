import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CoverOverlay from './components/layout/CoverOverlay'
import ScrollRestoration from './components/common/ScrollRestoration'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import AdminLogin from './pages/AdminLogin'
import AdminRoute from './components/admin/AdminRoute'

const AppShell = () => {
  const location = useLocation()
  const [coverDismissed, setCoverDismissed] = useState(
    () => sessionStorage.getItem('ropes-rings-cover-dismissed') === 'true',
  )
  const showCover = location.pathname === '/' && !coverDismissed

  const dismissCover = () => {
    sessionStorage.setItem('ropes-rings-cover-dismissed', 'true')
    setCoverDismissed(true)
  }

  return (
    <>
      <ScrollRestoration />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products/new" element={<AddProduct />} />
              <Route path="/admin/products/:id/edit" element={<EditProduct />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
      {showCover && <CoverOverlay onDismiss={dismissCover} />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
