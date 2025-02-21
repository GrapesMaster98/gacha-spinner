import { supabase } from "@/app/lib/supa";
import { NextResponse } from "next/server";

export async function POST() {
    const {data: items, error} = await supabase.from('items').select('*');

    if(error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    //Simulate pull
    const totalweight = items.reduce((sum, item) => sum + item.rate, 0);
    const randomvalue = Math.random() * totalweight;

    let cum = 0; // CUM AS IN CUMULATIVE, NOT... idk what I was thinking at the time
    let selecteditem = items[0]; //Fallback - this should NEVER happen, but it's here just in case I fuck something up.

    // Find the selected item based on the random value
    for(const item of items) {
        cum += item.rate;
        if(randomvalue <= cum) {
            selecteditem = item;
            break;
        }
    }

    return NextResponse.json(selecteditem);
}