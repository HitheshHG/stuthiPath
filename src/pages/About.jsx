import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function About() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="min-h-screen text-white bg-black relative overflow-hidden font-sans"
    >
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">StuthiPath</h1>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl leading-[1.05] tracking-tight">
                  <span className="opacity-90">About</span>{" "}
                  <span className="opacity-100">StuthiPath</span>
                </h2>

                <p className="text-neutral-300 text-sm md:text-base max-w-prose">
                  StuthiPath is a learning platform inspired by the Vedas and Upanishads—bridging timeless śruti with modern study for focused, joyful mastery.
                </p>

                <p className="text-neutral-300 text-sm md:text-base max-w-prose">
                  Guided by clarity, rigor, and community, the platform curates pathways from foundations to depth, honoring Sanātana Dharma while embracing contemporary pedagogy.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-7">
                <div className="grid gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Our Mission</h3>
                      <p className="text-neutral-300 text-sm mt-1">
                        Make timeless knowledge accessible, structured, and actionable for students everywhere.
                      </p>
                    </div>
                    <div className="size-8 rounded-lg bg-white/10 grid place-items-center">
                      <span>✦</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Lineage & Inspiration</h3>
                      <p className="text-neutral-300 text-sm mt-1">
                        Rooted in Vedas, Upanishads, and the living ethos of Sanātana Dharma, presented with modern clarity.
                      </p>
                    </div>
                    <div className="size-8 rounded-lg bg-white/10 grid place-items-center">
                      <span>ૐ</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">Approach</h3>
                      <p className="text-neutral-300 text-sm mt-1">
                        Cohesive tracks, guided practice, and peer learning—supported by clean design and mindful focus.
                      </p>
                    </div>
                    <div className="size-8 rounded-lg bg-white/10 grid place-items-center">
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                { k: "Śraddhā", d: "Discipline with devotion—steady effort toward understanding and practice." },
                { k: "Adhyayana", d: "Deep study—text, context, and contemplation in harmony." },
                { k: "Satsaṅga", d: "Community of seekers—learning together with humility and joy." },
              ].map((it) => (
                <div
                  key={it.k}
                  className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{it.k}</h3>
                    <div className="size-8 rounded-lg bg-white/10 grid place-items-center group-hover:bg-white/20 transition">
                      <span>✺</span>
                    </div>
                  </div>
                  <p className="text-neutral-300 text-sm mt-2">{it.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
              <Link
                to="/programs"
                className="rounded-xl bg-white text-black font-medium px-5 py-3 hover:opacity-90 active:opacity-80 transition"
                title="Explore Programs"
              >
                Explore Programs
              </Link>
              <Link
                to="/events"
                className="rounded-xl bg-white/0 text-white font-medium px-5 py-3 border border-white/10 hover:border-white/30 transition"
                title="View Events"
              >
                View Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm text-neutral-400">
          © {new Date().getFullYear()} StuthiPath
        </div>
      </footer>

      {/* Optional ambient layers if CSS exists for these classes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 opacity-60" />
      </div>
    </div>
  );
}

export default About;
