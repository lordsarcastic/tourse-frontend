import { Page } from "../../types"
import { Banner } from "./banner";

const Main = () => {
    return (
        <div>
            {/* <h1>Hello World</h1> */}
            <Banner />
        </div>
    )
}

const HomePage: Page = {
    Component: Main,
    route: "/",
}

export default HomePage;