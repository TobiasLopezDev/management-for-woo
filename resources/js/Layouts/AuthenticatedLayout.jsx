import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";

export default function Authenticated({ user, children }) {
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            {children}
        </SidebarProvider>
    );
}
