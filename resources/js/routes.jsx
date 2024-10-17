import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "dashboard",
    },
    {
        icon: <InformationCircleIcon {...icon} />,
        name: "Projects",
        path: "projects",
    },
    {
        icon: <TableCellsIcon {...icon} />,
        name: "Plans",
        path: "plans",
    },
    {
        icon: <InformationCircleIcon {...icon} />,
        name: "Reports",
        path: "reports",
    },
    {
        icon: <InformationCircleIcon {...icon} />,
        name: "PaymentAddresses",
        path: "paymentaddress",
    },
    {
        icon: <InformationCircleIcon {...icon} />,
        name: "Adminpanel",
        path: "adminpanel",
    },
];

export default routes;
