import Button from "@mui/material/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    console.log("Register:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="space-y-4">
          <div className="text-center">
            {type === "signup" ? (
              <>
                <h1 className="text-3xl font-bold mb-1">Create Account</h1>
                <p className="text-muted-foreground">
                  Join BlogHub and start sharing your ideas
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">
                  Sign in to your BlogHub account
                </p>
              </>
            )}
          </div>

          <div className="border border-border rounded-lg p-8 bg-card/50">
            <form onSubmit={handleRegister} className="space-y-2">
              {type === "signup" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white 
                                    px-4 py-3 rounded-md focus:outline-none 
                                focus:border-[#6b6bff] placeholder-gray-500 transition"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white 
                            px-4 py-3 rounded-md focus:outline-none 
                          focus:border-[#6b6bff] placeholder-gray-500 transition"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white 
                            px-4 py-3 rounded-md focus:outline-none 
                          focus:border-[#6b6bff] placeholder-gray-500 transition"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {type === "signup" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-white 
                            px-4 py-3 rounded-md focus:outline-none 
                          focus:border-[#6b6bff] placeholder-gray-500 transition"
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black rounded-lg"
              >
                {type === "singup" ? "Create Account" : "Login"}
              </Button>
            </form>
          </div>

          {type === "signup" ? (
            <div className="text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent-primary hover:underline font-semibold"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent-primary hover:underline font-semibold"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
