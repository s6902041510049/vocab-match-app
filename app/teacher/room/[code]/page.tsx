'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Users, Play, Copy, Check } from 'lucide-react';

export default function TeacherRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomCode = params.code as string;
  const [copied, setCopied] = useState(false);

  // สมมติฐานข้อมูลนักเรียนที่เข้ามาในห้องแบบเรียลไทม์
  const [students, setStudents] = useState<string[]>([
    'น้องเจมส์',
    'น้องฟ้า',
    'น้องมิว',
    'น้องไอซ์'
  ]);

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartGame = () => {
    // ในระบบจริงจะยิง Pusher/Supabase Trigger Event 'start_game'
    router.push(`/leaderboard/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar userRole="teacher" userName="ครู mon" />

      <main className="max-w-4xl mx-auto px-6 py-10 text-center">
        <div className="bg-slate-900 border border-purple-500/30 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <p className="text-purple-300 font-semibold mb-2">รหัสเข้าร่วมห้องกิจกรรม (Room Code)</p>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-6xl font-black tracking-widest text-emerald-400 bg-slate-950 px-8 py-4 rounded-2xl border border-emerald-500/30">
              {roomCode}
            </span>
            <button
              onClick={copyCode}
              className="p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-300 transition"
              title="คัดลอกรหัส"
            >
              {copied ? <Check className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-slate-400 text-sm">ให้นักเรียนเข้าเว็บแล้วกรอกรหัส 6 หลักนี้</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
              <Users className="w-5 h-5" /> รายชื่อนักเรียนที่เข้าร่วม ({students.length} คน)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {students.map((student, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl text-center font-semibold text-slate-200 animate-fade-in"
              >
                {student}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartGame}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xl px-12 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6 fill-slate-950" />
          <span>เริ่มกิจกรรมกิจกรรมการแข่งขัน</span>
        </button>
      </main>
    </div>
  );
}