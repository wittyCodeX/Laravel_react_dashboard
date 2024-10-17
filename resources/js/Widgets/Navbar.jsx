import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import {
    Navbar,
    Typography,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";

import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";

import {
    useMaterialTailwindController,
    setOpenConfigurator,
    setOpenSidenav,
} from "@/Context";

export function DashboardNavbar({ title }) {
    const user = usePage().props.auth.user;
    const [controller, dispatch] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    return (
        <Navbar
            color={fixedNavbar ? "white" : "transparent"}
            className={`rounded-xl transition-all ${
                fixedNavbar
                    ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
                    : "px-0 py-1"
            }`}
            fullWidth
            blurred={fixedNavbar}
        >
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center  text-black">
                <div className="capitalize">
                    <Breadcrumbs
                        className={`bg-transparent p-0 transition-all ${
                            fixedNavbar ? "mt-1" : ""
                        }`}
                    >
                        <Link to={`/`}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                            >
                                Home
                            </Typography>
                        </Link>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {title}
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" color="blue-gray">
                        {title}
                    </Typography>
                </div>
                <div className="flex items-center">
                    <div className="mr-auto md:mr-4 md:w-56">
                        <Input label="Search" />
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="flex rounded-md">
                                <button
                                    type="button"
                                    className="hidden xl:flex rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    {user.name}

                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <IconButton
                                    variant="text"
                                    color="blue-gray"
                                    className="grid xl:hidden"
                                >
                                    <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                                </IconButton>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="w-max border-0">
                            <MenuItem className="flex items-center gap-3">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New message</strong> from Laur
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 13
                                        minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New album</strong> by Travis
                                        Scott
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 1
                                        day ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                                    <CreditCardIcon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        Payment successfully completed
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5" /> 2
                                        days ago
                                    </Typography>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setOpenConfigurator(dispatch, true)}
                    >
                        <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <Bars3Icon
                            strokeWidth={3}
                            className="h-6 w-6 text-blue-gray-500"
                        />
                    </IconButton>
                </div>
            </div>
        </Navbar>
    );
}

export default DashboardNavbar;
