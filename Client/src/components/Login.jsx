export default function Login() {
  return (
    <section className="bg-white py-16 px-4">

      <div className="max-w-md mx-auto bg-slate-50 shadow-lg rounded-3xl p-6">

        <h2 className="text-2xl font-bold text-center mb-3">
          User Login
        </h2>

        <p className="text-center text-slate-600 mb-6 text-sm">
          Login to access voting services.
        </p>


        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl"
          />

          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:scale-105 transition"
          >
            Login
          </button>

        </form>


        <p className="text-center mt-5 text-sm text-slate-600">
          Don't have an account?
          <span className="text-indigo-600 font-semibold ml-2 cursor-pointer">
            Register
          </span>
        </p>

      </div>

    </section>
  )
}