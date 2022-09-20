import './App.scss';
import PageHeader from './components/PageHeader/PageHeader';
import HomePage from './pages/HomePage/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PageHeader /> 
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
