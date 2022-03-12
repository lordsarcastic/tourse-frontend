import { useLoggedIn } from "../../Auth";
import { Page } from "../../types"
import { CultureListing } from "./listings";

const Main = () => {
    const _ = useLoggedIn();
    return (
        <div>
            <h1>Hello World</h1>
            <CultureListing />
        </div>
    )
}

const DestinationsPage: Page = {
    Component: Main,
    route: "/destinations",
}

export default DestinationsPage;