import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img1 from "../public/images/cmp1.png";
import img2 from "../public/images/cmp2.png";
import img3 from "../public/images/cmp3.png";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Profile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const badgeRef = useRef(null);

  // Guard: require a stored session; otherwise redirect to landing
  useEffect(() => {
    const stored = localStorage.getItem("stuthipath:user");
    if (!stored) {
      window.location.href = "/";
      return;
    }
    setUser(JSON.parse(stored));

    async function fetchAll() {
      try {
        setLoading(true);
        setError(null);

        const { data: course_plans, error: e1 } = await supabase
          .from("course_plans")
          .select("*")
          .order("created_at", { ascending: true });

        if (e1) throw e1;
        setPlans(course_plans || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // Close menu on outside click / Esc
  useEffect(() => {
    const onDocClick = (e) => {
      if (!badgeRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const onLogout = async () => {
    try {
      // If using Supabase Auth, sign the user out of the SDK too
      await supabase.auth?.signOut?.();
    } catch (e) {
      console.error("Supabase signOut failed:", e);
    } finally {
      localStorage.removeItem("stuthipath:user");
      window.location.href = "/"; // redirect to landing
    }
  };

  const ShimmerCard = () => (
    <div className="bg-white/10 rounded-2xl p-6 shadow-glow border border-white/20 animate-pulse h-56" />
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-base-black text-base-white font-sans relative overflow-hidden p-6 max-w-7xl mx-auto">
        {/* User badge with dropdown */}
        <div ref={badgeRef} className="fixed top-6 right-6 z-50">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 shadow-glow border border-white/10 hover:bg-white/15 transition"
            aria-haspopup="menu"
            aria-expanded={menuOpen ? "true" : "false"}
            title="Open profile menu"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-base-black font-bold">
                ?
              </div>
            )}
            <span className="text-sm font-semibold">{user?.name || "Guest"}</span>
            <svg
              className={`w-4 h-4 transition ${menuOpen ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="mt-2 w-64 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-glow text-sm overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-white/10">
                <p className="font-semibold">{user?.name || "Guest"}</p>
                {user?.email ? (
                  <p className="text-base-dim truncate">{user.email}</p>
                ) : null}
              </div>
              <ul className="py-1">
                <li>
                  <button
                      className="w-full text-left px-4 py-2 text-red-500 hover:text-red-400 hover:bg-red-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 transition"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Hero header */}
        <section className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-16 md:py-20 shadow-glow">
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="pointer-events-none absolute -top-8 -left-4 select-none text-[11rem] leading-none text-black/20 font-serif font-bold rotate-[12deg] mix-blend-multiply">
            ॐ
          </div>
          <div className="pointer-events-none absolute bottom-[-36px] right-4 select-none text-[8rem] leading-none text-black/25 font-serif font-bold -rotate-6 mix-blend-multiply">
            वेद
          </div>
          <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 select-none text-[6rem] leading-none text-black/15 font-serif font-bold rotate-12 mix-blend-multiply">
            शान्तिः
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
              StuthiPath Dashboard
            </h1>
            <p className="text-base-dim italic mb-1">Awaken Wisdom, Illuminate the Journey</p>
          </div>
        </section>

        {error && (
          <div className="mb-8 text-red-500 text-center font-semibold">{error}</div>
        )}

        {/* Plans (hero-style cards) */}
        <section className="mb-16">
          <h2 className="text-3xl mb-6">Course Plans & Pricing</h2>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map(({ id, name, description, price, discount }, idx) => {
                const discountedPrice = (price * (100 - discount)) / 100;
                const banner = [img1, img2, img3][idx % 3];

                return (
                  <div
                    key={id}
                    className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-glow hover:bg-white/10 transition"
                    title={`Register for ${name}`}
                  >
                    {/* Hero banner with overlay */}
                    <div className="relative h-40 w-full">
                      <img
                        src={banner}
                        alt={name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <span className="absolute top-3 right-3 rounded-full bg-white text-black text-xs font-bold px-2 py-1 shadow">
                        {discount}% OFF
                      </span>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-2xl font-bold leading-tight">{name}</h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <p className="text-base-dim mb-4 line-clamp-3">{description}</p>
                      <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-3">
                          <span className="text-lg font-semibold line-through text-base-dim">
                            ₹{price}
                          </span>
                          <span className="text-3xl font-extrabold text-white">
                            ₹{discountedPrice.toFixed(0)}
                          </span>
                        </div>
                        <button
                          className="rounded-xl bg-white text-black font-semibold px-4 py-2 hover:opacity-90 transition"
                          onClick={() => alert(`Register for ${name} coming soon!`)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
