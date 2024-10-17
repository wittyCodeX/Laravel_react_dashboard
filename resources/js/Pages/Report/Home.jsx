import React, { useState } from "react";
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
    Avatar,
    Tooltip,
    Progress,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Checkbox,
    Select,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { usePage } from "@inertiajs/react";

import {
    PlusIcon,
    HomeIcon,
    CalendarIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function Report() {
    const user = usePage().props.auth.user;
    const reports = usePage().props.reports;
    const [date, setDate] = useState();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <AuthenticatedLayout title={"Reports"}>
                <div className="relative mt-8 h-37 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
                    <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
                </div>
                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 flex items-center justify-between p-6"
                    >
                        <div className="flex items-center gap-2">
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Reports
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-50">
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label="Select date"
                                            onChange={() => null}
                                            value={
                                                date ? format(date, "PPP") : ""
                                            }
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
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
                            <div className="w-96">
                                <Tabs value="app">
                                    <TabsHeader>
                                        <Tab value="app">
                                            <CalendarIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                            Daily Report
                                        </Tab>
                                        <Tab value="message">
                                            <CurrencyDollarIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                            Payment Report
                                        </Tab>
                                    </TabsHeader>
                                </Tabs>
                            </div>
                            <Button
                                className="ml-auto flex gap-2"
                                onClick={handleOpen}
                            >
                                <PlusIcon className="h-4 w-4 stroke-2" />
                                Add
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        "Payments",
                                        "Bids",
                                        "New_projects",
                                        "Finished_projects",
                                        "Closed_projects",
                                        "Date",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((value, key) => {
                                    const className = `py-3 px-5 ${
                                        key === reports.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={name}>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.payments}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.bids}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.new_projects}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.finished_projects}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.failed_projects}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {value.date}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </AuthenticatedLayout>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Add report.</DialogHeader>
                <DialogBody>
                    <Card color="transparent" shadow={false}>
                        <form className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Payments
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Bids
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        New_projects
                                    </Typography>
                                    <Input
                                        name="test"
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Finished_projects
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Closed_projects
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6" color="blue-gray">
                                        Date
                                    </Typography>
                                    <Input
                                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                        labelProps={{
                                            className:
                                                "before:content-none after:content-none",
                                        }}
                                    />
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
                                    type="submit"
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
