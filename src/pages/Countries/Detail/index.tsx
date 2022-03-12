import { useParams } from "react-router-dom"
import { useAxios } from "use-axios-client";
import CountriesPage from ".."
import { useErrorHook } from "../../../hooks";
import { COUNTRIES_LIST } from "../../../routes";
import { CountryType, Page } from "../../../types"
import { Country } from "../listings";

const Main = () => {
    const { slug } = useParams<string>();
    const { loading, error, data } = useAxios<CountryType>(`${COUNTRIES_LIST}${slug}`);
    const _ = useErrorHook(error);

    return (
        <>
            {loading && <p className="text-7xl text-center text-green-500 font-bolder">Loading</p>}
            {data && <Country {...data} />}
        </>
    )
}

const CountriesDetail: Page = {
    Component: Main,
    route: `${CountriesPage.route}/:slug`
}

export default CountriesDetail