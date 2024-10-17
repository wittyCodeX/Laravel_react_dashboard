import Sidebar from "@/Widgets/Sidebar";
import DashboardNavbar from "@/Widgets/Navbar";
import Footer from "@/Widgets/Footer";
import Configurator from "@/Widgets/Configurator";
import { usePage } from "@inertiajs/react";
import routes from "@/routes";
export default function Authenticated({ title, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidebar title={title} routes={routes} />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar title={title} />
                <Configurator />
                {children}
                <div className="text-blue-gray-600">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
