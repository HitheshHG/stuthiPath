import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans">
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
            "radial-gradient(circle at 50% 30%, rgba(99,102,241,0.10), transparent 55%)",
        }}
      />

      <Header />

      <main className="relative z-10 pb-28">
        <section id="about" className="mx-auto max-w-5xl px-6 pt-16 md:pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">
            About StuthiPath
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            StuthiPath blends timeless Vedic wisdom with modern learning tools,
            creating a serene space for students to explore, focus, and grow.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8 md:gap-12 pb-12 md:pb-20">
          <div className="rounded-3xl border border-indigo-300 bg-white/90 backdrop-blur-md p-8 shadow-[0_10px_30px_rgba(99,102,241,0.12)]">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-800">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to make the profound teachings of the Vedas and Upanishads
              accessible to learners everywhere. By combining tradition and
              technology, StuthiPath nurtures intellectual clarity and inner
              balance.
            </p>
          </div>
          <div className="rounded-3xl border border-indigo-300 bg-white/90 backdrop-blur-md p-8 shadow-[0_10px_30px_rgba(99,102,241,0.12)]">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-800">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To cultivate a generation of learners who stay rooted in timeless
              knowledge while embracing innovation — growing in wisdom, focus,
              and harmony.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 md:mb-14">
              Our Core Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  title: "Wisdom",
                  text: "Guided by the eternal teachings of the Vedas and Upanishads.",
                },
                {
                  title: "Focus",
                  text: "Helping students build clarity and discipline in their journey.",
                },
                {
                  title: "Community",
                  text: "A supportive network of learners sharing insights and growth.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-indigo-300 bg-white/90 backdrop-blur-sm p-6 shadow-[0_10px_24px_rgba(99,102,241,0.10)] hover:bg-indigo-50 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-indigo-800 group-hover:text-pink-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-indigo-300 bg-white/90 backdrop-blur-md p-10 md:p-12 shadow-[0_15px_40px_rgba(99,102,241,0.14)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-gray-700 mb-8">
              Dive deeper into knowledge, focus your mind, and connect with a
              vibrant community of seekers.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 text-lg font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Explore StuthiPath
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
