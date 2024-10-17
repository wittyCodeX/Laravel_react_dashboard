import React, { useState, useEffect } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { router } from "@inertiajs/react";

export default function AddPlan({ open, handleOpen, user, week }) {
    const convertDate = (date) => {
        let dt = new Date(date);

        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    };

    const [data, setData] = useState({
        payments: 0,
        bids: 0,
        new_projects: 0,
        new_accounts: 0,
        study: "",
        period_from: convertDate(week.firstDay),
        period_to: convertDate(week.lastDay),
        user_id: user.name,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route("add_plan"), data);
    };

    const handleChange = (e) => {
        const key = e.target.id;
        setData({
            ...data,
            [key]: e.target.value,
        });
    };
    return (
        <form className="w-full" onSubmit={submit}>
            <div className="flex lg:flex-row flex-col justify-between gap-2">
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Payments
                    </Typography>
                    <Input
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        id="payments"
                        value={data.payments}
                        onChange={handleChange}
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
                            className: "before:content-none after:content-none",
                        }}
                        id="new_projects"
                        value={data.new_projects}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Bids
                    </Typography>
                    <Input
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        id="bids"
                        value={data.bids}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <Typography variant="h6" color="blue-gray">
                        New Accounts
                    </Typography>
                    <Input
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        id="new_accounts"
                        value={data.new_accounts}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Study
                    </Typography>
                    <Input
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        id="study"
                        value={data.study}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex p-3 items-bottom">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1 mt-3"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        type="submit"
                        className="mr-1 mt-3"
                    >
                        <span>Save</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
