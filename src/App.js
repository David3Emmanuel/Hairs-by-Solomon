import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Home/HomePage";
import ShopPage from "./Shop/ShopPage";
import ContactPage from "./Contact/ContactPage";
import Root from "./Root";

import "./App.css";

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="shop" element={<ShopPage />} />
      <Route path="*" element={<div></div>} />
    </Route>
  </Routes></BrowserRouter>
}