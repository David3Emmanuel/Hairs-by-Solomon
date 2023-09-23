import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Home/HomePage";
import ShopPage from "./Shop/ShopPage";
import Root from "./Root";

import "./App.css";

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="shop" element={<ShopPage />} />
    </Route>
  </Routes></BrowserRouter>
}