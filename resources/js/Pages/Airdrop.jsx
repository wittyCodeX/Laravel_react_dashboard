import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Airdrop({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout title={"Airdrop"}>
            <h1>Airdrop</h1>
        </AuthenticatedLayout>
    );
}
