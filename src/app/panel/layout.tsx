import { AppSidebar } from "@/components/appsidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <body>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
        
        </body>

    )
}