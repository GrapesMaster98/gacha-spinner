// app/api/items/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_PUBLIC_API!
);

// Obtener todos los ítems
const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Epic', 'Legendary', 'Mythic'];

export async function GET() {
  const { data, error } = await supabase
    .from("items")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Ordenamos los datos en el frontend
  const sortedData = data?.sort((a, b) => {
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  return NextResponse.json(sortedData);
}


// Eliminar un ítem
export async function DELETE(req: Request) {
  const { id } = await req.json(); // Extraer el ID del body

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// POST

export async function POST(req: Request) {
  try {
    const { name, rarity, rate} = await req.json();

    if(!name || !rarity || rate === undefined) {
      return NextResponse.json({error: 'Todos los campos son necesarios'}, {status: 400});
    }

    const { data, error } = await supabase.from('items').insert([{name, rarity, rate}]).select('*').single();

    if(error) {
      console.log(error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json(data, {status: 201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: 'Invalid request'}, {status: 400});
  }
}

export async function PATCH(req: Request) {
  const { id, name, rarity, rate } = await req.json();

  // Validación de los datos necesarios
  if (!id || !name || !rarity || rate === undefined) {
    return NextResponse.json({ error: "Todos los campos son necesarios" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("items")
    .update({ name, rarity, rate })  // Campos a actualizar
    .eq("id", id)  // Filtrar por el ID
    .select("*")  // Seleccionar los campos actualizados

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}