"use client";

export const dynamic = "force-dynamic";

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

    const handleSaveContent = async (e) => {
        if (e) e.preventDefault();
        setMessage("Salvataggio in corso...");
        try {
            const res = await fetch("/api/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content),
            });
            if (res.ok) {
                setMessage("Tutte le modifiche salvate con successo!");
                setTimeout(() => setMessage(""), 3000);
            }
        } catch (err) {
            setMessage("Errore durante il salvataggio");
        }
    };

    const updateService = (id, field, value) => {
        const newServices = content.services.map(s => s.id === id ? { ...s, [field]: value } : s);
        setContent({ ...content, services: newServices });
    };

    const updateReview = (id, field, value) => {
        const newReviews = content.reviews.map(r => r.id === id ? { ...r, [field]: value } : r);
        setContent({ ...content, reviews: newReviews });
    };

    const updateGallery = (id, field, value) => {
        const newGallery = content.gallery.map(g => g.id === id ? { ...g, [field]: value } : g);
        setContent({ ...content, gallery: newGallery });
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
                    <button onClick={() => handleSaveContent()} className="hidden md:block px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
                        Salva Tutto
                    </button>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm font-bold text-red-500 hover:underline">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Content Section */}
                <section className="lg:col-span-2 space-y-8">
                    {/* HERO SECTION */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">campaign</span>
                            Header & Hero
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Titolo Principale</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={content?.hero?.title || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Sottotitolo</label>
                                <textarea
                                    rows="2"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-sm"
                                    value={content?.hero?.subtitle || ""}
                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SERVICES SECTION */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">award_star</span>
                            Servizi
                        </h2>
                        <div className="space-y-6">
                            {content?.services?.map((service) => (
                                <div key={service.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Titolo Servizio</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm font-bold"
                                                value={service.title}
                                                onChange={(e) => updateService(service.id, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Icona (Material Symbol)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm font-mono"
                                                value={service.icon}
                                                onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Descrizione</label>
                                            <textarea
                                                rows="2"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm"
                                                value={service.description}
                                                onChange={(e) => updateService(service.id, 'description', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* REVIEWS SECTION */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">forum</span>
                            Recensioni Ospiti
                        </h2>
                        <div className="space-y-6">
                            {content?.reviews?.map((review) => (
                                <div key={review.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Nome Ospite</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm font-bold"
                                                value={review.name}
                                                onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Località</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm"
                                                value={review.location}
                                                onChange={(e) => updateReview(review.id, 'location', e.target.value)}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Testimonianza</label>
                                            <textarea
                                                rows="2"
                                                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-sm italic"
                                                value={review.text}
                                                onChange={(e) => updateReview(review.id, 'text', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* GALLERY SECTION */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">image</span>
                            Galleria Immagini
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content?.gallery?.map((item) => (
                                <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                                    <div className="h-24 w-full rounded-lg overflow-hidden bg-slate-200">
                                        <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">URL Immagine</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-[10px] font-mono"
                                            value={item.image}
                                            onChange={(e) => updateGallery(item.id, 'image', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Didascalia (Alt)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-1 outline-none text-xs"
                                            value={item.alt}
                                            onChange={(e) => updateGallery(item.id, 'alt', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button onClick={handleSaveContent} className="px-12 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                            SALVA TUTTE LE MODIFICHE
                        </button>
                    </div>
                    {message && <p className="text-center font-bold text-primary animate-pulse">{message}</p>}

                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-primary/5">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">list</span>
                            Ultime Prenotazioni
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-700">
                                        <th className="py-4 text-[10px] font-black uppercase text-slate-400">ID</th>
                                        <th className="py-4 text-[10px] font-black uppercase text-slate-400">Check-in</th>
                                        <th className="py-4 text-[10px] font-black uppercase text-slate-400">Check-out</th>
                                        <th className="py-4 text-[10px] font-black uppercase text-slate-400">Stato</th>
                                        <th className="py-4 text-[10px] font-black uppercase text-slate-400">Totale</th>
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
                                            <td className="py-4 font-bold text-sm text-primary">€{booking.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-9xl">analytics</span>
                        </div>
                        <h3 className="text-xl font-black mb-8">Business Overview</h3>
                        <div className="space-y-8">
                            <div className="relative z-10">
                                <p className="text-[10px] opacity-70 uppercase font-black tracking-widest mb-1">Prenotazioni Totali</p>
                                <p className="text-4xl font-black">{bookings.length}</p>
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] opacity-70 uppercase font-black tracking-widest mb-1">Fatturato Lordo</p>
                                <p className="text-4xl font-black">€{bookings.reduce((acc, b) => acc + parseFloat(b.total), 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-400">info</span>
                            Guida Rapida
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">1.</span>
                                <span>Modifica i testi nelle schede a sinistra.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">2.</span>
                                <span>Clicca su "Salva Tutto" per rendere le modifiche pubbliche.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">3.</span>
                                <span>I cambiamenti sono istantanei sulla Homepage.</span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}
