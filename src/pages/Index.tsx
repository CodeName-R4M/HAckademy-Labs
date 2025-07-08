import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Code, BookOpen, Target, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  HAckademy Labs
                </h1>
                <p className="text-sm text-green-600">
                  Master Web Security Through Practice
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  Browse Labs
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Not just Learn but practice Cybersecurity
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Master web security vulnerabilities with interactive labs,
              real-world scenarios, and step-by-step guidance. From beginner to
              advanced - secure your future in cybersecurity.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3 text-lg"
              >
                <Code className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Vulnerabilities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Most Common Web Vulnerabilities
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start with these essential security vulnerabilities that every
              developer should understand. Each lab includes theory, practice,
              and real-world examples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topAttacks.map((attack, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow border-green-100 hover:border-green-200"
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
                  <CardTitle className="text-xl text-gray-900">
                    {attack.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {attack.description}
                  </CardDescription>
                  <Link to="/dashboard">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Start Lab
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                View All Labs (10+)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose HAckademy Labs?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Interactive Labs
              </h4>
              <p className="text-gray-600">
                Practice in safe, sandboxed environments with real-world
                scenarios and guided walkthroughs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Code Examples
              </h4>
              <p className="text-gray-600">
                Learn with syntax-highlighted code blocks and step-by-step
                explanations of vulnerabilities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Security First
              </h4>
              <p className="text-gray-600">
                Learn defensive techniques alongside attack methods to build
                comprehensive security knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">HAckademy LAbs</span>
          </div>
          <p className="text-center text-gray-400">
            Empowering the next generation of cybersecurity professionals
            through hands-on learning
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
