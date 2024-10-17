import { Link } from "@inertiajs/react";
import { useMaterialTailwindController } from "@/Context";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export function Sidebar({ title, routes }) {
    const [controller] = useMaterialTailwindController();
    const { sidenavType, openSidenav } = controller;
    const sidenavTypes = {
        dark: "bg-gradient-to-br from-gray-800 to-gray-900",
        white: "bg-white shadow-sm",
        transparent: "bg-transparent",
    };
    return (
        <aside
            className={`${sidenavTypes[sidenavType]} ${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
        >
            <ul className="mb-4 flex flex-col gap-1 cursor-pointer">
                <li className="mx-3.5 m-5 p-3 text-center font-bold text-xl">
                    <Link href={route("dashboard")}>OxLancerLab</Link>
                </li>
                {routes.map(({ icon, name, path }) => (
                    <li
                        className={
                            title === name
                                ? " bg-gray-900 mx-3.5 p-4 rounded-md text-white"
                                : "mx-3.5 p-4 hover:bg-red-600 focus:outline-none focus:ring focus:ring-violet-300 hover:rounded-md"
                        }
                        key={name}
                    >
                        <Link href={route(path)}>
                            <div className="flex">
                                {icon} &nbsp;&nbsp;&nbsp;
                                {name}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
