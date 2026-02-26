"use client";

import { useState } from 'react';

export default function SearchForm() {
    const [dates, setDates] = useState('');
    const [guests, setGuests] = useState('2');

    const handleSearch = (e) => {
        e.preventDefault();
        // Construct Booking.com search URL as a functional fallback
        const bookingUrl = `https://www.booking.com/hotel/it/azzurra-apartment-mondello-casa-vacanza-a-due-passi-dal-mare.it.html?checkin=${dates.split(' - ')[0]}&checkout=${dates.split(' - ')[1]}&group_adults=${guests}`;
        window.open(bookingUrl, '_blank');
    };

    return (
        <div className="mt-8 w-full max-w-2xl rounded-2xl bg-white/95 dark:bg-slate-900/95 p-2 shadow-2xl backdrop-blur-sm border border-white/20">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch gap-2">
                <div className="flex flex-1 items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                    <div className="flex flex-col items-start w-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Check-in / Out</span>
                        <input
                            className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-400"
                            type="text"
                            placeholder="Seleziona date"
                            value={dates}
                            onChange={(e) => setDates(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                    <span className="material-symbols-outlined text-primary">group</span>
                    <div className="flex flex-col items-start w-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ospiti</span>
                        <select
                            className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 appearance-none"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        >
                            <option value="1">1 Persona</option>
                            <option value="2">2 Persone</option>
                            <option value="3">3 Persone</option>
                            <option value="4">4 Persone</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                    <span className="material-symbols-outlined">search</span>
                    <span>Prenota ora</span>
                </button>
            </form>
        </div>
    );
}
