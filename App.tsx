import React, { useState, useEffect } from 'react';
import StickVisualizer from './components/StickVisualizer';
import DataTable from './components/DataTable';
import AiTutor from './components/AiTutor';
import { Calculator, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, BookOpen, Lightbulb, GraduationCap } from 'lucide-react';

export default function App() {
  const [triangleCount, setTriangleCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [taskTwoInput, setTaskTwoInput] = useState<string>('');
  const [taskTwoResult, setTaskTwoResult] = useState<string | null>(null);

  // Animation logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setTriangleCount(prev => {
          if (prev >= 10) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200); // Speed of animation steps
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying && triangleCount >= 10) {
      setTriangleCount(1);
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setTriangleCount(1);
  };

  const stepForward = () => {
    setIsPlaying(false);
    if (triangleCount < 20) setTriangleCount(c => c + 1);
  };

  const stepBackward = () => {
    setIsPlaying(false);
    if (triangleCount > 1) setTriangleCount(c => c - 1);
  };

  const handleTaskTwoCheck = () => {
    const sticks = parseInt(taskTwoInput);
    if (isNaN(sticks)) {
      setTaskTwoResult("请输入一个数字");
      return;
    }
    // Logic: Sticks = 2n + 1 => n = (Sticks - 1) / 2
    const n = (sticks - 1) / 2;
    if (Number.isInteger(n) && n > 0) {
      setTaskTwoResult(`✅ 太棒了！一共摆了 ${n} 个三角形。`);
      setTriangleCount(n > 20 ? 20 : n); // Limit visualizer to 20 to avoid lag
    } else {
      setTaskTwoResult("❌ 这个数量好像不对哦，没法摆成完整的三角形。");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-2 rounded-lg shadow-sm">
               <Calculator size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
              探究任务学习单：火柴棒三角形
            </h1>
          </div>
          {/* Right side controls removed as requested */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        
        {/* Intro Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 items-start">
           <div className="bg-indigo-50 p-3 rounded-full shrink-0">
             <BookOpen className="text-indigo-600" size={24}/>
           </div>
           <div>
             <h2 className="text-lg font-bold text-slate-800 mb-2">任务情境</h2>
             <p className="text-slate-600 leading-relaxed">
               亲爱的同学们，让我们和大数学家毕达哥拉斯来一场数学探秘之旅吧！
               下方是动态演示区，请观察三角形数量增加时，小棒根数是如何变化的。
               点击<strong>“播放动画”</strong>，自动完成学习单的填写过程。
             </p>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Visualization (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visualizer Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                  任务一：动手摆一摆
                </h3>
                <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold font-mono">
                  n = {triangleCount}
                </div>
              </div>
              
              <div className="p-6">
                <StickVisualizer count={triangleCount} />
              </div>

              {/* Controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={togglePlay}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
                      isPlaying 
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    {isPlaying ? '暂停演示' : '播放演示'}
                  </button>

                  <button 
                    onClick={reset}
                    className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
                    title="重置"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-slate-200">
                  <button 
                    onClick={stepBackward} 
                    disabled={triangleCount <= 1}
                    className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-sm font-medium text-slate-400 w-20 text-center select-none">
                    手动步进
                  </span>
                  <button 
                    onClick={stepForward}
                    disabled={triangleCount >= 20}
                    className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Task 2 Solver */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2 mb-4">
                <Lightbulb className="text-amber-500" size={18}/>
                任务二：逆向思维挑战
              </h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                毕达哥拉斯接着摆下去，一共用了 <strong className="text-indigo-600 text-lg">37</strong> 根小棒。
                你能算出他摆了多少个三角形吗？
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input 
                    type="number" 
                    placeholder="输入小棒总数..." 
                    value={taskTwoInput}
                    onChange={(e) => setTaskTwoInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTaskTwoCheck()}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
                  />
                  <div className="absolute right-3 top-3.5 text-slate-400 text-sm">根</div>
                </div>
                <button 
                  onClick={handleTaskTwoCheck}
                  className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-900 font-medium shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5"
                >
                  验证答案
                </button>
              </div>
              {taskTwoResult && (
                <div className={`mt-4 p-4 rounded-xl text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${taskTwoResult.includes('✅') ? 'bg-green-50 border border-green-100 text-green-800' : 'bg-red-50 border border-red-100 text-red-800'}`}>
                  {taskTwoResult}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Table & Analysis (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* AI Tutor */}
            <AiTutor />
            
            {/* Dynamic Table */}
            <DataTable currentCount={triangleCount} />

            {/* Analysis Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap size={100} />
              </div>
              
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-indigo-400/30 pb-3">
                <Lightbulb size={20} className="text-amber-300"/>
                解析动画思路
              </h3>
              
              <div className="space-y-4 text-sm relative z-10">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="font-semibold text-indigo-100 mb-1">1. 找起点</p>
                  <p>摆第 1 个三角形，需要 <span className="font-bold text-amber-300 text-base">3</span> 根小棒。</p>
                </div>
                
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="font-semibold text-indigo-100 mb-1">2. 找规律 (核心)</p>
                  <p>每增加 1 个三角形，因为共用了一条边，所以只需要增加 <span className="font-bold text-amber-300 text-base">2</span> 根小棒。</p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="font-semibold text-indigo-100 mb-1">3. 得公式</p>
                  <div className="font-mono text-center my-2 bg-black/20 p-2 rounded-lg text-amber-300">
                    小棒数 = 3 + 2 × (n - 1)
                  </div>
                  <p className="opacity-90">也就是：<span className="font-mono font-bold">小棒数 = 2n + 1</span></p>
                </div>

                <div className="mt-4 pt-4 border-t border-indigo-400/30">
                   <p className="mb-2 font-semibold text-indigo-100">💡 任务一解答 (n=10)</p>
                   <p>2 × 10 + 1 = <span className="font-bold text-amber-300">21</span> 根</p>
                </div>

                 <div>
                   <p className="mb-2 font-semibold text-indigo-100">💡 任务二解答 (Total=37)</p>
                   <p>2n + 1 = 37  ⇒  2n = 36  ⇒  n = <span className="font-bold text-amber-300">18</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}