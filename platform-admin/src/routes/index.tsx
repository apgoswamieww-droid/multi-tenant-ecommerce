import AuthLayouts from "@/layouts/AuthLayouts"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPassword"
import LoginPage from "@/pages/auth/LoginPage"
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage"
import { VerifyForgotOtpPage } from "@/pages/auth/VerifyForgotOtp"
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

        </Routes>
    )
}