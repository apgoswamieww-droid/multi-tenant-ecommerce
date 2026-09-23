
import { useAppSelector } from '@/hooks/use-store'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {

 
  const user = useAppSelector(state=>state?.auth)
  
  return (
    <div>
        Platform Admin Panel
        {
          JSON.stringify(user)
        }
        <Outlet />

    </div>
  )
}
