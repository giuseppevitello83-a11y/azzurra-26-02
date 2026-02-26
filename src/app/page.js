import BookingCalendar from "@/components/BookingCalendar";
import SearchForm from "@/components/SearchForm";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { getSiteContent } = await import("@/lib/contentStore");
  const content = await getSiteContent();

  return (
    <div className="relative flex min-h-screen w-full flex-col scroll-smooth">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl">villa</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{content.hero.title}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#appartamento">Appartamento</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#servizi">Servizi</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#galleria">Galleria</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#recensioni">Recensioni</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#contatti">Dove Siamo</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/auth" className="rounded-lg bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-all">
              Area Riservata
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="appartamento" className="relative min-h-[90vh] w-full overflow-hidden flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('${content.hero.backgroundImage}')`
            }}
          >
          </div>
          <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 gap-12 py-20 w-full">
            <div className="flex-1 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
                Lusso a due passi dal mare
              </span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/80 max-w-xl leading-relaxed">
                {content.hero.subtitle}
              </p>

              <SearchForm />
            </div>
            <div className="w-full lg:w-[450px]">
              <BookingCalendar />
            </div>
          </div>
        </section>

        <section id="servizi" className="mx-auto max-w-7xl px-6 py-24 md:px-20">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 dark:text-white">Comfort & Relais</h2>
            <div className="mt-4 mx-auto h-1.5 w-20 rounded-full bg-primary/20">
              <div className="h-full w-1/2 rounded-full bg-primary"></div>
            </div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Soggiorna in un attico di 90mq con doppia terrazza, vasca idromassaggio e tutti i comfort moderni a soli 10 minuti a piedi dalla spiaggia di Mondello.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.services.map((service) => (
              <div key={service.id} className="group rounded-2xl border border-primary/10 bg-white dark:bg-slate-800/50 p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined">{service.icon}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="galleria" className="bg-primary/5 py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">Galleria d'Autore</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Esplora l'eleganza degli interni e gli ampi spazi esterni progettati per il tuo relax.</p>
            </div>

            <div className="space-y-20">
              {['Zona Giorno', 'Cucina', 'Camere', 'Bagni', 'Terrazza'].map((category) => {
                const items = content.gallery.filter(item => item.category === category);
                if (items.length === 0) return null;

                return (
                  <div key={category} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{category}</h3>
                      <div className="h-px flex-1 bg-primary/10"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {items.map((item, idx) => (
                        <div
                          key={item.id}
                          className={`group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:scale-[1.02] ${idx === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
                        >
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="w-full h-full object-cover min-h-[300px] max-h-[500px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <p className="text-white font-bold text-lg">{item.alt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="recensioni" className="py-24 px-6 md:px-20 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Cosa dicono di noi</h2>
            <p className="text-sm text-primary font-bold mt-2">Eccellente 9.3/10 su Booking.com</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.reviews.map((review) => (
              <div key={review.id} className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-primary/5 shadow-sm">
                <div className="flex gap-1 text-primary mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-1 text-primary">star</span>
                  ))}
                </div>
                <p className="italic text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <img alt={review.name} src={review.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <p className="text-xs text-slate-500 italic">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contatti" className="py-24 bg-slate-50 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">Contattaci per informazioni</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Hai domande sulla struttura o vuoi organizzare un arrivo speciale? Scrivici e ti risponderemo il prima possibile.
              </p>
              <ContactForm />
            </div>
            <div className="h-[500px] w-full relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img alt="Map Background" className="w-full h-full object-cover" src={content.contact.mapImage} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <span className="material-symbols-outlined text-primary text-6xl drop-shadow-lg">location_on</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-primary/10">
                <h3 className="font-bold text-lg mb-1">Azzurra Apartment</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{content.contact.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.contact.address)}`}
                  target="_blank"
                  className="inline-block w-full py-3 bg-primary text-white text-center text-xs font-bold rounded-xl hover:bg-primary/90 transition-all"
                >
                  Apri in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg italic">Azzurra Apartment</h3>
            <p className="text-xs leading-relaxed opacity-60">Comfort e lusso a due passi dal mare di Mondello. Una casa vacanze pensata per offrirvi il meglio della Sicilia.</p>
          </div>
          <div></div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-primary">Seguici</p>
            <div className="flex justify-end gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-all">
                <span className="material-symbols-outlined text-lg">public</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 md:px-20 mt-16 pt-8 border-t border-white/5 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          © 2026 Azzurra Apartment Mondello. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
