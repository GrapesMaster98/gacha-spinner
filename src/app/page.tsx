'use client';

import { useEffect, useState } from "react";
import ConfettiBoom from "react-confetti-boom";

export default function Home() {  
  const [items, setItems] = useState<{ id: number; name: string; rarity: string }[]>([]); // Array of items from database
  const [pulledItem, setPulledItem] = useState<{ id: number; name: string; rarity: string } | null>(null); // Selected item
  const [loading, setLoading] = useState(false); // Loading state
  const [showConfetti, setShowConfetti] = useState(false); // Show confetti when legendary item is pulled

  // Fetch items from database on mount and update state
  useEffect(() => {
    const FetchItems = async () => {
      const res = await fetch('/api/items');
      const data = await res.json();
      setItems(data);
    };

    FetchItems();
  }, []);

  // Handle Gacha pulls
  const PullItem = async () => {
    setLoading(true);
    const res = await fetch('/api/pull', { method: 'POST' });
    const data = await res.json();
    setPulledItem(data);
    setLoading(false);

    // If the item is legendary, trigger confetti
    if (data.rarity === "Legendary") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🎰 Gacha Simulator</h1>

      {items.length > 0 && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Available Items:</h2>
          <ul className="list-disc pl-6">
            {items.map((item) => (
              <li
                key={item.id}
                className={`font-semibold ${item.rarity === "Legendary" ? "text-yellow-500" : "text-gray-400"}`}
              >
                {item.name} ({item.rarity})
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <button
        onClick={PullItem}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg mb-4"
      >
        {loading ? "Pulling..." : "Pull an Item"}
      </button>

      {pulledItem && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg text-center">
          <h2 className="text-xl font-bold">✨ You Got: {pulledItem.name} ✨</h2>
          <p className={`text-lg font-semibold ${pulledItem.rarity === "Legendary" ? "text-yellow-500" : "text-gray-400"}`}>
            Rarity: {pulledItem.rarity}
          </p>
        </div>
      )}

      {/* Confetti Effect */}
      {showConfetti && <ConfettiBoom />}
    </main>
  );
}
