import ProtectedRoutes from "@/components/ProtectedRoutes"
import AuthLayouts from "@/layouts/AuthLayouts"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { ForgotPasswordPage } from "@/pages/auth/ForgotPassword"
import LoginPage from "@/pages/auth/LoginPage"
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage"
import { VerifyForgotOtpPage } from "@/pages/auth/VerifyForgotOtp"
import CommisionPage from "@/pages/dashboard/commission/CommisionPage"
import CustomerPage from "@/pages/dashboard/customers/CustomerPage"
import { DashboardPage } from "@/pages/dashboard/DashboardPage"
import DeliveryNetworkPage from "@/pages/dashboard/delivery-network/DeliveryNetworkPage"
import GlobalCatalog from "@/pages/dashboard/global-catalog/GlobalCatalog"
import MarketingPage from "@/pages/dashboard/marketing/MarketingPage"
import OrderPage from "@/pages/dashboard/orders/OrderPage"
import ReportPage from "@/pages/dashboard/reports/ReportPage"
import SellerPage from "@/pages/dashboard/sellers/SellerPage"
import SettingPage from "@/pages/dashboard/settings/SettingPage"
import SupportPage from "@/pages/dashboard/support/SupportPage"
import UserPermissionPage from "@/pages/dashboard/users-permissions/UserPermissionPage"
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
                    <Route path="sellers" element={<SellerPage/>} />
                    <Route path="commision-payout" element={<CommisionPage/>} />
                    <Route path="global-catalog" element={<GlobalCatalog/>} />
                    <Route path="delivery-network" element={<DeliveryNetworkPage/>} />
                    <Route path="customers" element={<CustomerPage/>} />
                    <Route path="orders" element={<OrderPage/>} />
                    <Route path="support" element={<SupportPage/>} />
                    <Route path="marketing" element={<MarketingPage/>} />
                    <Route path="reports" element={<ReportPage/>} />
                    <Route path="users-permissions" element={<UserPermissionPage/>} />
                    <Route path="settings" element={<SettingPage/>} />
                </Route>
            </Route>

        </Routes>
    )
}