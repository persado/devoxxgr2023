import {Outlet} from "react-router-dom";
import ContestExpired from "./ContestExpired";
import ExpirationService from "../services/ExpirationService";

function AppWrapper() {
    if (ExpirationService.contestExpired()){
        return (
          <ContestExpired/>
        );
    }

    return (
        <Outlet/>
    );
}
export default AppWrapper;