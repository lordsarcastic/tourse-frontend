import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorHandler, ErrorPage } from "./Error";
import CountriesPage from "./pages/Countries";
import CountriesDetail from "./pages/Countries/Detail";
import CulturesPage from "./pages/Cultures";
import CulturesDetail from "./pages/Cultures/Detail";
import DestinationsPage from "./pages/Destinations";
import DestinationDetail from "./pages/Destinations/Detail";
import FavoriteListingPage from "./pages/Favourites";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return (
    <ErrorHandler>
      <main>
        {/* <h1 className="text-5xl text-yellow-500">Tourse</h1> */}
        <Routes>
          <Route path={HomePage.route} element={<HomePage.Component />} />
          <Route path={CountriesPage.route} element={<CountriesPage.Component />} />
          <Route path={CountriesDetail.route} element={<CountriesDetail.Component />} />
          <Route path={CulturesPage.route} element={<CulturesPage.Component />} />
          <Route path={CulturesDetail.route} element={<CulturesDetail.Component />} />
          <Route path={DestinationsPage.route} element={<DestinationsPage.Component />} />
          <Route path={DestinationDetail.route} element={<DestinationDetail.Component />} />
          <Route path={LoginPage.route} element={<LoginPage.Component />} />
          <Route path={FavoriteListingPage.route} element={<FavoriteListingPage.Component />} />
          <Route path="*" element={<ErrorPage status={404} message="Not found" />} />
        </Routes>
      </main>
    </ErrorHandler>
  );
}

export default App;
