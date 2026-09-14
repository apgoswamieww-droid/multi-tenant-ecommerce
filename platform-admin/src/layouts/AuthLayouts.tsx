import { Outlet } from "react-router";
import PlatformAdminLogo from "@/assets/logo.png"

export default function AuthLayouts() {
    return (
        <div className="flex min-h-svh">
            {/* Left side */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#06251A] to-[#10543A] p-12 lg:w-[440px] xl:w-[500px]">
                <div className="flex items-center gap-3">
                    <img src={PlatformAdminLogo} alt="Plartform Admin" className="size-12 rounded-xl shadow-lg shadow-black/20" />
                    <span className="text-base font-bold text-white">Platform Admin</span>
                </div>
                <div>
                    <h1 className="max-w-[380px] text-4xl font-bold leading-snug text-white">
                        Manage your store with ease.
                    </h1>
                    <p className="text-base text-white">Login to your account to get started.</p>
                </div>
                <p className="text-base text-white">&copy;2026 Excellent Web World PVT LTD. All rights reserved.</p>
            </div>
            {/* right side */}
            <div className="flex flex-1 items-center justify-center bg-background p-8">

                <Outlet />
            </div>
        </div>
    )
}