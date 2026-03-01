import { use, useEffect, useState } from "react";
import { ShieldCheck, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { Info ,CheckCheck } from "lucide-react";


export default function AdminAccess() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  setTimeout(() => {
    setError("");
    setSuccess("");
  }, 3000);

  useEffect(()=>{
    const fetchAdmins = async () => {
   try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/fetch-admins`,{ withCredentials: true });
    setAdmins(res.data.admins);
   } catch (error) {
    console.error("Error fetching admins:", error);
    
   }
    }

    fetchAdmins();
  },[])

  const addAdmin = async() => {
    if (!email) return;

    setLoading(true);


    try {
        
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-admin`, { email },{ withCredentials: true });
        setAdmins([...admins, res.data.admin]);
        setEmail("");
        setSuccess("Admin added successfully!");
        
    } catch (error) {
        console.log("Error adding admin:", error);
        setError(error.response?.data?.message || "Failed to add admin");
        
    }finally{
        setLoading(false);
    }


  };

  const removeAdmin = async(email) => {
    
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/remove-admin`, { email },{ withCredentials: true });
        setAdmins(admins.filter(admin => admin.email !== email));
        setSuccess("Admin removed successfully!");
        
    } catch (error) {
        console.log("Error removing admin:", error);
        setError(error.response?.data?.message || "Failed to remove admin");
        
    }

  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6 text-white">
          <ShieldCheck className="text-indigo-400" />
          Admin Access
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg">
             <Info className="inline mr-2" /> {error}
          </div>
        )}

        {
            success && (
              <div className="mb-4 p-3 bg-green-500/20 text-green-400 rounded-lg">
                <CheckCheck className="inline mr-2" /> {success}
              </div>
            )
          }

        {/* Add Admin */}
        <div className="flex gap-2 mb-6">
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#0b0f1a] border border-gray-700 rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addAdmin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            <Plus size={16} />
           {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Admin List */}
        <div className="space-y-3">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between bg-[#0b0f1a] border border-gray-700 rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-gray-200 font-medium">{admin.email}</p>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  {admin.role}
                </span>
              </div>

              <button
                onClick={() => removeAdmin(admin.email)}
                className="text-red-400 hover:text-red-500"
              >
               {admin.role === "SuperAdmin" ? null : <Trash2 size={18} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}