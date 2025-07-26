import TopBar from "../components/TopBar";
import { Shield, Code, BookOpen, Target, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { signInWithPopup, provider, auth, signOut } from "../utils/firebase";

const Index = () => {
  const topAttacks = [
    {
      name: "SQL Injection",
      description:
        "Learn how attackers manipulate database queries through user input",
      difficulty: "Beginner",
      icon: "🗄️",
    },
    {
      name: "Cross-Site Scripting (XSS)",
      description:
        "Understand how malicious scripts can be injected into web pages",
      difficulty: "Beginner",
      icon: "🔗",
    },
    {
      name: "Phishing Attack",
      description:
        "Simulate realistic phishing attempts and learn prevention techniques",
      difficulty: "Intermediate",
      icon: "🎣",
    },
    {
      name: "Weak Password Attacks",
      description: "Explore brute-force attacks and password cracking methods",
      difficulty: "Beginner",
      icon: "🔐",
    },
    {
      name: "IDOR (Insecure Direct Object Reference)",
      description: "Access unauthorized data by manipulating object references",
      difficulty: "Intermediate",
      icon: "🔓",
    },
  ];

  const stats = [
    { label: "Security Labs", value: "10+", icon: Target },
    { label: "Active Learners", value: "2.5K+", icon: Users },
    { label: "Completion Rate", value: "87%", icon: Award },
  ];

  // Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert("Logout failed");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left side: logo, title, subtitle */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600 animate-bounce" />
              <h1 className="text-xl md:text-3xl font-bold transition-all duration-300 hover:text-green-700 animate-fade-in">
                HAckademy LAbs
              </h1>
            </div>
            {/* Subtitle hidden on mobile */}
            <span className="hidden md:block text-base md:text-lg font-semibold text-green-600 mt-2 md:ml-11 animate-fade-in">
              Master Web Security Through Practice
            </span>
          </div>
          {/* Right side: profile dropdown */}
          <div className="hidden md:flex gap-2 md:gap-4 w-full md:w-auto justify-end items-center">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  className="flex items-center gap-2 focus:outline-none"
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-green-400 object-cover"
                  />
                  <span className="font-semibold text-gray-900">
                    {user?.displayName || "CodeName R4M"}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 text-left"
                      onClick={() => setProfileOpen(false)}
                    >
                      Show Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleLogin} className="bg-green-600 text-white">
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Learn Cybersecurity Through
              <span className="text-green-600"> Hands-On Practice</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Master web security vulnerabilities with interactive labs,
              real-world scenarios, and step-by-step guidance. From beginner to
              advanced - secure your future in cybersecurity.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12">
              {!user && (
                <Button
                  onClick={handleLogin}
                  size="lg"
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-3 text-base md:text-lg w-full md:w-auto"
                >
                  Login
                </Button>
              )}
              <Link to="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-3 text-base md:text-lg w-full md:w-auto"
                  disabled={!user}
                >
                  Browse Labs
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 px-6 py-3 text-base md:text-lg w-full md:w-auto"
              >
                <Code className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-base md:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Vulnerabilities */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              Most Common Web Vulnerabilities
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Start with these essential security vulnerabilities that every
              developer should understand. Each lab includes theory, practice,
              and real-world examples.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {topAttacks.map((attack, index) => (
              <Card
                key={index}
                className="hover:shadow-lg hover:scale-105 transition-all duration-300 border-green-100 hover:border-green-200 animate-fade-in"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{attack.icon}</span>
                    <Badge
                      variant={
                        attack.difficulty === "Beginner"
                          ? "secondary"
                          : "default"
                      }
                      className={
                        attack.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {attack.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl text-gray-900">
                    {attack.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed text-base md:text-lg">
                    {attack.description}
                  </CardDescription>
                  <Link to="/dashboard">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-base md:text-lg">
                      Start Lab
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 w-full md:w-auto"
              >
                View All Labs (10+)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              Why Choose HAckademy LAbs?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Interactive Labs
              </h4>
              <p className="text-gray-600 text-base md:text-lg">
                Practice in safe, sandboxed environments with real-world
                scenarios and guided walkthroughs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Code Examples
              </h4>
              <p className="text-gray-600 text-base md:text-lg">
                Learn with syntax-highlighted code blocks and step-by-step
                explanations of vulnerabilities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                Security First
              </h4>
              <p className="text-gray-600 text-base md:text-lg">
                Learn defensive techniques alongside attack methods to build
                comprehensive security knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-lg md:text-xl font-bold">HAckademy LAbs</span>
          </div>
          <p className="text-center text-gray-400 text-base md:text-lg">
            Empowering the next generation of cybersecurity professionals
            through hands-on learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
