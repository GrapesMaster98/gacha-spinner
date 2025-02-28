"use client";

import { FilePenLineIcon, Trash2Icon, PlusCircleIcon, CircleCheckIcon } from "lucide-react";
import { useState } from "react";
import { Item } from "@/components/itemCols";

interface TableProps {
  items: Item[];
}

export default function Table({ items }: TableProps) {
  const [data, setData] = useState(items);
  const [newItem, setNewItem] = useState<Item>({ id: 0, name: "", rarity: "Common", rate: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null); // Almacena el ID del ítem en edición

  const handleDelete = async (id: number) => {
    const res = await fetch("https://gachagame.vercel.app/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setData((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error("Error deleting item");
    }
  };

  const handleAdd = async () => {
    const res = await fetch("https://gachagame.vercel.app/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (res.ok) {
      const addedItem = await res.json();
      setData((prev) => [...prev, addedItem]);
      setShowForm(false);
    } else {
      console.error("Error adding item");
    }
  };

  const handleSave = async (id: number, updatedItem: Item) => {
    const res = await fetch("https://gachagame.vercel.app/api/items", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    if (res.ok) {
      const data = await res.json();
      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      setEditingItem(null); // Resetear el ítem editado
    } else {
      console.error("Error updating item");
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item.id); // Empezar la edición
  };

  const handleKeyUp = (e: React.KeyboardEvent, item: Item) => {
    if (e.key === "Enter") {
      handleSave(item.id, item); // Guardar al presionar Enter
    }
  };

  return (
    <div className="mt-20">
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded"
      >
        <PlusCircleIcon className="mr-2" /> Añadir
      </button>
      {showForm && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <input
            type="text"
            placeholder="Nombre"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="mr-2 p-1 border"
          />
          <input
            type="number"
            placeholder="Probabilidad"
            value={newItem.rate}
            onChange={(e) => setNewItem({ ...newItem, rate: Number(e.target.value) })}
            className="mr-2 p-1 border"
          />
          <select
            value={newItem.rarity}
            onChange={(e) => setNewItem({ ...newItem, rarity: e.target.value as "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" })}
            className="mr-2 p-1 border"
          >
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Epic">Epic</option>
            <option value="Legendary">Legendary</option>
          </select>
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-1 rounded">
            Añadir
          </button>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Rareza</th>
              <th className="px-6 py-3">Probabilidad</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="bg-white border-b text-center" key={item.id}>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {editingItem === item.id ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => setData(prev => prev.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))}
                      onKeyUp={(e) => handleKeyUp(e, item)}
                      className="p-1 border"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {editingItem === item.id ? (
                    <select
                      value={item.rarity}
                      onChange={(e) => setData(prev => prev.map(i => i.id === item.id ? { ...i, rarity: e.target.value as "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" } : i))}
                      className="p-1 border"
                    >
                      <option value="Common">Common</option>
                      <option value="Uncommon">Uncommon</option>
                      <option value="Rare">Rare</option>
                      <option value="Epic">Epic</option>
                      <option value="Legendary">Legendary</option>
                    </select>
                  ) : (
                    item.rarity
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {editingItem === item.id ? (
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => setData(prev => prev.map(i => i.id === item.id ? { ...i, rate: Number(e.target.value) } : i))}
                      onKeyUp={(e) => handleKeyUp(e, item)}
                      className="p-1 border"
                    />
                  ) : (
                    `${item.rate} %`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingItem === item.id ? (
                    <CircleCheckIcon
                      color="green"
                      className="cursor-pointer"
                      onClick={() => handleSave(item.id, item)}
                    />
                  ) : (
                    <FilePenLineIcon
                      color="blue"
                      className="cursor-pointer"
                      onClick={() => handleEdit(item)}
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <Trash2Icon
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
