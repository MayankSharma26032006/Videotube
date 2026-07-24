import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Watch from "./pages/Watch/Watch"
import Channel from "./pages/Channel/Channel"
import Dashboard from "./pages/Dashboard/Dashboard"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        <Route path="/channel/:username" element={<Channel />} />
        <Route path="/studio" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App