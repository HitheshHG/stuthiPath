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
      setStatus(<p className="text-xs text-red-600">Please enter a valid name</p>);
      return;
    }
    saveAndGo({ name });
  };

  return (
    <div
      ref={wrapRef}
      className="min-h-screen bg-white text-gray-900 relative overflow-hidden font-sans"
      style={{ "--spot-x": "50%", "--spot-y": "50%" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background:
            "radial-gradient(80rem 60rem at 85% 15%, rgba(99,102,241,0.08), transparent 60%), radial-gradient(60rem 40rem at 10% 85%, rgba(236,72,153,0.06), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-35"
        style={{
          background:
            "radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99,102,241,0.12), transparent 60%)",
        }}
      />

      <Header />

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12 items-center">
            <div className="col-span-12 lg:col-span-7 space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]">
                <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
                  Elevate learning
                </span>{" "}
                with focus
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-prose leading-relaxed">
                StuthiPath is an online platform that brings the wisdom of the Vedas and Upanishads to life, making timeless knowledge accessible to students everywhere.
              </p>
              <ul className="text-gray-500 text-sm md:text-base space-y-3 font-medium">
                <li className="flex items-center gap-3">
                  <span className="size-2.5 bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 rounded-full shadow-[0_0_0_4px_rgba(99,102,241,0.08)]" />
                  Continue with Google — or enter your name
                </li>
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <div className="relative">
                <div className="relative mx-auto w-full sm:max-w-xl md:w-[560px] lg:w-[680px] rounded-2xl border border-indigo-300 bg-white/95 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(99,102,241,0.12)]">
                  <form onSubmit={onContinue} className="space-y-6 sm:space-y-8">
                    <div className="space-y-2">
                      <label className="block text-xs sm:text-sm text-gray-700 font-semibold tracking-wide">
                        Enter name
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Arjun Rao"
                        className="w-full rounded-xl bg-indigo-50 text-gray-900 placeholder-gray-400 border border-indigo-300 px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        autoComplete="off"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                      <button
                        type="submit"
                        className="w-full sm:flex-1 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-semibold px-5 sm:px-6 py-3.5 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
                        title="Continue with name"
                      >
                        Continue
                      </button>
                      <div className="w-full sm:flex-1 flex justify-center">
                        <div className="w-full max-w-[360px]">
                          <GoogleLogin
                            onSuccess={onGoogleSuccess}
                            onError={() => setStatus("Login Failed")}
                            theme="filled_black"
                            shape="pill"
                            width="320"
                            text="signin_with"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500">
                      By continuing, consent is given to create a session for personalized classes and events.
                    </p>
                    {status ? (
                      <p className="text-xs text-indigo-700 mt-1 font-mono tracking-wide">{status}</p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
