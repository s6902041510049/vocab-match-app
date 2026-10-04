'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Sparkles, Loader2, Trophy } from 'lucide-react';

interface CardItem {
  id: string;
  text: string;
  pairId: string;
  type: 'term' | 'meaning';
}

export default function StudentRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = params.code as string;

  const [studentName, setStudentName] = useState('นักเรียน');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [myRank, setMyRank] = useState(1);

  const [cards, setCards] = useState<CardItem[]>([
    { id: 'c1', text: 'Photosynthesis', pairId: 'p1', type: 'term' },
    { id: 'c2', text: 'การสังเคราะห์แสง', pairId: 'p1', type: 'meaning' },
    { id: 'c3', text: 'Gravity', pairId: 'p2', type: 'term' },
    { id: 'c4', text: 'แรงโน้มถ่วง', pairId: 'p2', type: 'meaning' },
  ]);

  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  useEffect(() => {
    const session = localStorage.getItem('student_session');
    if (session) {
      const parsed = JSON.parse(session);
      setStudentName(parsed.studentName || 'นักเรียน');
    }
  }, []);

  const handleSelectCard = (card: CardItem) => {
    if (selectedCards.length === 2 || matchedPairs.includes(card.pairId)) return;
    if (selectedCards.some((c) => c.id === card.id)) return;

    const updated = [...selectedCards, card];
    setSelectedCards(updated);

    if (updated.length === 2) {
      if (updated[0].pairId === updated[1].pairId) {
        setMatchedPairs((prev) => [...prev, updated[0].pairId]);
        setScore((prev) => prev + 100);
        setSelectedCards([]);

        if (matchedPairs.length + 1 === cards.length / 2) {
          setTimeout(() => {
            router.push(`/leaderboard/${roomCode}`);
          }, 1500);
        }
      } else {
        setTimeout(() => setSelectedCards([]), 800);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar userRole="student" userName={studentName} />

      <main className="flex-1 max-w-2xl mx-auto px-6 py-6 w-full flex flex-col justify-center">
        {!isPlaying ? (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">หน้ารอนักเรียนเข้าห้อง {roomCode}</h1>
            <p className="text-slate-400 text-sm mb-6">กรุณารอคุณครูกดเริ่มกิจกรรมระบบจับคู่...</p>
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 py-3 rounded-2xl transition cursor-pointer"
            >
              ทดสอบเริ่มเล่นเกม
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6">
              <div>
                <span className="text-xs text-slate-400 block">คะแนนสะสม</span>
                <span className="text-2xl font-black text-emerald-400">{score} แต้ม</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-xl text-purple-300">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-sm">อันดับปัจจุบัน: #{myRank}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cards.map((card) => {
                const isMatched = matchedPairs.includes(card.pairId);
                const isSelected = selectedCards.some((c) => c.id === card.id);

                return (
                  <button
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    disabled={isMatched}
                    className={`h-28 p-4 rounded-2xl font-bold text-center flex justify-center items-center border transition-all duration-200 active:scale-95 ${
                      isMatched
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30 scale-105'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    {card.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}