"use client";

export const dynamic = "force-dynamic";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        } else if (session?.user?.role === "admin") {
            router.push("/admin");
        } else if (status === "authenticated") {
            fetchBookings();
        }
    }, [status, session]);

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/bookings");
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center italic">Caricamento...</div>;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <nav className="bg-white dark:bg-slate-800 border-b border-primary/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-2xl">person</span>
                    <h1 className="text-xl font-bold">Area Ospiti</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500">Ciao, {session?.user?.name}</span>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm font-bold text-red-500 hover:underline">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5 max-w-4xl">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">calendar_today</span>
                        Le Tue Prenotazioni
                    </h2>

                    {bookings.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500 italic mb-6">Non hai ancora effettuato prenotazioni.</p>
                            <a href="/" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
                                Scopri le Ville
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg">{booking.property}</h3>
                                            <p className="text-xs text-slate-500 font-mono italic">#{booking.id}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${booking.status === 'Confermata' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Check-in</span>
                                            <span className="font-bold">{booking.checkIn}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Check-out</span>
                                            <span className="font-bold">{booking.checkOut}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-slate-500 text-sm">Totale pagato</span>
                                        <span className="text-lg font-black text-primary">€{booking.total}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
