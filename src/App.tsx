import './index.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './container/home/Hero'
import Bidang from './container/bidang/Bidang'
import Proker from './container/proker/Proker'
import Timeline from './container/timeline/Timeline'
import Faq from './container/faq/Faq'
import Footer from './components/Footer'
import Oprec from './container/oprec/OprecFlow'

import AdminLogin     from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPendaftar from './pages/admin/AdminPendaftar'
import AdminDiterima  from './pages/admin/AdminDiterima'
import AdminWawancara from './pages/admin/AdminWawancara'

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Bidang />
      <Proker />
      <Timeline />
      <Oprec />
      <Faq />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/"                  element={<LandingPage />}    />
      <Route path="/admin/login"       element={<AdminLogin />}     />
      <Route path="/admin/dashboard"   element={<AdminDashboard />} />
      <Route path="/admin/pendaftar"   element={<AdminPendaftar />} />
      <Route path="/admin/diterima"    element={<AdminDiterima />}  />
      <Route path="/admin/wawancara" element={<AdminWawancara />} />
      <Route path="*"                  element={<LandingPage />}    />
    </Routes>
  )
}

export default App