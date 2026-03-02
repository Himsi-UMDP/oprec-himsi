import './index.css'
import Navbar from './components/Navbar'
import Hero from './container/home/Hero'
import Bidang from './container/bidang/Bidang'
import Proker from './container/proker/Proker'
import Timeline from './container/timeline/Timeline'
import Faq from './container/faq/Faq'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Bidang />
      <Proker />
      <Timeline />
      <Faq />
    </>
  )
}

export default App
