
import AppSidebar from '@/components/AppSidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAppSelector } from '@/hooks/use-store'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {


  const user = useAppSelector(state => state?.auth)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation='vertical'
              className="mr-2 data-[orientation=vertical]:h-4 my-auto"
            />
          </header>
          <Outlet/>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
