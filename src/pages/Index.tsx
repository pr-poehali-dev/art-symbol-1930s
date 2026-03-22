import { useState, useEffect } from "react";
import { artists, Artist, Artwork } from "@/data/artists";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [lightbox, setLightbox] = useState<Artwork | null>(null);
  const [activeSection, setActiveSection] = useState<"main" | "artist">("main");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const openArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setActiveSection("artist");
    setVisible(false);
    setTimeout(() => setVisible(true), 50);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setActiveSection("main");
    setSelectedArtist(null);
    setVisible(false);
    setTimeout(() => setVisible(true), 50);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)", color: "var(--text-main)", fontFamily: "'Cormorant', serif" }}>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,10,5,0.96)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
              style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}
            >
              <Icon name="X" size={16} /> Закрыть
            </button>
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="w-full object-cover"
              style={{ maxHeight: "70vh", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}
            />
            <div className="mt-6 border-l-4 pl-6" style={{ borderColor: "var(--gold)" }}>
              <p className="text-2xl font-bold" style={{ color: "var(--gold)" }}>{lightbox.title}</p>
              <p className="text-sm uppercase tracking-widest mt-1 mb-3" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>{lightbox.year}</p>
              <p className="leading-relaxed" style={{ color: "var(--text-light)", fontSize: "1rem" }}>{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: "var(--bg-dark)", borderBottom: "3px solid var(--gold)" }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, var(--gold) 40px, var(--gold) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--gold) 40px, var(--gold) 41px)"
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          {activeSection === "artist" && (
            <button onClick={goBack} className="flex items-center gap-2 mb-8 uppercase tracking-widest text-xs hover:opacity-80 transition-opacity" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
              <Icon name="ChevronLeft" size={14} /> Все художники
            </button>
          )}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <p className="uppercase tracking-[0.4em] text-xs mb-4" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>
                Советское изобразительное искусство
              </p>
              <h1 className="font-bold leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                {activeSection === "artist" && selectedArtist
                  ? selectedArtist.name
                  : <>СССР<br /><span style={{ color: "var(--gold)" }}>1930-е</span></>
                }
              </h1>
              {activeSection === "artist" && selectedArtist && (
                <p className="mt-3 text-lg uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>
                  {selectedArtist.years} · {selectedArtist.movement}
                </p>
              )}
              {activeSection === "main" && (
                <p className="mt-4 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Мастера живописи и скульптуры эпохи социалистического строительства — биографии, творчество, интерактивные галереи
                </p>
              )}
            </div>
            <div className="hidden md:flex flex-col items-end gap-1 text-right">
              <div className="w-16 h-px" style={{ background: "var(--gold)" }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>{artists.length} художников</p>
            </div>
          </div>
        </div>
      </header>

      {/* Artist detail */}
      {activeSection === "artist" && selectedArtist && (
        <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--gold)" }}>Биография</h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-light)" }}>{selectedArtist.bio}</p>
                {selectedArtist.quote && (
                  <blockquote className="border-l-4 pl-6 py-2" style={{ borderColor: "var(--crimson)" }}>
                    <p className="text-xl italic leading-relaxed" style={{ color: "var(--text-main)" }}>«{selectedArtist.quote}»</p>
                    <footer className="mt-2 text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>— {selectedArtist.name}</footer>
                  </blockquote>
                )}
              </div>
              <div>
                <div className="p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--border-gold)" }}>
                  <h3 className="uppercase tracking-widest text-xs mb-6" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>Сведения</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>Годы жизни</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-main)" }}>{selectedArtist.years}</p>
                    </div>
                    <div className="h-px" style={{ background: "var(--border-gold)" }} />
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>Направление</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-main)" }}>{selectedArtist.movement}</p>
                    </div>
                    <div className="h-px" style={{ background: "var(--border-gold)" }} />
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>Работ в галерее</p>
                      <p className="text-lg font-bold" style={{ color: "var(--text-main)" }}>{selectedArtist.artworks.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--gold)" }}>Галерея работ</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedArtist.artworks.map((work) => (
                  <div key={work.id} className="group cursor-pointer" onClick={() => setLightbox(work)}>
                    <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(15,10,5,0.6)" }}>
                        <div className="flex items-center gap-2 px-4 py-2 uppercase tracking-widest text-xs" style={{ background: "var(--gold)", color: "var(--bg-dark)", fontFamily: "'Oswald', sans-serif" }}>
                          <Icon name="Maximize2" size={12} /> Увеличить
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-1 text-xs" style={{ background: "var(--bg-dark)", color: "var(--gold)", fontFamily: "'Oswald', sans-serif", border: "1px solid var(--border-gold)" }}>
                        {work.year}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold leading-tight mb-2" style={{ color: "var(--text-main)" }}>{work.title}</h3>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>{work.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation between artists */}
            <div className="mt-16 flex justify-between items-center pt-8" style={{ borderTop: "1px solid var(--border-gold)" }}>
              {(() => {
                const idx = artists.findIndex(a => a.id === selectedArtist.id);
                const prev = artists[idx - 1];
                const next = artists[idx + 1];
                return (
                  <>
                    {prev ? (
                      <button onClick={() => openArtist(prev)} className="flex items-center gap-3 group">
                        <Icon name="ChevronLeft" size={20} style={{ color: "var(--gold)" } as React.CSSProperties} />
                        <div className="text-left">
                          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>Предыдущий</p>
                          <p className="font-bold" style={{ color: "var(--text-main)" }}>{prev.name}</p>
                        </div>
                      </button>
                    ) : <div />}
                    {next ? (
                      <button onClick={() => openArtist(next)} className="flex items-center gap-3 group text-right">
                        <div>
                          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>Следующий</p>
                          <p className="font-bold" style={{ color: "var(--text-main)" }}>{next.name}</p>
                        </div>
                        <Icon name="ChevronRight" size={20} style={{ color: "var(--gold)" } as React.CSSProperties} />
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Main artists grid */}
      {activeSection === "main" && (
        <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-6 mb-14">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, var(--gold), transparent)" }} />
              <p className="uppercase tracking-[0.4em] text-xs" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>Мастера эпохи</p>
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, var(--gold), transparent)" }} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artists.map((artist, i) => (
                <div
                  key={artist.id}
                  className="group cursor-pointer"
                  onClick={() => openArtist(artist)}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: "var(--bg-card)" }}>
                    <img
                      src={artist.artworks[0].image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,10,5,0.95) 30%, rgba(15,10,5,0.1) 70%)" }} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>{artist.movement}</p>
                        <h3 className="text-xl font-bold leading-tight mb-1" style={{ color: "var(--text-main)" }}>{artist.name}</h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>{artist.years}</p>
                        <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-px w-8" style={{ background: "var(--gold)" }} />
                          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--gold)", fontFamily: "'Oswald', sans-serif" }}>Открыть</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center" style={{ background: "var(--gold)", color: "var(--bg-dark)", fontFamily: "'Oswald', sans-serif", fontSize: "0.75rem", fontWeight: 700 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="mt-8 py-10 text-center" style={{ borderTop: "1px solid var(--border-gold)", background: "var(--bg-dark)" }}>
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--text-muted)", fontFamily: "'Oswald', sans-serif" }}>
              Советское изобразительное искусство · 1930-е годы · Образовательная презентация
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
