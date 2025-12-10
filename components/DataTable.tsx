import React from 'react';

interface DataTableProps {
  currentCount: number;
}

const DataTable: React.FC<DataTableProps> = ({ currentCount }) => {
  // Worksheet asks for 10 rows typically
  const totalRows = 10;
  const rows = [];

  for (let i = 1; i <= totalRows; i++) {
    const isRevealed = i <= currentCount;
    const sticks = 3 + (i - 1) * 2;
    // Highlight the row if it's the current one being added
    const isActive = i === currentCount;
    
    rows.push(
      <tr key={i} className={`border-b transition-colors duration-300 ${isActive ? 'bg-amber-50' : 'hover:bg-slate-50'}`}>
        <td className="p-3 text-center border-r font-medium text-slate-700">{i}</td>
        <td className="p-3 text-center border-r text-slate-500 text-sm h-12">
           {isRevealed ? (
             <span className="opacity-100 transition-opacity duration-500">
                {i === 1 ? '△' : i === 2 ? '△▽' : i===3 ? '△▽△' : '...'}
             </span>
           ) : (
             <span className="opacity-0">...</span>
           )}
        </td>
        <td className="p-3 text-center border-r font-bold text-amber-600 h-12">
          {isRevealed ? sticks : ''}
        </td>
        <td className="p-3 text-left text-slate-600 text-sm h-12 pl-4">
          {isRevealed ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-500">
                <span className="font-mono bg-slate-100 px-1 rounded text-xs text-slate-500">3 + 2×{i-1}</span>
                <span className="text-slate-400">=</span>
                <span className="font-mono bg-amber-100 px-1 rounded text-amber-800 font-bold">{1 + 2*i}</span>
            </div>
          ) : ''}
        </td>
      </tr>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm bg-white">
      <div className="p-3 bg-indigo-50 border-b border-indigo-100 text-indigo-900 font-bold text-center">
        探究任务学习单：填一填
      </div>
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-700 font-semibold">
          <tr>
            <th className="p-3 border-r border-b text-center w-20">三角形个数</th>
            <th className="p-3 border-r border-b text-center w-24">形状</th>
            <th className="p-3 border-r border-b text-center w-24">小棒根数</th>
            <th className="p-3 border-b text-left pl-4">小棒根数与三角形个数之间的关系</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;