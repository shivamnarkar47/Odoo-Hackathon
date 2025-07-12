import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const MyProfile: React.FC = () => {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(user);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setHasChanges(JSON.stringify(formData) !== JSON.stringify(user));
  }, [formData, user]);

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean | string[]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    login(formData); // Updates context and localStorage
  };

  const handleDiscard = () => {
    setFormData(user);
  };

  if (!formData) return null; // Skip render if data not loaded yet

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-muted rounded-xl shadow-sm p-6 flex flex-col items-center">
            <div className="relative mb-5">
              <img
                src={formData.profile_pic || "/avatar.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
            </div>

            <h2 className="text-2xl font-bold text-center">{formData.name}</h2>
            <p className="text-muted-foreground mt-1">{formData.email}</p>

            <div className="mt-4 w-full space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-muted">
                <span className="text-muted-foreground">Location</span>
                <span>{formData.location}</span>
              </div>

              <div className="flex justify-center mt-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${formData.is_public
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {formData.is_public ? "Public Profile" : "Private Profile"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-muted rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-muted">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your personal information and preferences
              </p>
            </div>

            <div className="p-6">
              {/* Personal Info */}
              <div className="space-y-6">
                <section>
                  <h3 className="font-medium text-lg mb-4 text-primary">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm">Full Name</label>
                      <input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm">Email</label>
                      <input
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-sm">Location</label>
                      <input
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </section>

                {/* Skills Section (same logic retained for add/remove) */}
                {/* Preferences */}
                <section>
                  <h3 className="font-medium text-lg mb-4 text-primary">
                    Preferences
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    <div className="space-y-2">
                      <label className="block text-muted-foreground text-sm">
                        Availability
                      </label>
                      <button
                        onClick={() =>
                          handleChange("availability", !formData.availability)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium ${formData.availability
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                          }`}
                      >
                        {formData.availability ? "Available" : "Unavailable"}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-muted-foreground text-sm">
                        Profile Visibility
                      </label>
                      <button
                        onClick={() =>
                          handleChange("is_public", !formData.is_public)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium ${formData.is_public
                          ? "bg-blue-600 text-white"
                          : "bg-gray-400 text-white"
                          }`}
                      >
                        {formData.is_public ? "Public" : "Private"}
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <div className="flex justify-end gap-3 pt-8 mt-6 border-t border-muted">
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  disabled={!hasChanges}
                  className={!hasChanges ? "opacity-50 cursor-not-allowed" : ""}
                >
                  Discard Changes
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className={!hasChanges ? "opacity-50 cursor-not-allowed" : ""}
                >
                  Save Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
