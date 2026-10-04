'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Hash, User, ArrowRight } from 'lucide-react';

export default function StudentJoinPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode || !studentName) return;

    localStorage.setItem('student_session', JSON.stringify({ roomCode, studentName }));
    router.push(`/student/room/${roomCode}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center px-6">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-cyan-400">เข้าร่วมกิจกรรมจับคู่</h1>
            <p className="text-slate-400 text-sm mt-1">กรอกรหัสห้องและชื่อของคุณเพื่อเริ่มเล่น</p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-1.5 block">รหัสห้อง (Room Code)</label>
              <div className="relative">
                <Hash className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="เช่น 123456"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-white text-lg font-bold tracking-wider focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 mb-1.5 block">ชื่อนักเรียน</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="ชื่อ หรือ ชื่อเล่น"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition active:scale-95 flex justify-center items-center gap-2 cursor-pointer mt-2"
            >
              <span>เข้าห้องกิจกรรม</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}