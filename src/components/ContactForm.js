"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nome" required className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary text-sm" />
                <input type="email" placeholder="Email" required className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary text-sm" />
            </div>
            <textarea rows="4" placeholder="Come possiamo aiutarti?" required className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary text-sm"></textarea>
            <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                {sent ? (
                    <>
                        <span className="material-symbols-outlined">check_circle</span>
                        Messaggio Inviato!
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined">send</span>
                        Invia Richiesta
                    </>
                )}
            </button>
        </form>
    );
}
