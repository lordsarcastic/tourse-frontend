import { useContext } from "react"
import { useAxios } from "use-axios-client"
import { AuthContext, useLoggedIn } from "../../Auth"
import { FAVORITES } from "../../routes"
import { Page } from "../../types"



const Main = () => {
    const _ = useLoggedIn();
    const { getAuthToken } = useContext(AuthContext);
    const { loading, data, error } = useAxios<any>(FAVORITES, {
        headers: {
            "Authorization": `Bearer ${getAuthToken()?.access}`,
        }
    })

    console.log(data)

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

const FavoriteListingPage: Page = {
    Component: Main,
    route: "/favorites",
}

export default FavoriteListingPage;