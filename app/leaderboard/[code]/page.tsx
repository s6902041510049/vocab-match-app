'use client';

import Navbar from '@/components/Navbar';
import { Trophy, Medal, Star } from 'lucide-react';

export default function LeaderboardPage() {
  const top10 = [
    { rank: 1, name: 'น้องเจมส์', score: 1250 },
    { rank: 2, name: 'น้องฟ้า', score: 1100 },
    { rank: 3, name: 'น้องมิว', score: 980 },
    { rank: 4, name: 'น้องไอซ์', score: 850 },
    { rank: 5, name: 'น้องนนท์', score: 720 },
  ];

  const currentStudentRank = { rank: 2, name: 'น้องฟ้า', score: 1100 };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar userRole="student" userName={currentStudentRank.name} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 mb-3">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            สรุปผลคะแนน TOP 10
          </h1>
        </div>

        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-500/40 p-6 rounded-3xl mb-8 text-center shadow-xl">
          <p className="text-purple-300 font-semibold mb-1">ผลการแข่งขันของคุณบนมือถือ</p>
          <div className="text-3xl font-black text-emerald-400">
            อันดับที่ #{currentStudentRank.rank}
          </div>
          <p className="text-slate-300 text-sm mt-1">{currentStudentRank.score} คะแนน</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="space-y-3">
            {top10.map((item) => (
              <div
                key={item.rank}
                className={`flex justify-between items-center p-4 rounded-2xl border transition ${
                  item.rank === 1
                    ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-300 font-bold'
                    : item.rank === 2
                    ? 'bg-slate-300/10 border-slate-400/50 text-slate-200'
                    : item.rank === 3
                    ? 'bg-amber-700/10 border-amber-600/50 text-amber-400'
                    : 'bg-slate-800/40 border-slate-700/40 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-slate-800 border border-slate-700">
                    {item.rank <= 3 ? <Medal className="w-5 h-5" /> : item.rank}
                  </span>
                  <span className="text-lg font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 font-extrabold text-emerald-400 text-lg">
                  <Star className="w-4 h-4 fill-emerald-400" />
                  <span>{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}