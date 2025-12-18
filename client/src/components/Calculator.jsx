import React, { useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');

    const handleInput = (val) => {
        setDisplay(prev => prev + val);
    };

    const clear = () => {
        setDisplay('');
        setResult('');
    };

    const calculate = async () => {
        try {
            const res = await axios.post('/api/calculate', { expression: display });
            setResult(String(res.data.result));
        } catch (err) {
            setResult('Error');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {/* Display */}
            <div className="bg-black/30 p-4 rounded-xl text-right mb-4 border border-white/5">
                <div className="text-slate-400 text-sm h-6">{result}</div>
                <input
                    type="text"
                    value={display}
                    onChange={(e) => setDisplay(e.target.value)}
                    className="bg-transparent text-3xl text-white w-full text-right focus:outline-none"
                    placeholder="0"
                />
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-3">
                {['C', '(', ')', '/'].map(btn => (
                    <button key={btn} onClick={() => btn === 'C' ? clear() : handleInput(btn)} className="btn-secondary text-cyan-400">{btn}</button>
                ))}
                {['7', '8', '9', '*'].map(btn => (
                    <button key={btn} onClick={() => handleInput(btn)} className="btn-secondary">{btn}</button>
                ))}
                {['4', '5', '6', '-'].map(btn => (
                    <button key={btn} onClick={() => handleInput(btn)} className="btn-secondary">{btn}</button>
                ))}
                {['1', '2', '3', '+'].map(btn => (
                    <button key={btn} onClick={() => handleInput(btn)} className="btn-secondary">{btn}</button>
                ))}
                <button onClick={() => handleInput('.')} className="btn-secondary">.</button>
                <button onClick={() => handleInput('0')} className="btn-secondary">0</button>
                <button
                    onClick={calculate}
                    className="btn-secondary bg-blue-600 hover:bg-blue-500 text-white col-span-2"
                >
                    =
                </button>
            </div>

            <div className="mt-4">
                <p className="text-xs text-slate-500 text-center">Try "5 plus 10" or "sqrt(16)"</p>
            </div>
        </div>
    );
};

export default Calculator;
