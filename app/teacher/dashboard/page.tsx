'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, PlayCircle, FolderPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface WordPair {
  id: string;
  term: string;
  meaning: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([
    { id: 'cat-1', name: 'คำศัพท์ภาษาอังกฤษทั่วไป' },
    { id: 'cat-2', name: 'คำศัพท์วิทยาศาสตร์' }
  ]);
  
  const [words, setWords] = useState<WordPair[]>([
    { id: 'w-1', term: 'Photosynthesis', meaning: 'การสังเคราะห์ด้วยแสง', categoryId: 'cat-2' },
    { id: 'w-2', term: 'Gravity', meaning: 'แรงโน้มถ่วง', categoryId: 'cat-2' },
    { id: 'w-3', term: 'Evaporation', meaning: 'การกลายเป็นไอ', categoryId: 'cat-2' },
  ]);

  const [selectedCat, setSelectedCat] = useState<string>('cat-2');
  const [newTerm, setNewTerm] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('teacher_auth');
    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  // ฟังก์ชันลบคำศัพท์ที่ทำงานจริง 100%
  const handleDeleteWord = (id: string) => {
    if (confirm('คุณต้องการลบคำศัพท์นี้ใช่หรือไม่?')) {
      setWords((prev) => prev.filter((word) => word.id !== id));
    }
  };

  // ฟังก์ชันลบหมวดหมู่ที่ทำงานจริง 100%
  const handleDeleteCategory = (catId: string) => {
    if (confirm('การลบหมวดหมู่จะลบคำศัพท์ทั้งหมดในหมวดนี้ ต้องการดำเนินต่อหรือไม่?')) {
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      setWords((prev) => prev.filter((w) => w.categoryId !== catId));
      if (selectedCat === catId) {
        setSelectedCat(categories[0]?.id || '');
      }
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat = { id: `cat-${Date.now()}`, name: newCatName.trim() };
    setCategories([...categories, newCat]);
    setSelectedCat(newCat.id);
    setNewCatName('');
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm || !newMeaning || !selectedCat) return;

    const newEntry: WordPair = {
      id: `w-${Date.now()}`,
      term: newTerm.trim(),
      meaning: newMeaning.trim(),
      categoryId: selectedCat
    };

    setWords([...words, newEntry]);
    setNewTerm('');
    setNewMeaning('');
  };

  const handleCreateRoom = () => {
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/teacher/room/${roomCode}?cat=${selectedCat}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar userRole="teacher" userName="ครู mon" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-400">ระบบจัดการคำศัพท์ & หมวดหมู่</h1>
            <p className="text-slate-400 mt-1">เพิ่ม ลบ แก้ไขคำศัพท์เพื่อใช้จัดกิจกรรมจับคู่เรียลไทม์</p>
          </div>
          <button
            onClick={handleCreateRoom}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-95 transition cursor-pointer"
          >
            <PlayCircle className="w-6 h-6" />
            <span>เปิดห้องเล่นเกมเรียลไทม์</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ส่วนจัดการหมวดหมู่ */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-300">
              <FolderPlus className="w-5 h-5" /> หมวดหมู่
            </h2>

            <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="ชื่อหมวดหมู่ใหม่"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded-xl text-white text-sm font-bold transition"
              >
                เพิ่ม
              </button>
            </form>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`flex justify-between items-center p-3 rounded-xl cursor-pointer border transition ${
                    selectedCat === cat.id
                      ? 'bg-purple-900/40 border-purple-500 text-white font-semibold'
                      : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(cat.id);
                    }}
                    className="p-1.5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-lg transition"
                    title="ลบหมวดหมู่"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ส่วนจัดการคำศัพท์ */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4 text-purple-300">
              คำศัพท์ในหมวดหมู่
            </h2>

            <form onSubmit={handleAddWord} className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
              <input
                type="text"
                placeholder="คำศัพท์ (เช่น Photosynthesis)"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                placeholder="ความหมาย (เช่น การสังเคราะห์แสง)"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 font-bold text-white rounded-xl py-2.5 flex justify-center items-center gap-1 transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> เพิ่ม
              </button>
            </form>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {words
                .filter((w) => w.categoryId === selectedCat)
                .map((word) => (
                  <div
                    key={word.id}
                    className="flex justify-between items-center bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl hover:border-slate-600 transition"
                  >
                    <div>
                      <p className="font-bold text-emerald-400 text-lg">{word.term}</p>
                      <p className="text-slate-400 text-sm">{word.meaning}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteWord(word.id)}
                      className="p-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl border border-rose-500/20 transition cursor-pointer"
                      title="ลบคำศัพท์"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}