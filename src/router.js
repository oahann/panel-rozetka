import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './pages/LogIn/LogIn';
import PageProductTable from './pages/PageProductTable/PageProductTable';
import ProductPreview from './pages/ProductPreview/ProductPreview';
import Error from './pages/Error/Error';
import PrivateRoute from "./PrivateRoute";
import AboutProduct from "./pages/AboutProduct/AboutProduct"

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LogIn />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/product-table" element={<PageProductTable />} />
        <Route path="/product-preview" element={<ProductPreview />}/>
        <Route path="/product-preview/:productId" element={<AboutProduct />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;