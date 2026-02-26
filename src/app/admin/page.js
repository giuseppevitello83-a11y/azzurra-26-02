"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [content, setContent] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        } else if (session?.user?.role !== "admin") {
            router.push("/dashboard");
        } else {
            fetchData();
        }
    }, [status, session]);

    const fetchData = async () => {
        try {
            const [contentRes, bookingsRes] = await Promise.all([
                fetch("/api/content"),
                fetch("/api/bookings")
            ]);
            const contentData = await contentRes.json();
            const bookingsData = await bookingsRes.json();
            setContent(contentData);
            setBookings(bookingsData);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateHero = async (e) => {
        e.preventDefault();
        setMessage("Salvataggio in corso...");
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            if (res.ok) {
                setMessage("Contenuto aggiornato con successo!");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("Errore durante il salvataggio");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center italic">Caricamento...</div>;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <nav className="bg-white dark:bg-slate-800 border-b border-primary/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-2xl">settings</span>
                    <h1 className="text-xl font-bold">Pannello Admin</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-500">Bentornato, {session?.user?.name}</span>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm font-bold text-red-500 hover:underline">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Content Section */}
                <section className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">edit_note</span>
                            Gestione Homepage (Hero)
                        </h2>
                        <form onSubmit={handleUpdateHero} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Titolo Hero</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                    value={content?.hero?.title || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Sottotitolo Hero</label>
                                <textarea
                                    rows="3"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                                    value={content?.hero?.subtitle || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                />
                            </div>
                            <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                                Salva Modifiche
                            </button>
                            {message && <p className="text-sm italic text-primary mt-2">{message}</p>}
                        </form>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">list</span>
                            Ultime Prenotazioni
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-700">
                                        <th className="py-4 text-xs font-bold uppercase text-slate-400">ID</th>
                                        <th className="py-4 text-xs font-bold uppercase text-slate-400">Check-in</th>
                                        <th className="py-4 text-xs font-bold uppercase text-slate-400">Check-out</th>
                                        <th className="py-4 text-xs font-bold uppercase text-slate-400">Stato</th>
                                        <th className="py-4 text-xs font-bold uppercase text-slate-400">Totale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td className="py-4 font-mono text-xs">{booking.id}</td>
                                            <td className="py-4 text-sm">{booking.checkIn}</td>
                                            <td className="py-4 text-sm">{booking.checkOut}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${booking.status === 'Confermata' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="py-4 font-bold text-sm">€{booking.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <div className="bg-primary rounded-2xl p-8 text-white shadow-xl">
                        <h3 className="text-lg font-bold mb-4">Statistiche Rapide</h3>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs opacity-70 uppercase font-black">Prenotazioni Totali</p>
                                <p className="text-3xl font-black">{bookings.length}</p>
                            </div>
                            <div>
                                <p className="text-xs opacity-70 uppercase font-black">Entrate Totali</p>
                                <p className="text-3xl font-black">€{bookings.reduce((acc, b) => acc + parseFloat(b.total), 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
