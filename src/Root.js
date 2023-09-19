import { Outlet } from "react-router-dom";
import { GlobalContextProvider } from "./utils/globalStates";
import Header from "./Header/Header";

export default function Root() {
    return <GlobalContextProvider>
        <Header />
        <main><Outlet /></main>
    </GlobalContextProvider>
}