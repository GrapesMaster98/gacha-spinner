import React from "react";

export default function PanelLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <h1> Panel {children}</h1>
    )
}