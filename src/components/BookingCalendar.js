"use client";

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { it } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

export default function BookingCalendar() {
    const [bookedDates, setBookedDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCalendar() {
            try {
                const res = await fetch('/api/calendar');
                const events = await res.json();

                const dates = events.flatMap(event => {
                    const start = new Date(event.start);
                    const end = new Date(event.end);
                    const range = [];
                    let current = new Date(start);

                    while (current <= end) {
                        range.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                    }
                    return range;
                });

                setBookedDates(dates);
            } catch (error) {
                console.error("Failed to load calendar:", error);
            } finally {
                setLoading(false);
            }
        }
        loadCalendar();
    }, []);

    const modifiers = {
        booked: bookedDates,
    };

    const modifiersStyles = {
        booked: {
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            textDecoration: 'line-through',
            fontWeight: 'bold'
        }
    };

    if (loading) return <div className="p-8 text-center animate-pulse">Sincronizzazione calendario...</div>;

    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-primary/5">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event_available</span>
                Disponibilità in tempo reale
            </h3>
            <div className="calendar-wrapper scale-110 md:scale-125 my-8">
                <DayPicker
                    mode="multiple"
                    selected={bookedDates}
                    locale={it}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    className="dark:text-white"
                />
            </div>
            <div className="mt-6 flex gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></div>
                    <span>Disponibile</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
                    <span className="text-red-500">Occupato</span>
                </div>
            </div>
        </div>
    );
}
