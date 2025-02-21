import { supabase } from "@/app/lib/supa";
import { NextResponse } from "next/server";

export async function GET() {
    const {data, error} = await supabase.from('items').select('*'); //Get items from database

    if(error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json(data);
}