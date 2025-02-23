import React from "react";

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}