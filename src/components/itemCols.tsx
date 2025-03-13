'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Item = {
    id: number
    name: string
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Epic' | 'Legendary' | 'Mythic'
    rate: number
}

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'rarity',
        header: 'Rarity',
    },
    {
        accessorKey: 'rate',
        header: 'Rate',
    }
]