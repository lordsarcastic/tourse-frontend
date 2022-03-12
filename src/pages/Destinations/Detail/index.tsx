import { useParams } from "react-router-dom"
import { useAxios } from "use-axios-client";
import DestinationsPage from "..";
import { useErrorHook } from "../../../hooks";
import { DESTINATIONS_LIST } from "../../../routes";
import { DestinationType, Page } from "../../../types"
import { Destination } from "../listings";

const Main = () => {
    const { slug } = useParams<string>();
    const { loading, error, data } = useAxios<DestinationType>(`${DESTINATIONS_LIST}${slug}`);
    const _ = useErrorHook(error);

    return (
        <>
            {loading && <p className="text-7xl text-center text-green-500 font-bolder">Loading</p>}
            {data && <Destination {...data} />}
        </>
    )
}

const DestinationDetail: Page = {
    Component: Main,
    route: `${DestinationsPage.route}/:slug`
}

export default DestinationDetail