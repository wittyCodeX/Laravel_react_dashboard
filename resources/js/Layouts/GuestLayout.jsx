import { Typography } from "@material-tailwind/react";

export default function Guest({ children }) {
    return (
        <div className="relative min-h-screen w-full">
            <section className="m-8 flex gap-4">
                <div className="w-full lg:w-3/5 mt-24">
                    <div className="text-center">
                        <Typography variant="h2" className="font-bold mb-4">
                            Sign In
                        </Typography>
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="text-lg font-normal"
                        >
                            Enter your email and password to Sign In.
                        </Typography>
                    </div>
                    {children}
                </div>
                <div className="w-2/5 h-full hidden lg:block">
                    <img
                        src="/img/pattern.png"
                        className="h-full w-full object-cover rounded-3xl"
                    />
                </div>
            </section>
        </div>
    );
}
