import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat, FaUserMd } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

export default function DashboardDemo({ type = "donor" }: { type?: "donor" | "recipient" }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white/80 shadow-sm">
        <div className="text-2xl font-bold text-blue-900 tracking-wide">LifeLink Dashboard</div>
        <div className="flex items-center gap-4">
          <img src="/avatar.svg" alt="User" className="w-10 h-10 rounded-full border" />
        </div>
      </div>

      {/* Notification Panel */}
      <div className="max-w-5xl mx-auto mt-6">
        <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded shadow mb-6">
          <FiAlertCircle className="text-2xl" />
          <span className="font-semibold">Urgent:</span>
          <span>Potential organ match found! Please review immediately.</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {type === "donor" ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Verification Status */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-green-400">
                <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                  <FaCheckCircle /> Verified Donor
                </div>
                <div className="text-gray-500 text-sm">Your identity and health status are verified.</div>
              </div>
              {/* Registered Organs */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400">
                <div className="font-bold text-blue-700">Registered Organs</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Kidney</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Liver</span>
                </div>
              </div>
              {/* Upcoming Health Checks */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-green-400">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
                  <FaUserMd /> Next Health Check
                </div>
                <div className="text-gray-500 text-sm">Aug 20, 2025 at City Hospital</div>
              </div>
              {/* Donation History */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400">
                <div className="font-bold text-blue-700">Donation History</div>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>2024-11-10: Kidney to Recipient #1234 <span className="text-green-600">(Completed)</span></li>
                  <li>2023-07-22: Liver to Recipient #5678 <span className="text-green-600">(Completed)</span></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Organ Match Status */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
                  <FaHeartbeat /> Match Status
                </div>
                <div className="text-green-600 font-semibold">Match Found!</div>
              </div>
              {/* Priority Level */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-green-400">
                <div className="font-bold text-green-700">Priority Level</div>
                <div className="w-full bg-green-100 rounded-full h-3 mt-1">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: "80%" }} />
                </div>
                <div className="text-xs text-green-700 font-semibold mt-1">High</div>
              </div>
              {/* Match Suggestions */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400">
                <div className="font-bold text-blue-700">Match Suggestions</div>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>Donor #4321 <span className="text-blue-600">(92% compatible)</span></li>
                  <li>Donor #8765 <span className="text-blue-600">(85% compatible)</span></li>
                </ul>
              </div>
              {/* Expected Waiting Time */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-green-400">
                <div className="font-bold text-green-700">Expected Waiting Time</div>
                <div className="text-blue-700 font-semibold">2 weeks</div>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border-t-4 border-blue-400">
            <div className="font-bold text-blue-700 mb-2">Quick Links</div>
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/profile" className="text-blue-600 hover:underline">Profile</a>
            <a href="/resources" className="text-blue-600 hover:underline">Resources</a>
            <a href="/support" className="text-blue-600 hover:underline">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
