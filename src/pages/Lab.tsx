
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft, CheckCircle, XCircle, Terminal, BookOpen, Flask } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Lab = () => {
  const { labId } = useParams();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Mock lab data - in a real app this would come from an API
  const labData = {
    "sql-injection": {
      name: "SQL Injection",
      description: "Learn how to exploit SQL injection vulnerabilities in login forms",
      difficulty: "Beginner",
      icon: "🗄️",
      theory: `SQL Injection is a code injection technique that exploits a security vulnerability in an application's software. The vulnerability occurs when user input is not properly sanitized before being used in SQL queries.

## How SQL Injection Works

When a web application constructs SQL queries using string concatenation with user input, an attacker can insert malicious SQL code. For example:

\`\`\`sql
-- Vulnerable query construction
"SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'"
\`\`\`

If an attacker enters \`admin'--\` as the username, the query becomes:

\`\`\`sql
SELECT * FROM users WHERE username='admin'-- AND password='anything'
\`\`\`

The \`--\` comments out the password check, potentially allowing unauthorized access.

## Common SQL Injection Payloads

- \`' OR '1'='1\` - Always true condition
- \`admin'--\` - Comment out password check  
- \`'; DROP TABLE users;--\` - Destructive payload
- \`' UNION SELECT password FROM admin_users--\` - Data extraction

## Real-World Impact

SQL injection can lead to:
- Unauthorized data access
- Data modification or deletion
- Complete database compromise
- Server takeover in some cases`,
      walkthrough: [
        {
          step: 1,
          title: "Analyze the Login Form",
          description: "Examine how the login form processes user input. Notice that it likely uses direct string concatenation to build SQL queries."
        },
        {
          step: 2,
          title: "Test Basic Injection",
          description: "Try entering `admin'--` as the username and any password. The `--` will comment out the password check in the SQL query."
        },
        {
          step: 3,
          title: "Understand the Query",
          description: "The original query: `SELECT * FROM users WHERE username='admin'-- AND password='anything'` becomes bypassed."
        },
        {
          step: 4,
          title: "Complete the Challenge",
          description: "Successfully log in using SQL injection to complete this lab."
        }
      ]
    }
  };

  const currentLab = labData[labId as keyof typeof labData];

  if (!currentLab) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lab Not Found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogin = () => {
    setAttempts(attempts + 1);
    
    // Check for common SQL injection payloads
    const sqlInjectionPayloads = [
      "admin'--",
      "' OR '1'='1",
      "admin' --",
      "' OR 1=1--",
      "admin'/*"
    ];

    const isSuccessfulInjection = sqlInjectionPayloads.some(payload => 
      username.toLowerCase().includes(payload.toLowerCase())
    );

    if (isSuccessfulInjection) {
      setIsCompleted(true);
      toast({
        title: "Lab Completed! 🎉",
        description: "You successfully exploited the SQL injection vulnerability!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try using SQL injection techniques.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Labs
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentLab.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{currentLab.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">
                      {currentLab.difficulty}
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-emerald-100 text-emerald-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Attempts: {attempts}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theory and Instructions */}
          <div className="space-y-6">
            <Tabs defaultValue="theory" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="theory">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Theory
                </TabsTrigger>
                <TabsTrigger value="walkthrough">
                  <Terminal className="h-4 w-4 mr-2" />
                  Walkthrough
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="theory" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Understanding SQL Injection</CardTitle>
                    <CardDescription>
                      Learn the fundamentals of SQL injection attacks and their impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {currentLab.theory}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="walkthrough" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Walkthrough</CardTitle>
                    <CardDescription>
                      Follow these steps to complete the lab
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentLab.walkthrough.map((step) => (
                        <div key={step.step} className="flex gap-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Lab Environment */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flask className="h-5 w-5 text-green-600" />
                  <CardTitle>Lab Environment</CardTitle>
                </div>
                <CardDescription>
                  Practice SQL injection on this vulnerable login form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isCompleted ? (
                  <div className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Objective:</strong> Bypass the login form using SQL injection techniques. 
                        Try common payloads like <code>admin'--</code> or <code>' OR '1'='1</code>
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gray-900 p-6 rounded-lg">
                      <div className="bg-white p-6 rounded border">
                        <h3 className="text-lg font-semibold mb-4 text-center text-gray-900">
                          Vulnerable Banking Login
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              type="text"
                              placeholder="Enter username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={handleLogin}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Login
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                      <strong>Hint:</strong> The backend uses a query like: 
                      <code className="block mt-1 text-xs bg-gray-100 p-2 rounded">
                        SELECT * FROM users WHERE username='{username}' AND password='{password}'
                      </code>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                    <p className="text-gray-600 mb-6">
                      You successfully exploited the SQL injection vulnerability and completed the lab.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">What you learned:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• How SQL injection works in login forms</li>
                          <li>• Common injection payloads and techniques</li>
                          <li>• The impact of unsanitized user input</li>
                          <li>• Why parameterized queries are essential</li>
                        </ul>
                      </div>
                      <div className="flex gap-3">
                        <Link to="/dashboard">
                          <Button variant="outline">
                            Back to Labs
                          </Button>
                        </Link>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Next Lab
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
