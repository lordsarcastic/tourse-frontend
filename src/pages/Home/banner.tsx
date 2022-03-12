import { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import { CONSTANTS } from "./constants"

export type MenuItemProps = {
    name: string,
    to: string
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ name, to }) => {
    return (
        <li className="inline-block mr-4">
            <Link to={to}>{name}</Link>
        </li>
    )
}
export const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute flex flex-col text-white w-full h-full py-8">
                <div className="flex justify-around">
                    {CONSTANTS.menu.map(item => (
                        <MenuItem key={item.name} name={item.name.toUpperCase()} to={item.to} />
                    ))}
                </div>
                <div className="flex flex-col gap-y-4 text-white md:left-48 justify-self-center self-center">
                    <h1 className="text-7xl font-bold">{CONSTANTS.title}</h1>
                    <h2 className="text-3xl font-semibold">{CONSTANTS.subtitle}</h2>
                </div>
            </div>
            <video autoPlay loop muted className="md:h-screen">
                <source src={CONSTANTS.videoPath} type="video/mp4" />
            </video>
        </div>
    )
}