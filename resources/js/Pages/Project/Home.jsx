import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    Tabs,
    TabsHeader,
    Tab,
    Select,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
    Chip,
} from "@material-tailwind/react";
import moment from "moment";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link, router } from "@inertiajs/react";
import {
    HomeIcon,
    CheckIcon,
    EllipsisVerticalIcon,
    XMarkIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const convertDate = (date) => {
    let dt = new Date(date);
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()}`;
};

export default function Project() {
    const { projects: temp_projects, openCount, closeCount, finishCount } = usePage().props;
    const user = usePage().props.auth.user;
    const [dateFrom, setDateFrom] = useState(moment().subtract(15, "days"));
    const [dateTo, setDateTo] = useState(moment.now());
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);

    const [isOpenUpdate, setIsOpenUpdate] = useState();

    const [view, setView] = useState("All")

    useEffect(() => {
        setProjects(temp_projects);
    }, [temp_projects]);
    const [data, setData] = useState({
        type: "", project_name: "", your_role: "", your_name: "",
        your_country: "", client_name: "", client_country: "",
        budget: "", period: "", period_unit: "", start_date: "",
        got_from: "", project_status: ""
    });
    const [updata, setUpdata] = useState({
        type: "", project_name: "", your_name: "",
        client_name: "", client_country: "",
        budget: "", period: "", start_date: "",
        project_status: ""
    });

    const handleOpen = () => setOpen(!open);

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }
    function handleUpdata(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUpdata({ ...updata, [name]: value });
    }

    function updata_fun(value) {
        setIsOpenUpdate(value.id);
        setUpdata(value);
    }

    const saveProject = async (e) => {
        router.post(route("add_project"), {
            user_id: user.id,
            data: data
        }, {
            onSuccess: () => window.location.reload(),
            onError: (errors) => console.error('Validation failed:', errors),
        });

    }

    const updateProject = async (id) => {
        router.post(route("updata_project"), {
            id: id,
            user_id: user.id,
            data: updata
        }, {
            onSuccess: () => alert('Project updataed successfully!'),
            onError: (errors) => console.error('Validation failed:', errors),
        });
        setIsOpenUpdate("");

    }
    const deleteProject = async (id) => {
        router.post(route("delete_project"), {
            id: id,
        });
    }

    return (
        <>
            <AuthenticatedLayout title={"Projects"}>
                <div className="flex mt-8 h-87 w-full justify-center overflow-hidden rounded-xl">
                    <div className="md:w-2/3 w-full flex justify-center mb-3">
                        <Card className="flex md:flex-row flex-col items-center justify-between py-2 px-4 mb-2 h-full rounded-md w-full">
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-1"
                            >
                                My Projects:
                            </Typography>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Open:
                                <span className="mx-2 text-2xl text-blue-600">
                                    {openCount}
                                </span>
                            </Typography>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Finished:
                                <span className="mx-2 text-2xl text-green-600">
                                    {finishCount}
                                </span>
                            </Typography>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Closed:
                                <span className="mx-2 text-2xl text-red-600">
                                    {closeCount}
                                </span>
                            </Typography>
                        </Card>
                    </div>
                </div>
                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm min:h">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 flex items-center  lg:flex-row flex-col gap-1 justify-between p-6"
                    >
                        <div className="flex lg:flex-row flex-col items-center justify-between w-1/2">
                            <Typography
                                variant="h3"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Projects
                            </Typography>
                            <div className="flex items-center gap-2">
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label="From"
                                            onChange={() => null}
                                            value={
                                                dateFrom
                                                    ? format(dateFrom, "PPP")
                                                    : ""
                                            }
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={dateFrom}
                                            onSelect={setDateFrom}
                                            showOutsideDays
                                            className="border-0"
                                            classNames={{
                                                caption:
                                                    "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label:
                                                    "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous:
                                                    "absolute left-1.5",
                                                nav_button_next:
                                                    "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row:
                                                    "flex font-medium text-gray-900",
                                                head_cell:
                                                    "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today:
                                                    "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled:
                                                    "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label="To"
                                            onChange={() => null}
                                            value={
                                                dateTo
                                                    ? format(dateTo, "PPP")
                                                    : ""
                                            }
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={dateTo}
                                            onSelect={setDateTo}
                                            showOutsideDays
                                            className="border-0"
                                            classNames={{
                                                caption:
                                                    "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label:
                                                    "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous:
                                                    "absolute left-1.5",
                                                nav_button_next:
                                                    "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row:
                                                    "flex font-medium text-gray-900",
                                                head_cell:
                                                    "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today:
                                                    "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled:
                                                    "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                            components={{
                                                IconLeft: ({ ...props }) => (
                                                    <ChevronLeftIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                                IconRight: ({ ...props }) => (
                                                    <ChevronRightIcon
                                                        {...props}
                                                        className="h-4 w-4 stroke-2"
                                                    />
                                                ),
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-96">
                                <Tabs value="all">
                                    <TabsHeader>
                                        <Tab value="all" onClick={() => setView("All")}>
                                            <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                            All
                                        </Tab>
                                        <Tab value={"open_project"} onClick={() => setView("open")} >
                                            <ComputerDesktopIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                            Open
                                        </Tab>
                                        <Tab value={"finish_project"} onClick={() => setView("finished")}  >
                                            <CheckIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                            Finish
                                        </Tab>
                                        <Tab value={"close_project"} onClick={() => setView("closed")}>
                                            <XMarkIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                            Close
                                        </Tab>
                                    </TabsHeader>
                                </Tabs>
                            </div>
                            <Menu placement="left-start">
                                <MenuHandler>
                                    <IconButton
                                        variant="text"
                                        color="blue-gray"
                                    >
                                        <EllipsisVerticalIcon
                                            strokeWidth={3}
                                            fill="currenColor"
                                            className="h-6 w-6"
                                        />
                                    </IconButton>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem onClick={handleOpen}>
                                        Add New
                                    </MenuItem>
                                    <MenuItem>Show My projects</MenuItem>
                                    <MenuItem>Show All</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        "Type",
                                        "Project",
                                        "Your Name",
                                        "Client_name",
                                        "Client_country",
                                        "Budget",
                                        "Start Date",
                                        "Period",
                                        "Status",
                                        "Action",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                        >
                                            <Typography className="text-[11px] font-medium uppercase text-blue-gray-400">
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {projects.data && projects.data.map((value, key) => {
                                    if ((value.status == view || view == "All") && (value.start_date >= convertDate(dateFrom) && value.start_date <= convertDate(dateTo))) {
                                        const className = `py-3 px-4 ${key === projects.data.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;
                                        return (
                                            <>
                                                {
                                                    isOpenUpdate === value.id ? <tr key={key + value.project_name}>
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-full"
                                                                    type="text"
                                                                    name="type"
                                                                    onChange={handleUpdata}

                                                                    value={updata.type}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-xs font-medium text-blue-gray-600 ">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-full"
                                                                    type="text"
                                                                    name="project_name"
                                                                    onChange={handleUpdata}

                                                                    value={updata.project_name}
                                                                />
                                                            </div>
                                                        </td >
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-[90px]"
                                                                    type="text"
                                                                    name="your_name"
                                                                    onChange={handleUpdata}

                                                                    value={updata.your_name} />
                                                            </div>
                                                        </td>

                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-full"
                                                                    type="text"
                                                                    name="client_name"
                                                                    onChange={handleUpdata}

                                                                    value={updata.client_name} />
                                                            </div>
                                                        </td>
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-full"
                                                                    type="text"
                                                                    name="client_country"
                                                                    onChange={handleUpdata}

                                                                    value={updata.client_country} />
                                                            </div>
                                                        </td>
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-[90px]"
                                                                    type="text"
                                                                    name="budget"
                                                                    onChange={handleUpdata}

                                                                    value={updata.budget} />
                                                            </div>
                                                        </td>
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-[90px]"
                                                                    type="text"
                                                                    name="start_date"
                                                                    onChange={handleUpdata}

                                                                    value={updata.start_date} />
                                                            </div>
                                                        </td>
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit">
                                                                <input
                                                                    className=" rounded-md px-2 w-fit text-xs max-w-[90px]"
                                                                    type="text"
                                                                    name="period"
                                                                    onChange={handleUpdata}

                                                                    value={updata.period} />
                                                            </div>
                                                        </td >
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center w-fit max-w-[500px]" >
                                                                <Select size="sm" onChange={(e) => {
                                                                    const data = {
                                                                        target: {
                                                                            name: 'project_status',
                                                                            value: e
                                                                        }
                                                                    }
                                                                    //console.log(data);
                                                                    handleUpdata(data)
                                                                }}>
                                                                    <Option value="Open" name="type">
                                                                        Open
                                                                    </Option>
                                                                    <Option value="Finished" name="type">
                                                                        Finished
                                                                    </Option>
                                                                    <Option value="Closed" name="type">
                                                                        Closed
                                                                    </Option>
                                                                </Select>
                                                            </div >
                                                        </td >
                                                        <td className="text-xs font-medium text-blue-gray-600">
                                                            <div className="flex items-center gap-2" >
                                                                <Button size="sm" color="success" onClick={() => { updateProject(value.id) }}>Save</Button>
                                                                <Button size="sm" color="warn" onClick={() => { setIsOpenUpdate('') }}>Cancel</Button>
                                                            </div >
                                                        </td >

                                                    </tr > : <tr key={key + value.project_name}>
                                                        <td className={className}>
                                                            <div className="flex items-center gap-4">
                                                                <Typography
                                                                    color="blue-gray"
                                                                    className="font-bold"
                                                                >
                                                                    {value.type}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.project_name}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.your_name}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.client_name}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.client_country}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.budget}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.start_date}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            <Typography className="text-xs font-medium text-blue-gray-600">
                                                                {value.got_from}
                                                            </Typography>
                                                        </td>
                                                        <td className={className}>
                                                            {value.status === "open" ? (
                                                                <Chip
                                                                    color="blue"
                                                                    value="Working"
                                                                />
                                                            ) : value.status ===
                                                                "finished" ? (
                                                                <Chip
                                                                    color="green"
                                                                    value="Finished"
                                                                />
                                                            ) : (
                                                                <Chip
                                                                    color="red"
                                                                    value="Closed"
                                                                />
                                                            )}

                                                        </td>
                                                        <td className="py-3 pr-5">
                                                            {value.user_id === user.id && <>
                                                                <div className="flex items-center gap-1" >
                                                                    <Button size="sm" onClick={() => updata_fun(value)}>Updata</Button>
                                                                    <Button size="sm" onClick={() => deleteProject(value.id)} >Delete</Button>
                                                                </div >
                                                            </>
                                                            }
                                                        </td>
                                                    </tr>
                                                }
                                            </>

                                        );
                                    }

                                })}
                            </tbody >
                        </table >
                        {/* <div className="flex justify-center gap-4 mt-4">
                            {projects.links && projects.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`page-link bg-grey-200 p-2 rounded-2 ${link.active ? 'active' : ''}`}
                                    preserveScroll
                                    preserveState
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div> */}
                    </CardBody >
                </Card >
            </AuthenticatedLayout >
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add project.</DialogHeader>
                <DialogBody>
                    <Card color="transparent" shadow={false}>
                        <form className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Type
                                    </Typography>

                                    <Select size="md" onChange={(e) => {
                                        const data = {
                                            target: {
                                                name: 'type',
                                                value: e
                                            }
                                        }
                                        //console.log(data);
                                        handleInput(data)
                                    }}>
                                        <Option value="contract" name="type">
                                            Contract
                                        </Option>
                                        <Option value="full-time" name="type">
                                            Full-time
                                        </Option>
                                        <Option value="internship" name="type">
                                            Internship
                                        </Option>
                                        <Option value="project" name="type">Project</Option>
                                        <Option value="task" name="type">Task</Option>
                                    </Select>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        project_name
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="project_name"
                                        onChange={handleInput}
                                        value={data.project_name}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        your_name
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="your_name"
                                        onChange={handleInput}
                                        value={data.your_name}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        your_country
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="your_country"
                                        onChange={handleInput}
                                        value={data.your_country}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        client_name
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="client_name"
                                        onChange={handleInput}
                                        value={data.client_name}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        client_country
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="client_country"
                                        onChange={handleInput}
                                        value={data.client_country}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        budget
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="budget"
                                        onChange={handleInput}
                                        value={data.budget}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        period
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="period"
                                        onChange={handleInput}
                                        value={data.period}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        period_unit
                                    </Typography>

                                    <Select size="md" onChange={(e) => {
                                        const data = {
                                            target: {
                                                name: 'period_unit',
                                                value: e
                                            }
                                        }
                                        //console.log(data);
                                        handleInput(data)
                                    }}>
                                        <Option value="min" name="type">
                                            Min
                                        </Option>
                                        <Option value="hour" name="type">
                                            Hour
                                        </Option>
                                        <Option value="day" name="type">
                                            Day
                                        </Option>
                                        <Option value="month" name="type">Month</Option>
                                        <Option value="year" name="type">Year</Option>
                                    </Select>
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        start_date
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="start_date"
                                        onChange={handleInput}
                                        value={data.start_date}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        got_from
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                        type="text"
                                        name="got_from"
                                        onChange={handleInput}
                                        value={data.got_from}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Status
                                    </Typography>

                                    <Select size="md" onChange={(e) => {
                                        const data = {
                                            target: {
                                                name: 'project_status',
                                                value: e
                                            }
                                        }
                                        //console.log(data);
                                        handleInput(data)
                                    }}>
                                        <Option value="Open" name="type">
                                            Open
                                        </Option>
                                        <Option value="Finished" name="type">
                                            Finished
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    type="button"
                                    onClick={saveProject}
                                >
                                    <span>Save</span>
                                </Button>
                            </div>
                        </form>
                    </Card>
                </DialogBody>
            </Dialog>
        </>
    );
}
