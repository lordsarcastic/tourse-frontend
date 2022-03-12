import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "use-axios-client";
import { useErrorHook } from "../../hooks";
import { COUNTRIES_LIST } from "../../routes";
import { CountryType } from "../../types";

export const Country: FunctionComponent<CountryType> = ({
    id,
    name,
    description,
    slug,
    cover,
    gallery,
}) => {
    return (
        <Link to={`/countries/${slug}`} style={{backgroundImage: cover.image}} className="h-56">
            <p className="text-2xl bg-black text-white">{name}</p>
        </Link>
    )
}

export const CountryListing = () => {
    const { loading, data, error } = useAxios<any>(COUNTRIES_LIST);
    const _ = useErrorHook(error);

    return (
        <>
        {loading && <p className="text-7xl text-center text-green-500 font-bolder">Loading</p>}
        {!loading && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-x-8 gap-y-16">
            {data?.results.map((country: CountryType) => (
                <Country {...country} key={country.id} />
            ))}
        </div>}
        </>
    )
}