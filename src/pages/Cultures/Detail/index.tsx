import { useParams } from "react-router-dom"
import { useAxios } from "use-axios-client";
import CulturesPage from "..";
import CountriesPage from ".."
import { useErrorHook } from "../../../hooks";
import { CULTURES_LIST } from "../../../routes";
import { CultureType, Page } from "../../../types"
import { Culture } from "../listings";

const Main = () => {
    const { slug } = useParams<string>();
    const { loading, error, data } = useAxios<CultureType>(`${CULTURES_LIST}${slug}`);
    const _ = useErrorHook(error);

    return (
        <>
            {loading && <p className="text-7xl text-center text-green-500 font-bolder">Loading</p>}
            {data && <Culture {...data} />}
        </>
    )
}

const CulturesDetail: Page = {
    Component: Main,
    route: `${CulturesPage.route}/:slug`
}

export default CulturesDetail