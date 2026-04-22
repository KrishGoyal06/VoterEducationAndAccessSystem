export default function Register() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-lg mx-auto bg-slate-50 shadow-xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-center mb-4">
          Voter Registration
        </h2>

        <p className="text-center text-slate-600 mb-8">
          Register to receive voting updates and eligibility information.
        </p>


        <form className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Full Name"
            className="p-3 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Voter ID"
            className="p-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="District"
            className="p-3 border rounded-xl"
          />

          <select className="p-3 border rounded-xl md:col-span-2">
            <option>Select State</option>
            <option>Haryana</option>
            <option>Punjab</option>
            <option>Delhi</option>
          </select>


          <button
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-xl hover:scale-105 transition"
          >
            Register
          </button>

        </form>

      </div>

    </section>
  )
}