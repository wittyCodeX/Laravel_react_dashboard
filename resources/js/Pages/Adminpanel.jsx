import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Adminpanel({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout title={"Adminpanel"}>
            <h1>Adminpanel</h1>
        </AuthenticatedLayout>
    );
}
