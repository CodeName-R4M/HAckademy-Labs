import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Shield, Award } from "lucide-react";

export default function Profile() {
  const user = auth.currentUser;
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
        // Update Firebase Auth profile
        await updateProfile(user, {
          displayName: form.name,
          photoURL: form.avatar,
        });
        // Update Firestore profile (bio, points, problemsSolved)
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
        alert("Profile updated!");
      }
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center py-10">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <Shield className="h-10 w-10 text-green-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Profile</h2>
          <p className="text-gray-500 text-sm">Manage your account details</p>
        </div>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={form.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-2 border-green-400 object-cover mb-2 shadow"
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
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-700">
                {points} Points
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded">
              <span className="font-semibold text-green-700">
                {problemsSolved} Problems Solved
              </span>
            </div>
          </div>
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
                  onClick={() => setEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
