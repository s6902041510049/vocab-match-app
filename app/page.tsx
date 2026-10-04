'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, Users, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="text-center max-w-3xl mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 mb-6 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>ระบบเรียนรู้เรียลไทม์สำหรับห้องเรียนยุคใหม่</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          VOCAB MATCH REALTIME
        </h1>
        <p className="text-slate-400 text-lg md:text-xl">
          เกมจับคู่คำศัพท์สนุกๆ สำหรับนักเรียน พร้อมระบบคะแนนเรียลไทม์และหน้าสรุปผล Top 10
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl relative z-10">
        <div
          onClick={() => router.push('/student/join')}
          className="group bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">เข้าเล่นสำหรับนักเรียน</h2>
          <p className="text-slate-400 text-sm mb-6">ใส่รหัสห้อง 6 หลักเพื่อเข้าร่วมกิจกรรม</p>
          <div className="flex items-center gap-2 text-cyan-400 font-bold group-hover:translate-x-1 transition">
            <span>เข้าสู่ห้องกิจกรรม</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => router.push('/login')}
          className="group bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">สำหรับคุณครู</h2>
          <p className="text-slate-400 text-sm mb-6">จัดการคำศัพท์และสร้างห้องเกมเรียลไทม์</p>
          <div className="flex items-center gap-2 text-purple-400 font-bold group-hover:translate-x-1 transition">
            <span>เข้าสู่ระบบครู</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}