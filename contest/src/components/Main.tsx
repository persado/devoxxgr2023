import { Routes, Route } from 'react-router-dom';
import SuccessPage from "../pages/SuccessPage";
import RegisterPage from "../pages/RegisterPage";
import DrawPage from "../pages/DrawPage";
import AppWrapper from "./AppWrapper";

function Main() {
    return (

    <Routes>
        <Route path="/" element={<AppWrapper/>}  >
            <Route path="" element={<RegisterPage/>} />
            <Route path='/success' element={<SuccessPage/>} />
        </Route>
        <Route path='/draw' element={<DrawPage/>} />
    </Routes>
    );
}
export default Main;