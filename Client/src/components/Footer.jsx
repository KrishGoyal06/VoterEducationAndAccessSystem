export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            VoteAccess
          </h2>

          <p className="text-slate-300">
            Helping citizens access voting information and awareness.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>

          <ul className="space-y-2 text-slate-300">
            <li>Polling Booth Finder</li>
            <li>Voting Timings</li>
            <li>Voter Education</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <p className="text-slate-300">
            Election Helpline: 1800-000-000
          </p>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-4 text-slate-400">
        © 2026 VoteAccess. All Rights Reserved.
      </div>

    </footer>
  )
}