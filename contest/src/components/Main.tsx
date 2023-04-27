import { Routes, Route } from 'react-router-dom';
import Success from "../pages/Success";
import Subscribe from "../pages/Subscribe";
import Lottery from "../pages/Lottery";
import AppWrapper from "./AppWrapper";

function Main() {
    return (

    <Routes>
        <Route path="/" element={<AppWrapper/>}  >
            <Route path="" element={<Subscribe/>} />
            <Route path='/success' element={<Success/>} />
        </Route>
        <Route path='/lottery' element={<Lottery/>} />
    </Routes>
    );
}
export default Main;