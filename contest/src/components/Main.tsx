import { Routes, Route } from 'react-router-dom';
import Success from "../pages/Success";
import Subscribe from "../pages/Subscribe";
function Main() {
    return (
        <Routes>
            <Route path='/' element={<Subscribe/>} />
            <Route path='/success' element={<Success/>} />
        </Routes>
    );
}
export default Main;