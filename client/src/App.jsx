import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { LineChart, History as HistoryIcon, Calculator as CalcIcon } from 'lucide-react';
import clsx from 'clsx';

function App() {
    const [activeTab, setActiveTab] = useState('calculator');

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="glass-card w-full max-w-4xl min-h-[600px] flex flex-col relative overflow-hidden">
                {/* Header/Nav */}
                <div className="flex items-center justify-between mb-8 z-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        SmartCalc
                    </h1>
                    <div className="flex gap-2 bg-black/20 p-1 rounded-xl backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('calculator')}
                            className={clsx(
                                "p-2 rounded-lg transition-all",
                                activeTab === 'calculator' ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <CalcIcon size={20} />
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={clsx(
                                "p-2 rounded-lg transition-all",
                                activeTab === 'history' ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <HistoryIcon size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 z-10">
                    {activeTab === 'calculator' && <Calculator />}
                    {activeTab === 'history' && (
                        <div className="text-center text-slate-400 mt-20">
                            History feature loading...
                        </div>
                    )}
                </div>

                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
            </div>
        </div>
    );
}

export default App;
