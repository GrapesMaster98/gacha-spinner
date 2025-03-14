import Table from "@/components/dash/table";
import { Item } from "@/components/itemCols";

async function GetData(): Promise<Item[]> {
    const res = await fetch("https://gachagame.vercel.app/api/items", { cache: "no-store" }); 
    const data = await res.json();
    return data;
}

export default async function Page() {
    const data = await GetData();

    return (
        <div className="flex mx-auto flex-col">
            <h1 className="mt-5 font-bold text-xl">Gacha Data Table</h1>
            <p>Añade y edita valores de los items aquí. Los valores pueden ser númros <strong>enteros</strong> o <strong>decimales</strong>.</p>

            <Table items={data}/>
        </div>
    )
}