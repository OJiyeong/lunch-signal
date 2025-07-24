'use client'

import CancelModal from "@/components/ui/CancelModal ";
import CreatePostModal from "@/components/ui/CreatePostModal";
import JoinModal from "@/components/ui/JoinModal";
import { useState } from "react";


type Card = {
  id: number;
  menu: string;
  max: number;
  current: number;
  names: string[];
};

const dummyCard: Card[] = [];

export default function Home() {

  const [cards, setCards] = useState(dummyCard);

  const createHandle = (menu: string, max: number, name: string) => {
    const newCard = {
      id: Date.now(),
      menu,
      max,
      current: 1, // 생성자 본인이 1명 참여
      names: [name],
    };
    setCards((prev) => [...prev, newCard]);
    console.log('새 점심 모임:', newCard);
    console.log(cards);

  };

  const joinHandle = (id: number, name: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id && card.current < card.max
          ? {
            ...card,
            current: card.current + 1,
            names: [...card.names, name],
          }
          : card
      )
    );
    console.log(`${name} 님이 id=${id} 모임에 참여함`);
  };

  const cancelHandle = (id: number, name: string): boolean => {
    const found = cards.find(card => card.id === id && card.names.includes(name));
    if (!found) return false;

    setCards(prev =>
      prev.map(card =>
        card.id === id
          ? {
            ...card,
            current: card.current - 1,
            names: card.names.filter(n => n !== name)
          }
          : card
      )
    );
    console.log(`${name} 님이 모임(id=${id})에서 취소함`);
    return true;
  };

  return (
    <main>
      <div>Home Page</div>
      <CreatePostModal onCreate={createHandle} />
      {cards.map((card) => (
        <div key={card.id} className="border p-4 mb-4 rounded">
          <p className="font-medium">🍱 메뉴: {card.menu}</p>
          <p className="text-sm text-gray-500">인원: {card.current}/{card.max}</p>

          {card.current >= card.max ? (
            <span className="text-red-600 font-bold">마감됨</span>
          ) : (
            <JoinModal
              menu={card.menu}
              count={card.current}
              maxCount={card.max}
              onJoin={(name) => joinHandle(card.id, name)}
            />
          )}

          <CancelModal
            menu={card.menu}
            onCancel={(name) => cancelHandle(card.id, name)} />

          <ul className="mt-2 text-sm text-gray-600">
            {card.names.map((n, idx) => (
              <li key={idx}>🙋 {n}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
