import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Lab from "@/pages/Lab";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lab/:labId" element={<Lab />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
