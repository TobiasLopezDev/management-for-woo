import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Authenticated({ user, children }) {
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            {children}
        </SidebarProvider>
    );
}
