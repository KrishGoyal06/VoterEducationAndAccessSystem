export default function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8 py-24">

       
        <div>

          <p className="text-indigo-600 font-semibold mb-4">
            Voting Education & Access System
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
            Know Where, <br/>
            When, and How To Vote
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-lg">
            Check polling locations, voting timings, and learn the
            voting process in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:scale-105 transition">
              Find Booth
            </button>

            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-2xl hover:bg-indigo-50">
              Learn More
            </button>
          </div>

        </div>


        
        <div className="bg-indigo-100 rounded-[40px] p-10 shadow-xl">

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6">
              Election Information
            </h3>

            <div className="space-y-4 text-slate-700 text-lg">
              <p>🕖 Voting Time: 7 AM - 6 PM</p>
              <p>📍 Polling Booth: Sector 12 Community Hall</p>
              <p>🪪 ID Required: Voter ID / Approved ID</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}