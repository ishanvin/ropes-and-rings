import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import AdminDashboard from './pages/AdminDashboard'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import AdminLogin from './pages/AdminLogin'
import AdminRoute from './components/admin/AdminRoute'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
