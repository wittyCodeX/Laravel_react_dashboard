import { useState } from "react";

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
    Alert,
} from "@material-tailwind/react";
import { usePage } from "@inertiajs/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function PaymentAddress() {
    const user = usePage().props.auth.user;
    const paymentAddress = usePage().props.paymentAddress;
    const paymentTypes = usePage().props.paymentTypes;
    const [copied, setCopied] = useState(false);

    return (
        <AuthenticatedLayout title={"PaymentAddresses"}>
            <div className="mt-12">
                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 flex items-center justify-between p-6"
                    >
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Payment Addresses
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="min-w-[640px] table-auto w-full">
                            <thead>
                                <tr>
                                    {["Address Type", "Address"].map((el) => (
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
                                {paymentAddress.map((value, key) => {
                                    const className = `py-3 px-5 ${
                                        key === paymentAddress.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={key}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar
                                                        src={value.img_url}
                                                        alt={name}
                                                        size="sm"
                                                    />
                                                    <Typography
                                                        variant="h5"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {
                                                            paymentTypes[
                                                                value.type - 1
                                                            ].type
                                                        }
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                {value.address && (
                                                    <Typography
                                                        variant="h5"
                                                        className="text-xl font-bold text-blue-gray-600 gap-2"
                                                    >
                                                        {value.address}

                                                        <CopyToClipboard
                                                            text={value.address}
                                                            onCopy={() => {
                                                                setCopied(true);
                                                                setTimeout(
                                                                    () => {
                                                                        setCopied(
                                                                            false
                                                                        );
                                                                    },
                                                                    2000
                                                                );
                                                            }}
                                                        >
                                                            <ClipboardDocumentIcon className="-mt-1 mr-2 ml-1 inline-block h-5 w-5" />
                                                        </CopyToClipboard>
                                                    </Typography>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <div className="w-96 fixed bottom-10 right-5">
                    {copied && (
                        <Alert color="green" icon={<Icon />}>
                            Address copied successfully.
                        </Alert>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
