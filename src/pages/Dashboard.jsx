"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";
import img1 from "../public/images/cmp1.png";
import img2 from "../public/images/cmp2.png";
import img3 from "../public/images/cmp3.png";
import img4 from "../public/images/cmp4.png";
import img5 from "../public/images/cmp5.png";
import img6 from "../public/images/cmp6.png";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuChipRef = useRef(null);
  const menuItemsRef = useRef(null);
  const portalWrapRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("stuthipath:user");
    if (!stored) {
      window.location.href = "/";
      return;
    }
    setUser(JSON.parse(stored));
    const fetchPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: e } = await supabase
          .from("course_plans")
          .select("*")
          .order("created_at", { ascending: true });
        if (e) throw e;
        setPlans(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!portalWrapRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onDocKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuChipRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, []);

  const onLogout = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("signOut:", err);
    } finally {
      localStorage.removeItem("stuthipath:user");
      window.location.href = "/";
    }
  };

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.picture ||
    "";

  const Shimmer = () => (
    <div className="rounded-2xl p-6 h-56 bg-indigo-50 border border-indigo-200 animate-pulse" />
  );

  const banners = [img1, img2, img3, img4, img5, img6];

  const openMenu = () => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      const firstItem = menuItemsRef.current?.querySelector('[role="menuitem"]');
      firstItem?.focus();
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuChipRef.current?.focus();
  };

  const onChipKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      openMenu();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setMenuOpen(true);
      requestAnimationFrame(() => {
        const items = Array.from(
          menuItemsRef.current?.querySelectorAll('[role="menuitem"]') || []
        );
        items[items.length - 1]?.focus();
      });
    }
  };

  const onMenuKeyDown = (e) => {
    const items = Array.from(
      menuItemsRef.current?.querySelectorAll('[role="menuitem"]') || []
    );
    const idx = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    } else if (e.key === "Tab") {
      setMenuOpen(false);
    }
  };

  const overlay =
    typeof window !== "undefined"
      ? createPortal(
        <div
          ref={portalWrapRef}
          style={{ position: "fixed", top: "6rem", right: "1.5rem", zIndex: 2147483647, pointerEvents: "auto" }}
        >
          <div
            ref={menuChipRef}
            role="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="user-menu"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            onKeyDown={onChipKeyDown}
            className="flex items-center gap-3 bg-white rounded-full px-4 py-2 border border-indigo-300 shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer select-none"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-gray-900 font-bold">
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
          </div>

          {menuOpen && (
            <nav
              id="user-menu"
              role="menu"
              aria-labelledby="user-menu-button"
              ref={menuItemsRef}
              onKeyDown={onMenuKeyDown}
              className="mt-2 w-64 rounded-xl border border-indigo-200 bg-white shadow text-sm overflow-hidden focus:outline-none"
            >
              <div className="px-4 py-3 border-b border-indigo-100">
                <p className="font-semibold text-gray-900">{user?.name || "Guest"}</p>
                {user?.email ? (
                  <p className="text-gray-500 truncate">{user.email}</p>
                ) : null}
              </div>


              <a
                href="/"
                role="menuitem"
                tabIndex={-1}
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition focus:bg-red-50 focus:text-red-700 outline-none"
              >
                Logout
              </a>
            </nav>
          )}
        </div>,
        document.body
      )
      : null;

  return (
    <>
      <Header />
      {overlay}

      <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-90 z-0"
          style={{
            background:
              "radial-gradient(80rem 60rem at 85% 15%, rgba(99,102,241,0.08), transparent 60%), radial-gradient(60rem 40rem at 10% 85%, rgba(236,72,153,0.06), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.10), transparent 55%)",
          }}
        />

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          <section className="relative mb-12 overflow-hidden rounded-3xl border border-indigo-200 bg-white/90 backdrop-blur-md px-6 py-14 md:py-16 shadow-[0_15px_40px_rgba(99,102,241,0.14)]">
            <div className="absolute -top-8 -left-4 text-[11rem] text-indigo-200 font-serif font-bold rotate-[12deg] select-none z-0">
              ॐ
            </div>
            <div className="absolute bottom-[-36px] right-4 text-[8rem] text-indigo-100 font-serif font-bold -rotate-6 select-none z-0">
              वेद
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] text-indigo-100 font-serif font-bold rotate-12 select-none z-0">
              शान्तिः
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                StuthiPath Dashboard
              </h1>
              <p className="text-gray-600 italic">Awaken Wisdom, Illuminate the Journey</p>
            </div>
          </section>

          {error && <div className="mb-8 text-red-600 text-center">{error}</div>}

          <section className="mb-16">
            <h2 className="text-3xl mb-6">Course Plans & Pricing</h2>
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {plans.map(({ id, name, description, price, discount }, idx) => {
                  const discounted = (price * (100 - discount)) / 100;
                  const banner = banners[idx % banners.length];
                  return (
                    <div
                      key={id}
                      className="group rounded-2xl overflow-hidden border border-indigo-200 bg-white/95 shadow-[0_10px_30px_rgba(99,102,241,0.12)] hover:bg-indigo-50 transition"
                    >
                      <div className="relative h-44 w-full">
                        <img
                          src={banner}
                          alt={name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                        <span className="absolute top-3 right-3 rounded-full bg-white text-gray-900 text-xs font-bold px-2 py-1 shadow">
                          {discount}% OFF
                        </span>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white drop-shadow">{name}</h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
                        <div className="flex items-end justify-between">
                          <div className="flex items-baseline gap-3">
                            <span className="text-lg font-semibold line-through text-gray-400">
                              ₹{price}
                            </span>
                            <span className="text-3xl font-extrabold text-gray-900">
                              ₹{discounted.toFixed(0)}
                            </span>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Register for ${name} coming soon!`);
                            }}
                            className="rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold px-4 py-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
                          >
                            Register
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
