
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, ChevronRight, Clock, Trophy, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const labs = [
    {
      id: "sql-injection",
      name: "SQL Injection",
      description: "Learn how attackers manipulate database queries through user input to access unauthorized data.",
      category: "Web Attacks",
      difficulty: "Beginner",
      duration: "30 min",
      completed: false,
      icon: "🗄️",
      impact: "Critical - Can lead to data theft, unauthorized access, and system compromise"
    },
    {
      id: "xss",
      name: "Cross-Site Scripting (XSS)",
      description: "Understand how malicious scripts can be injected into web pages to steal user data.",
      category: "Web Attacks",
      difficulty: "Beginner",
      duration: "25 min",
      completed: false,
      icon: "🔗",
      impact: "High - Enables session hijacking, data theft, and malicious redirects"
    },
    {
      id: "phishing",
      name: "Phishing Attack",
      description: "Simulate realistic phishing attempts and learn prevention techniques.",
      category: "Social Engineering",
      difficulty: "Intermediate",
      duration: "40 min",
      completed: false,
      icon: "🎣",
      impact: "High - Primary vector for credential theft and malware distribution"
    },
    {
      id: "weak-passwords",
      name: "Weak Password Attacks",
      description: "Explore brute-force attacks and password cracking methods with practical demonstrations.",
      category: "Authentication",
      difficulty: "Beginner",
      duration: "35 min",
      completed: false,
      icon: "🔐",
      impact: "Medium - Leads to unauthorized account access and privilege escalation"
    },
    {
      id: "idor",
      name: "IDOR (Insecure Direct Object Reference)",
      description: "Access unauthorized data by manipulating object references in URLs and parameters.",
      category: "Web Attacks",
      difficulty: "Intermediate",
      duration: "30 min",
      completed: false,
      icon: "🔓",
      impact: "High - Allows access to sensitive data belonging to other users"
    },
    {
      id: "arp-spoofing",
      name: "ARP Spoofing",
      description: "Theory and command simulation of ARP spoofing attacks on local networks.",
      category: "Network Attacks",
      difficulty: "Advanced",
      duration: "45 min",
      completed: false,
      icon: "🌐",
      impact: "High - Enables man-in-the-middle attacks and network surveillance"
    },
    {
      id: "cors-misconfig",
      name: "CORS Misconfiguration",
      description: "Learn to exploit Cross-Origin Resource Sharing misconfigurations.",
      category: "Web Attacks",
      difficulty: "Intermediate",
      duration: "25 min",
      completed: false,
      icon: "🔄",
      impact: "Medium - Allows unauthorized cross-origin requests and data access"
    },
    {
      id: "clickjacking",
      name: "Clickjacking",
      description: "Create iframe overlay traps to trick users into performing unintended actions.",
      category: "Web Attacks",
      difficulty: "Beginner",
      duration: "20 min",
      completed: false,
      icon: "👆",
      impact: "Medium - Tricks users into performing actions without their knowledge"
    },
    {
      id: "file-upload",
      name: "Malicious File Upload",
      description: "Learn about dangerous file upload vulnerabilities and bypassing restrictions.",
      category: "Web Attacks",
      difficulty: "Intermediate",
      duration: "35 min",
      completed: false,
      icon: "📁",
      impact: "Critical - Can lead to remote code execution and system compromise"
    },
    {
      id: "broken-auth",
      name: "Broken Authentication",
      description: "Explore session hijacking techniques and learn proper authentication fixes.",
      category: "Authentication",
      difficulty: "Advanced",
      duration: "50 min",
      completed: false,
      icon: "🔑",
      impact: "Critical - Complete account takeover and unauthorized access"
    }
  ];

  const categories = [
    { id: "all", name: "All Labs", count: labs.length },
    { id: "Web Attacks", name: "Web Attacks", count: labs.filter(lab => lab.category === "Web Attacks").length },
    { id: "Authentication", name: "Authentication", count: labs.filter(lab => lab.category === "Authentication").length },
    { id: "Social Engineering", name: "Social Engineering", count: labs.filter(lab => lab.category === "Social Engineering").length },
    { id: "Network Attacks", name: "Network Attacks", count: labs.filter(lab => lab.category === "Network Attacks").length }
  ];

  const filteredLabs = selectedCategory === "all" 
    ? labs 
    : labs.filter(lab => lab.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">CyberGuard Academy</h1>
                  <p className="text-sm text-green-600">Security Labs Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Trophy className="h-4 w-4" />
                <span>Progress: 0/10 completed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-green-100 text-green-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 text-sm">Quick Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Labs</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-medium text-green-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-medium text-blue-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === "all" ? "All Security Labs" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Choose a lab to start learning about cybersecurity vulnerabilities through hands-on practice.
              </p>
            </div>

            <div className="grid gap-6">
              {filteredLabs.map((lab) => (
                <Card key={lab.id} className="hover:shadow-lg transition-shadow border-green-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lab.icon}</span>
                        <div>
                          <CardTitle className="text-xl text-gray-900">{lab.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getDifficultyColor(lab.difficulty)}>
                              {lab.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {lab.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {lab.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to={`/lab/${lab.id}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Start Lab
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-3 leading-relaxed">
                      {lab.description}
                    </CardDescription>
                    <div className="bg-red-50 border border-red-100 rounded-md p-3">
                      <p className="text-sm text-red-800">
                        <strong>Real-world Impact:</strong> {lab.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
