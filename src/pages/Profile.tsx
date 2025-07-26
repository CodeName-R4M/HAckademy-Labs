import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { updateProfile, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Shield, Award, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);

  // Form state initialized from Firebase user
  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    bio: "",
    avatar: user?.photoURL || "https://randomuser.me/api/portraits/men/32.jpg",
  });
  const [originalForm, setOriginalForm] = useState(form);

  // Load extra profile data (bio, points, problemsSolved) from Firestore
  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setForm((prev) => ({
            ...prev,
            bio: data.bio || "",
            avatar:
              user.photoURL || "https://randomuser.me/api/portraits/men/32.jpg",
          }));
          setOriginalForm((prev) => ({
            ...prev,
            bio: data.bio || "",
            avatar:
              user.photoURL || "https://randomuser.me/api/portraits/men/32.jpg",
          }));
          setPoints(data.points || 0);
          setProblemsSolved(data.problemsSolved || 0);
        }
      }
    }
    fetchProfile();
  }, [user]);

  // Keep form in sync with Firebase user
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
        avatar:
          user.photoURL || "https://randomuser.me/api/portraits/men/32.jpg",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        await updateProfile(user, {
          displayName: form.name,
          photoURL: form.avatar,
        });
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            bio: form.bio,
            avatar: form.avatar,
            points,
            problemsSolved,
          },
          { merge: true }
        );
        setEditing(false);
        setOriginalForm(form); // <-- Add this line
        alert("Profile updated!");
      }
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-10">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md border border-green-100 relative">
        {/* Back to Home */}
        <Button
          type="button"
          variant="ghost"
          className="absolute left-4 top-4 flex items-center gap-2 text-green-700 hover:bg-green-50"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Button>

        <div className="flex flex-col items-center mb-6 mt-2">
          <Shield className="h-10 w-10 text-green-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile</h2>
          <p className="text-gray-500 text-sm">Manage your account details</p>
        </div>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={form.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-green-400 object-cover mb-2 shadow-lg"
            />
            {editing && (
              <input
                type="text"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 mb-2"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                !editing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 ${
                !editing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              rows={3}
            />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded shadow">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700">
                {points} Points
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded shadow">
              <span className="font-semibold text-green-700">
                {problemsSolved} Problems Solved
              </span>
            </div>
          </div>
          <div className="border-t border-green-100 my-6"></div>
          <div className="flex justify-end gap-3 mt-6">
            {editing ? (
              <>
                <Button
                  type="submit"
                  className="bg-green-600 text-white"
                  disabled={loading}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm(originalForm);
                    setEditing(false);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : null}
          </div>
        </form>
        {!editing && (
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              className="bg-green-600 text-white"
              onClick={() => {
                setOriginalForm(form);
                setEditing(true);
              }}
            >
              Edit Profile
            </Button>
          </div>
        )}
        {/* Logout Button */}
        <div className="flex justify-center mt-10">
          <Button
            type="button"
            variant="destructive"
            className="flex items-center gap-2 px-6 py-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
