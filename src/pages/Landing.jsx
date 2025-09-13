import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Landing() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
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

  const saveAndGo = (profile) => {
    try {
      const payload = {
        name: profile?.name || name || "Guest",
        email: profile?.email || "",
        picture: profile?.picture || "",
        sub: profile?.sub || "",
        ts: Date.now(),
      };
      localStorage.setItem("stuthipath:user", JSON.stringify(payload));
      setStatus("Redirecting…");
      window.location.href = "/dashboard";
    } catch (err) {
      setStatus("Could not save session");
      console.error(err);
    }
  };

  const onGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      saveAndGo(decoded);
    } catch (e) {
      console.error(e);
      setStatus("Google token decode failed");
    }
  };

  const onContinue = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus(<p className="text-xs text-red-500">Please enter a valid name</p>);
      return;
    }
    saveAndGo({ name });
  };

  return (
    <div
      ref={wrapRef}
      className="min-h-screen text-base-white bg-base-black relative overflow-hidden font-sans"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-bw-gradient opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-[0.30]" />
        <div className="absolute inset-0 spotlight mix-blend-screen opacity-[0.60]" />
        <div className="absolute inset-0 noise animate-grain opacity-[0.20]" />
      </div>

      <Header />

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-16 md:pb-28">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-glow">
            <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full ring-1 ring-white/10 bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 w-[380px] h-[380px] rounded-full ring-1 ring-white/10 bg-white/5 blur-3xl" />

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl leading-[1.05] tracking-tight text-base-white">
                  Elevate learning with and focus
                </h2>

                <br />

                <p className="text-base-dim text-sm md:text-base max-w-prose">
                  StuthiPath is an online platform that brings the wisdom of the Vedas and Upanishads to life, making timeless knowledge accessible to students everywhere
                </p>

                <ul className="text-base-dim text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 bg-white/70 rounded-full" /> Continue with Google — or enter your name
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-7 shadow-glow">
                  <form onSubmit={onContinue} className="space-y-5">
                    <div>
                      <label className="block text-xs tracking-wide text-base-dim mb-2">
                        Enter name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Arjun Rao"
                        className="w-full rounded-xl bg-black/40 text-base-white placeholder:text-base-dim border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-white text-black font-medium px-4 py-3 shadow-btn hover:opacity-90 active:opacity-80 transition"
                        title="Continue with name"
                      >
                        Continue
                      </button>

                      <div className="w-px h-10 bg-white/10" />

                      <div className="flex-1 flex justify-center">
                        <GoogleLogin
                          onSuccess={onGoogleSuccess}
                          onError={() => setStatus("Login Failed")}
                          theme="filled_black"
                          shape="pill"
                          width="220"
                          text="signin_with"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-base-dim">
                      By continuing, consent is given to create a session for personalized classes and events.
                    </p>

                    {status ? (
                      <p className="text-xs text-white/80">{status}</p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { k: "Programs", d: "Foundations to advanced—designed for mastery." },
              { k: "Events", d: "Hands‑on workshops and peer learning." },
              { k: "Pricing", d: "Transparent plans for student growth." },
            ].map((it) => (
              <div
                key={it.k}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/7.5 transition-all shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base-white font-semibold">{it.k}</h3>
                  <div className="size-8 rounded-lg bg-white/10 grid place-items-center group-hover:bg-white/20 transition">
                    <span className="text-base-white">→</span>
                  </div>
                </div>
                <p className="text-base-dim text-sm mt-2">{it.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
