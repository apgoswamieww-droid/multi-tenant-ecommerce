import ProtectedRoutes from "@/components/ProtectedRoutes"
import AuthLayouts from "@/layouts/AuthLayouts"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPassword"
import LoginPage from "@/pages/auth/LoginPage"
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage"
import { VerifyForgotOtpPage } from "@/pages/auth/VerifyForgotOtp"
import { DashboardPage } from "@/pages/dashboard/DashboardPage"
import { Route, Routes } from "react-router"

export default function Routers() {
    return (
        <Routes>
            {/* Auth Section Routes */}
            <Route element={<AuthLayouts />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<VerifyForgotOtpPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* After Login Pages Routes here */}
            <Route element={<ProtectedRoutes/>}>
                <Route path="dashboard" element={<DashboardLayout/>}>
                    <Route index element={<DashboardPage/>} />
                </Route>
            </Route>

        </Routes>
    )
}