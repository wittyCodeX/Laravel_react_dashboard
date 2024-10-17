import React, { useEffect } from "react";
import {
    Typography,
    Card,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";

export default function EditPlan({
    open,
    handleOpen,
    plan,
    values,
    setValues,
}) {
    const submit = (e) => {
        e.preventDefault();
        console.log(values);
        router.post(route("update_plan"), values);
        handleOpen(false);
    };

    useEffect(() => {
        plan &&
            plan.id &&
            setValues({
                ...values,
                id: plan?.id,
                payments: plan?.payments,
                new_projects: plan?.new_projects,
                new_accounts: plan?.new_accounts,
                bids: plan?.bids,
                study: plan?.study,
            });
    }, [plan]);

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader>Add plan.</DialogHeader>
            <DialogBody>
                <Card color="transparent" shadow={false}>
                    <form className="w-full" onSubmit={submit}>
                        <div className="flex flex-col justify-between gap-2">
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
                                    type="number"
                                    value={values.payments}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            payments: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    New_projects
                                </Typography>
                                <Input
                                    name="test"
                                    type="number"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    value={values.new_projects}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            new_projects: e.target.value,
                                        })
                                    }
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
                                    type="number"
                                    value={values.bids}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            bids: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    New Accounts
                                </Typography>
                                <Input
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    type="number"
                                    value={values.new_accounts}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            new_accounts: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Study
                                </Typography>
                                <Input
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 min-w-[100px!important]"
                                    labelProps={{
                                        className:
                                            "before:content-none after:content-none",
                                    }}
                                    value={values.study}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            study: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex p-3 items-bottom">
                                <Button
                                    variant="gradient"
                                    color="red"
                                    onClick={() => handleOpen(null)}
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
                                    <span>Update</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </DialogBody>
        </Dialog>
    );
}
