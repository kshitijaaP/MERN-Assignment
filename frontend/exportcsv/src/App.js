
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserForm from "./components/UserForm/UserForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDataImport from "./components/UserDataImport/UserDataImport";
import HomePage from "./components/HomePage/HomePage";

import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/exportcsv" element={<UserForm />}></Route>
        <Route path="/importcsv" element={<UserDataImport />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
