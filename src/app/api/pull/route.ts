import { supabase } from "@/app/lib/supa";
import { NextResponse } from "next/server";

export async function POST() {
    const {data: items, error} = await supabase.from('items').select('*');

    if(error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    // Convertir los valores de rate de entero (0 a 100) a porcentaje (0.0 a 1.0)
    const totalweight = items.reduce((sum, item) => sum + item.rate / 100, 0); // Aquí dividimos rate entre 100
    const randomvalue = Math.random() * totalweight;

    let cum = 0; // Cumulative weight (acumulado... hehe CUM)
    let selecteditem = items[0]; //Fallback - this should NEVER happen, but it's here just in case I fuck something up.

    // Buscar el ítem seleccionado basado en el valor aleatorio
    for(const item of items) {
        cum += item.rate / 100; // Convertir rate a porcentaje (dividiendo entre 100)
        
        if(randomvalue <= cum) {
            selecteditem = item;
            break;
        }
    }

    return NextResponse.json(selecteditem);
}
