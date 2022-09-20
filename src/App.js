import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";

function App() {
  const [sidebarShown, setSidebarShown] = useState(false);

  const handleSidebarVisibility = () => {
    setSidebarShown(!sidebarShown);
  }

  return (
    <BrowserRouter>
      <PageHeader handleClick={handleSidebarVisibility}/> 
      {sidebarShown && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
