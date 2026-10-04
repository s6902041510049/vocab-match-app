'use client';

import { useRouter } from 'next/navigation';
import { LogOut, UserCheck, Sparkles } from 'lucide-react';

export default function Navbar({ userRole, userName }: { userRole?: 'teacher' | 'student'; userName?: string }) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('teacher_auth');
      localStorage.removeItem('student_session');
      sessionStorage.clear();
    }
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 px-6 py-4 flex justify-between items-center text-white sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
        <Sparkles className="w-6 h-6 text-purple-400" />
        <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          VOCAB MATCH ⚡
        </span>
      </div>

      {userRole && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-sm">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium text-slate-200">{userName || (userRole === 'teacher' ? 'ครู mon' : 'นักเรียน')}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      )}
    </nav>
  );
}