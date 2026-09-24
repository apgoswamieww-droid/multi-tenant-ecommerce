import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { BarChart3Icon, CheckCircle2, GalleryVerticalEnd, LayoutDashboardIcon, LayoutGridIcon, MegaphoneIcon, Settings, ShieldCheckIcon, ShoppingBagIcon, Store, Truck, Users } from 'lucide-react'
import PlatformAdminLogo from "@/assets/logo.png"
import { NavLink, useLocation, useNavigate } from 'react-router'
import { cn } from 'cn'

const AppSidebar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const SIDEBAR_NAV = [
        { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboardIcon },
        { href: "/dashboard/sellers", label: "Sellers", Icon: Store },
        { href: "/dashboard/commision-payout", label: "Commisions", Icon: CheckCircle2 },
        { href: "/dashboard/global-catalog", label: "Global Catalog", Icon: LayoutGridIcon },
        { href: "/dashboard/delivery-network", label: "Delivery Network", Icon: Truck },
        { href: "/dashboard/customers", label: "Customers", Icon: Users },
        { href: "/dashboard/orders", label: "Orders", Icon: ShoppingBagIcon },
        { href: "/dashboard/support", label: "Supports", Icon: ShoppingBagIcon },
        { href: "/dashboard/marketing", label: "Marketing", Icon: MegaphoneIcon },
        { href: "/dashboard/reports", label: "Reports", Icon: BarChart3Icon },
        { href: "/dashboard/users-permissions", label: "User & Permissions", Icon: ShieldCheckIcon },
        { href: "/dashboard/settings", label: "Settings", Icon: Settings },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    {/* <SidebarMenuItem> */}
                    {/* <SidebarMenuButton size="lg" asChild className='p-2'> */}
                    <a href="#">
                        <div className="flex items-center gap-3">
                            <img src={PlatformAdminLogo} alt="Plartform Admin" className="size-10 rounded-xl shadow-lg shadow-black/20" />
                            <span className="text-base font-bold text-white">Platform Admin</span>
                        </div>

                    </a>
                    {/* </SidebarMenuButton> */}
                    {/* </SidebarMenuItem> */}
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                SIDEBAR_NAV.map((item, index) => {
                                    const isActive = item?.href === location.pathname;
                                    return (
                                        <SidebarMenuItem key={item?.href}>
                                            <SidebarMenuButton onClick={() => navigate(item.href)} className={cn(
                                                'text-white hover:bg-white/10 hover:text-white px-2 py-3 h-10 hover:cursor-pointer',
                                                isActive && 'bg-[#9fe870]/15 text-[#9fe870]'
                                            )}>

                                                <item.Icon className='size-4' />
                                                {item.label}

                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar