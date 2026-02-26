import fs from "fs";
import path from "path";

export default function Home() {
  const dbPath = path.join(process.cwd(), "src", "lib", "db.json");
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const content = db.siteContent;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-3xl">villa</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Mondello Mediterraneo</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Ville</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Servizi</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Esperienze</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Contatti</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/auth" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Area Riservata
            </a>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-200">
              <img alt="Profile" className="h-full w-full object-cover" src="/images/avatar.jpg" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('${content.hero.backgroundImage}')`
            }}
          >
          </div>
          <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-white/90 md:text-xl">
              {content.hero.subtitle}
            </p>
            <div className="mt-12 w-full max-w-4xl rounded-2xl bg-white/95 dark:bg-background-dark/95 p-2 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-stretch gap-2">
                <div className="flex flex-1 items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Destinazione</span>
                    <input className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-400" placeholder="Mondello, Palermo" type="text" />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Check-in / Out</span>
                    <input className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-400" placeholder="Scegli date" type="password" />
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 px-4 py-3">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ospiti</span>
                    <input className="w-full border-none bg-transparent p-0 text-sm font-bold focus:ring-0 placeholder:text-slate-400" placeholder="Quante persone?" type="text" />
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:bg-primary/90 md:w-auto">
                  <span className="material-symbols-outlined">search</span>
                  <span>Cerca</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 md:px-20">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">I Nostri Servizi Esclusivi</h2>
            <div className="mt-4 mx-auto h-1.5 w-20 rounded-full bg-primary/20">
              <div className="h-full w-1/2 rounded-full bg-primary"></div>
            </div>
            <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ogni dettaglio è curato per offrirvi un'esperienza indimenticabile nel cuore della Sicilia.
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

        <section className="bg-primary/5 py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Galleria d'Autore</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400">
                  Esplora l'eleganza delle nostre dimore.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
              {content.gallery.map((item, index) => (
                <div key={item.id} className={`${index === 0 ? 'col-span-2 row-span-2' : ''} rounded-2xl overflow-hidden shadow-lg group`}>
                  <img alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-20 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Cosa dicono di noi</h2>
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
                    <img alt={review.name} src={review.avatar} />
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

        <section className="h-[450px] w-full relative">
          <div className="absolute inset-0 bg-slate-200">
            <img alt="Map Background" className="w-full h-full object-cover grayscale opacity-50" src={content.contact.mapImage} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <span className="material-symbols-outlined text-primary text-5xl animate-bounce">location_on</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary/20 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 bg-white dark:bg-background-dark p-6 rounded-2xl shadow-xl border border-primary/10 max-w-xs">
            <h3 className="font-bold text-lg mb-2">Dove Siamo</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{content.contact.address}</p>
            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90">Ottieni indicazioni</button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-20 text-center text-xs text-slate-500">
          © 2026 Mondello Mediterraneo Luxury Rentals. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
