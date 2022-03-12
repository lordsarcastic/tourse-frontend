import { Page } from "../../types"
import { CountryListing } from "./listings";

const Main = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <CountryListing />
        </div>
    )
}

const CountriesPage: Page = {
    Component: Main,
    route: "/countries",
}

export default CountriesPage;