'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Lock, User, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'mon' && password === '1234') {
      localStorage.setItem('teacher_auth', 'true');
      router.push('/teacher/dashboard');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (user: mon / pass: 1234)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center px-6">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">เข้าสู่ระบบสำหรับครู</h1>
            <p className="text-slate-400 text-sm mt-1">กรอกข้อมูลเพื่อจัดการคำศัพท์และห้องเรียน</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Username</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="mon"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-300 mb-1.5 block">Password</label>
              <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-600/25 transition active:scale-95 mt-2 cursor-pointer"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}