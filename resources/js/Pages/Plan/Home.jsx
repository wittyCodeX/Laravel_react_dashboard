import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    Button,
} from "@material-tailwind/react";

import { usePage } from "@inertiajs/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { HonestWeekPicker } from "@/Components/HonestWeekPicker";
import moment from "moment";
import EditPlan from "./EditPlan";
import AddPlan from "./AddPlan";
import { toast } from "react-toastify";
import Login from "../Auth/Login";

export default function Plan() {
    const user = usePage().props.auth.user;
    const plans = usePage().props.plans;
    const { flash } = usePage().props;

    const [planData, setPlanData] = React.useState(plans);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [plan, setPlan] = React.useState();
    const handleOpen = () => setOpen(!open);
    const handleEditOpen = (plan) => {
        if (plan) {
            if (plan.user_id === user.name) {
                setPlan(plan);
                setEditOpen(!editOpen);
            }
        } else {
            setEditOpen(!editOpen);
        }
    };

    const [week, setWeek] = useState({ firstDay: moment() });

    const [values, setValues] = useState({
        id: " ",
        payments: 0,
        bids: 0,
        new_projects: 0,
        new_accounts: 0,
        study: "React",
    });

    const handleShowAll = () => {
        setPlanData(plans);
    };

    const onChange = (week) => {
        setWeek(week);
    };

    const convertDate = (date) => {
        let dt = new Date(date);
        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;

    };


    useEffect(() => {
        flash &&
            flash.message &&
            toast.success(flash.message, {
                position: "bottom-right",
            });
    }, [flash]);

    const isPeriodFrom = (plan, date) => {
        return plan.period_from === date;
    };
    const isPeriodTo = (plan, date) => {
        return plan.period_to === date;
    };
    useEffect(() => {
        if (plans && week) {
            const filtered = plans.filter((plan) => {
                return (
                    isPeriodFrom(plan, convertDate(week.firstDay)) &&
                    isPeriodTo(plan, convertDate(week.lastDay))
                );
            });

            setPlanData(filtered);
        }
    }, [week, plans]);

    return (
        <>
            <AuthenticatedLayout title={"Plans"}>
                <div className="flex justify-center items-center gap-4 mt-8 h-37 p-1 w-full bg-white rounded-2xl">
                    Select Week:
                    <HonestWeekPicker onChange={onChange} />
                    or
                    <Button
                        variant="text"
                        color="gray"
                        className="border gap-2"
                        onClick={handleShowAll}
                    >
                        Show All
                    </Button>
                </div>

                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 p-6"
                    >
                        <div className=" flex items-center justify-between">
                            <div>
                                <Typography
                                    variant="h4"
                                    color="blue-gray"
                                    className="mb-1"
                                >
                                    Plans
                                </Typography>
                            </div>
                            <div className="flex items-center">
                                <Button
                                    className="ml-auto flex gap-2"
                                    onClick={handleOpen}
                                >
                                    <PlusIcon className="h-4 w-4 stroke-2" />
                                    Add Pladddn
                                </Button>
                            </div>
                        </div>

                        <div className={open ? "block" : "hidden"}>
                            {open && (
                                <AddPlan
                                    open={open}
                                    handleOpen={handleOpen}
                                    user={user}
                                    week={week}
                                />
                            )}
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-fixed">
                            <thead>
                                <tr>
                                    {[
                                        "No",
                                        "Period",
                                        "User",
                                        "Payments",
                                        "Projects",
                                        "Bids",
                                        "Accounts",
                                        "Study",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                        >
                                            {el}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {planData.map((value, key) => {
                                    const className = `py-3 px-5 ${key === planData.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr
                                            key={key}
                                            onClick={() =>
                                                handleEditOpen(value)
                                            }
                                            className="cursor-pointer"
                                        >
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    className="text-xs font-medium text-blue-gray-600"
                                                >
                                                    {key + 1}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                {value.period_from}
                                                <br />
                                                {value.period_to}
                                            </td>
                                            <td className={className}>
                                                {value.user_id}
                                            </td>
                                            <td className={className}>
                                                {value.payments}
                                            </td>
                                            <td className={className}>
                                                {value.new_projects}
                                            </td>
                                            <td className={className}>
                                                {value.bids}
                                            </td>
                                            <td className={className}>
                                                {value.new_accounts}
                                            </td>
                                            <td className={className}>
                                                {value.study}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <EditPlan
                    open={editOpen}
                    handleOpen={handleEditOpen}
                    plan={plan}
                    values={values}
                    setValues={setValues}
                />
            </AuthenticatedLayout>
        </>
    );
}
