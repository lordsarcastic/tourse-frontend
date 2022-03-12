import { Page } from "../../types"
import { CultureListing } from "./listings";

const Main = () => {
    return (
        <div>
            <h1>Hello World</h1>
            <CultureListing />
        </div>
    )
}

const CulturesPage: Page = {
    Component: Main,
    route: "/cultures",
}

export default CulturesPage;