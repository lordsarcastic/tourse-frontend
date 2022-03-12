import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "use-axios-client";
import DestinationsPage from ".";
import { useErrorHook } from "../../hooks";
import { DESTINATIONS_LIST } from "../../routes";
import { DestinationType } from "../../types";

export const Destination: FunctionComponent<DestinationType> = ({
    id,
    name,
    description,
    slug,
    zone,
    gallery,
}) => {
    return (
        <Link to={`${DestinationsPage.route}/${slug}`} style={{backgroundImage: gallery.photos[0].image}} className="h-56">
            <p className="text-2xl bg-black text-white">{name}</p>
        </Link>
    )
}

export const CultureListing = () => {
    const { loading, data, error } = useAxios<any>(DESTINATIONS_LIST);
    const _ = useErrorHook(error);

    return (
        <>
        {loading && <p className="text-7xl text-center text-green-500 font-bolder">Loading</p>}
        {!loading && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-x-8 gap-y-16">
            {data?.results.map((destination: DestinationType) => (
                <Destination {...destination} key={destination.id} />
            ))}
        </div>}
        </>
    )
}