import './index.css'
import { Routes, Route } from 'react-router-dom'

// Landing page sections
import Navbar from './components/Navbar'
import Hero from './container/home/Hero'
import Bidang from './container/bidang/Bidang'
import Proker from './container/proker/Proker'
import Timeline from './container/timeline/Timeline'
import Faq from './container/faq/Faq'
import Footer from './components/Footer'
import Oprec from './container/oprec/OprecFlow'

import AdminLoginPage from './pages/admin/AdminLogin'
import AdminDashboardPage from './pages/admin/AdminDashboard'

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
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

export default App