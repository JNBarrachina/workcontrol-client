
import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader'
import { DashboardAdminContent } from '../../organisms/DashboardAdminContent/DashboardAdminContent'

export const AdminArea = ({ mainContent }) => {
    return (
        <>
            <DashboardHeader />
            <DashboardAdminContent mainContent={mainContent} />
        </>
    )
}
