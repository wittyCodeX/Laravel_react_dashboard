import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-2">
            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                <Typography
                    variant="small"
                    className="font-normal text-inherit"
                >
                    &copy; {year}, made with{" "}
                    <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" />{" "}
                    by{" "}
                    <a
                        href={route("dashboard")}
                        target="_blank"
                        className="transition-colors hover:text-blue-500 font-bold"
                    >
                        OxLanceLab
                    </a>{" "}
                    for a better web.
                </Typography>
                <ul className="flex items-center gap-4">
                    <li>
                        <Typography
                            as="a"
                            target="_blank"
                            variant="small"
                            className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                        >
                            OxLanceLab
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            target="_blank"
                            variant="small"
                            className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                        >
                            About us
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            target="_blank"
                            variant="small"
                            className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
                        >
                            Portfolio
                        </Typography>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
