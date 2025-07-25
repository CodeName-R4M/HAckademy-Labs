import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGeminiTheory } from "../utils/gemini";
// Inline Components
const Button = ({
  children,
  className = "",
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border rounded shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;
const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);
const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);
const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

const Label = ({ children }) => (
  <label className="block text-sm font-medium mb-1">{children}</label>
);

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block px-2 py-1 text-xs bg-gray-200 rounded ${className}`}
  >
    {children}
  </span>
);

const Tabs = ({ defaultValue, children }) => {
  const [value, setValue] = useState(defaultValue);

  let triggers = [];
  let contents = [];

  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type === TabsList) {
      React.Children.forEach(child.props.children, (trigger) => {
        if (trigger && trigger.type === TabsTrigger) {
          triggers.push(
            React.cloneElement(trigger, {
              onClick: () => setValue(trigger.props.value),
              active: trigger.props.value === value,
            })
          );
        }
      });
    } else if (child.type === TabsContent) {
      contents.push(child);
    }
  });

  return (
    <div>
      <div className="flex space-x-2 border-b">{triggers}</div>
      {contents.map((content, i) =>
        content.props.value === value ? (
          <div key={i}>{content.props.children}</div>
        ) : null
      )}
    </div>
  );
};

const TabsList = ({ children, ...props }) => <div {...props}>{children}</div>;

const TabsTrigger = ({
  children,
  onClick,
  active,
  value,
  ...props
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  value: string;
  [x: string]: any;
}) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 font-medium ${
      active ? "border-b-2 border-blue-500" : "text-gray-500"
    }`}
    {...props}
    data-value={value}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, ...props }) => (
  <div {...props} data-value={value}>
    {children}
  </div>
);

const Alert = ({ children }) => (
  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 mb-3 text-sm">
    {children}
  </div>
);

const AlertDescription = ({ children }) => <div>{children}</div>;

// Icons (simplified)
const Shield = () => <span>🛡️</span>;
const ArrowLeft = () => <span>←</span>;
const CheckCircle = ({ className = "" }) => (
  <span className={className}>✅</span>
);
const Terminal = () => <span>💻</span>;
const BookOpen = () => <span>📚</span>;
const Beaker = () => <span>🧪</span>;

// Toast Hook (mock)
const useToast = () => ({
  toast: (props) => {
    alert(`${props.title}: ${props.description}`);
  },
});

const Lab = () => {
  const { labId } = useParams();
  const { toast } = useToast();

  const [geminiSolution, setGeminiSolution] = useState("");
  const [loadingSolution, setLoadingSolution] = useState(false);
  const [liveInput1, setLiveInput1] = useState("");
  const [liveInput2, setLiveInput2] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [geminiTheory, setGeminiTheory] = useState("");
  const [loadingTheory, setLoadingTheory] = useState(false);

  // Lab Data
  const labData = {
    "sql-injection": {
      name: "SQL Injection",
      description: "Exploit SQL query flaws to bypass login.",
      difficulty: "Beginner",
      icon: "🗄️",
      types: [
        {
          name: "Authentication Bypass",
          explanation:
            "Bypass login by injecting SQL that always evaluates to true.",
          example:
            "Input: admin'--\nQuery: SELECT * FROM users WHERE username='admin'-- AND password='...'",
          formFields: ["Username", "Password"],
          lab: {
            endpoint: "/api/lab/sql-injection/auth-bypass",
            hint: "Try to login as admin without knowing the password using SQL injection.",
          },
        },
      ],
      theory: `### What is SQL Injection?
SQL Injection (SQLi) allows attackers to interfere with database queries. It can lead to unauthorized data access, modification, or even full system compromise.`,
      walkthrough: [
        {
          step: 1,
          title: "Find the Input",
          description: "Try logging in with different usernames.",
        },
        {
          step: 2,
          title: "Test for Injection",
          description: "Try payloads like admin'--.",
        },
        {
          step: 3,
          title: "Bypass Authentication",
          description: "See if you can login as admin without the password.",
        },
        {
          step: 4,
          title: "Understand the Fix",
          description: "Learn about parameterized queries.",
        },
      ],
    },
    xss: {
      name: "XSS (Cross-Site Scripting)",
      description: "Inject malicious JavaScript in comments.",
      difficulty: "Intermediate",
      icon: "🧪",
      types: [
        {
          name: "Reflected XSS",
          explanation:
            "Malicious script is reflected off the web server, e.g. in a search result.",
          example: "Input: <script>alert('XSS')</script>",
          formFields: ["Comment"],
          lab: {
            endpoint: "/api/lab/xss/reflected",
            hint: "Inject a script in the comment and see if it executes.",
          },
        },
      ],
      theory: `### What is XSS?
Cross-Site Scripting (XSS) allows attackers to inject JavaScript into web pages viewed by others. This can lead to cookie theft, session hijacking, or defacing pages.`,
      walkthrough: [
        {
          step: 1,
          title: "Find Input",
          description: "Locate where user input is reflected in the page.",
        },
        {
          step: 2,
          title: "Inject Script",
          description:
            "Try <script>alert('XSS')</script> or <img src=x onerror=alert(1)>.",
        },
        {
          step: 3,
          title: "Trigger Execution",
          description: "See if your script runs in the browser.",
        },
        {
          step: 4,
          title: "Learn Mitigation",
          description: "Understand output encoding and input sanitization.",
        },
      ],
    },
    phishing: {
      name: "Phishing Email Simulator",
      description:
        "Simulate realistic phishing attempts and learn prevention techniques.",
      difficulty: "Intermediate",
      icon: "🎣",
      types: [
        {
          name: "Email Link Phishing",
          explanation: "Trick users into clicking a malicious link.",
          example:
            "Email: 'Click here to reset your password: http://evil.com'",
          formFields: ["Email Content"],
          lab: {
            endpoint: "/api/lab/phishing/email-link",
            hint: "Craft a phishing email that looks legitimate.",
          },
        },
      ],
      theory: `### What is Phishing?
Phishing tricks users into revealing sensitive information by pretending to be a trustworthy entity.`,
      walkthrough: [
        {
          step: 1,
          title: "Craft a Phishing Email",
          description:
            "Write an email that looks like it's from a trusted source.",
        },
        {
          step: 2,
          title: "Send and Analyze",
          description: "See how users might interact with your email.",
        },
        {
          step: 3,
          title: "Learn Prevention",
          description: "Understand how to spot and prevent phishing.",
        },
      ],
    },
    "weak-passwords": {
      name: "Weak Password Cracking",
      description: "Explore brute-force attacks and password cracking methods.",
      difficulty: "Beginner",
      icon: "🔐",
      types: [
        {
          name: "Dictionary Attack",
          explanation: "Try common passwords from a dictionary.",
          example: "Try: password, 123456, qwerty, etc.",
          formFields: ["Username", "Password Guess"],
          lab: {
            endpoint: "/api/lab/weak-passwords/dictionary",
            hint: "Try common passwords to login.",
          },
        },
      ],
      theory: `### What are Weak Password Attacks?
Attackers try common or all possible passwords to gain access.`,
      walkthrough: [
        {
          step: 1,
          title: "Try Common Passwords",
          description: "Attempt to login with common passwords.",
        },
        {
          step: 2,
          title: "Automate the Attack",
          description: "Use scripts to try many passwords quickly.",
        },
        {
          step: 3,
          title: "Learn Defense",
          description: "Use strong, unique passwords and rate limiting.",
        },
      ],
    },
    idor: {
      name: "Insecure Direct Object Reference (IDOR)",
      description: "Access unauthorized data by manipulating IDs.",
      difficulty: "Beginner",
      icon: "🧾",
      types: [
        {
          name: "Basic IDOR",
          explanation:
            "Change a resource ID in the URL or request to access another user's data.",
          example: "URL: /profile?id=123 → /profile?id=124",
          formFields: ["User ID"],
          lab: {
            endpoint: "/api/lab/idor/basic",
            hint: "Change the User ID to access another user's profile.",
          },
        },
      ],
      theory: `### What is IDOR?
IDOR occurs when applications expose direct access to objects via user input, without proper authorization checks.`,
      walkthrough: [
        {
          step: 1,
          title: "Login and Note User ID",
          description: "Login and observe your user ID (e.g., 101).",
        },
        {
          step: 2,
          title: "Modify the Request",
          description: "Change the ID to another value and resubmit.",
        },
        {
          step: 3,
          title: "Access Others' Data",
          description:
            "If the server doesn't validate ownership, you'll see private data.",
        },
        {
          step: 4,
          title: "Learn About Access Control",
          description: "Understand why back-end validation is essential.",
        },
      ],
    },
    "arp-spoofing": {
      name: "Man-in-the-Middle (ARP Spoofing)",
      description: "Theory and command simulation of ARP spoofing attacks.",
      difficulty: "Advanced",
      icon: "🌐",
      types: [
        {
          name: "ARP Poisoning Demo",
          explanation: "Simulate ARP cache poisoning in a virtual network.",
          example: "Attacker sends fake ARP replies to victim and gateway.",
          formFields: ["Victim IP", "Gateway IP"],
          lab: {
            endpoint: "/api/lab/arp-spoofing/demo",
            hint: "Try to poison the ARP cache by sending spoofed ARP replies.",
          },
        },
      ],
      theory: `### What is ARP Spoofing?
ARP spoofing tricks devices on a local network into sending traffic through the attacker, enabling man-in-the-middle attacks.`,
      walkthrough: [
        {
          step: 1,
          title: "Understand ARP",
          description: "Learn how ARP maps IP addresses to MAC addresses.",
        },
        {
          step: 2,
          title: "Simulate ARP Spoofing",
          description: "See how an attacker can poison the ARP cache.",
        },
        {
          step: 3,
          title: "Observe the Impact",
          description: "Traffic is intercepted or modified by the attacker.",
        },
        {
          step: 4,
          title: "Mitigation",
          description: "Use static ARP entries or network monitoring.",
        },
      ],
    },
    "cors-misconfig": {
      name: "CORS Misconfiguration Exploit",
      description:
        "Learn to exploit Cross-Origin Resource Sharing misconfigurations.",
      difficulty: "Intermediate",
      icon: "🔄",
      types: [
        {
          name: "Open CORS Policy",
          explanation: "Server allows requests from any origin.",
          example: "Origin: evil.com\nAccess-Control-Allow-Origin: *",
          formFields: ["Origin"],
          lab: {
            endpoint: "/api/lab/cors/open",
            hint: "Test if you can access sensitive data from a different origin.",
          },
        },
      ],
      theory: `### What is CORS?
CORS controls which origins can access resources on a server. Misconfigurations can allow attackers to steal data cross-origin.`,
      walkthrough: [
        {
          step: 1,
          title: "Understand CORS",
          description: "Learn how browsers enforce CORS.",
        },
        {
          step: 2,
          title: "Test CORS Policy",
          description: "Try requests from different origins.",
        },
        {
          step: 3,
          title: "Exploit Misconfig",
          description: "See if you can access protected data.",
        },
        {
          step: 4,
          title: "Mitigation",
          description: "Set strict CORS policies.",
        },
      ],
    },
    clickjacking: {
      name: "Clickjacking Demo",
      description:
        "Create iframe overlay traps to trick users into performing unintended actions.",
      difficulty: "Beginner",
      icon: "👆",
      types: [
        {
          name: "Basic Clickjacking",
          explanation:
            "Trick users into clicking hidden elements using iframes.",
          example: "A transparent iframe overlays a button.",
          formFields: ["URL to Frame"],
          lab: {
            endpoint: "/api/lab/clickjacking/basic",
            hint: "Try to overlay a button using an iframe.",
          },
        },
      ],
      theory: `### What is Clickjacking?
Clickjacking tricks users into clicking something different from what they perceive, potentially causing unintended actions.`,
      walkthrough: [
        {
          step: 1,
          title: "Create an Overlay",
          description: "Use an iframe to overlay a real page.",
        },
        {
          step: 2,
          title: "Hide the Frame",
          description: "Make the iframe transparent.",
        },
        {
          step: 3,
          title: "Trigger a Click",
          description: "See if you can trick the user into clicking.",
        },
        {
          step: 4,
          title: "Mitigation",
          description: "Use X-Frame-Options headers.",
        },
      ],
    },
    "file-upload": {
      name: "File Upload Exploit",
      description: "Learn about dangerous file upload vulnerabilities.",
      difficulty: "Intermediate",
      icon: "📁",
      types: [
        {
          name: "Unrestricted File Upload",
          explanation:
            "Upload any file type, including executables or scripts.",
          example: "Upload: shell.php",
          formFields: ["File"],
          lab: {
            endpoint: "/api/lab/file-upload/unrestricted",
            hint: "Try to upload a file that could be executed on the server.",
          },
        },
      ],
      theory: `### What is a File Upload Vulnerability?
Unrestricted file uploads can allow attackers to execute code or store malicious files on the server.`,
      walkthrough: [
        {
          step: 1,
          title: "Try Uploading Files",
          description: "Upload different file types.",
        },
        {
          step: 2,
          title: "Check Execution",
          description: "See if you can access or execute the uploaded file.",
        },
        {
          step: 3,
          title: "Learn Defense",
          description: "Restrict file types and scan uploads.",
        },
      ],
    },
    "broken-auth": {
      name: "Broken Authentication Session Fix",
      description:
        "Explore session hijacking techniques and learn proper authentication fixes.",
      difficulty: "Advanced",
      icon: "🔑",
      types: [
        {
          name: "Session Fixation",
          explanation: "Attacker sets a user's session ID before login.",
          example: "Attacker sends victim a link with a known session ID.",
          formFields: ["Session ID"],
          lab: {
            endpoint: "/api/lab/broken-auth/fixation",
            hint: "Try to login with a fixed session ID.",
          },
        },
      ],
      theory: `### What is Broken Authentication?
Broken authentication allows attackers to compromise user accounts by exploiting session management flaws.`,
      walkthrough: [
        {
          step: 1,
          title: "Understand Sessions",
          description: "Learn how sessions are managed.",
        },
        {
          step: 2,
          title: "Simulate Fixation",
          description: "Try to set a session ID before login.",
        },
        {
          step: 3,
          title: "Simulate Hijacking",
          description: "Use a stolen session cookie to access an account.",
        },
        {
          step: 4,
          title: "Mitigation",
          description: "Regenerate session IDs and use secure cookies.",
        },
      ],
    },
  };

  const currentLab = labData[labId];
  if (!currentLab) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Lab Not Found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (currentLab) {
      setLoadingTheory(true);
      const prompt = `Write exactly two clear and concise paragraphs explaining the web security vulnerability called "${currentLab.name}". The explanation must be beginner-friendly.
First paragraph: Describe what the vulnerability is and how it works in simple terms.
Second paragraph: Give a basic example scenario and list common prevention methods.
Do not use first-person language, instructions, formatting symbols, or emojis.`;

      fetchGeminiTheory(prompt).then((text) => {
        setGeminiTheory(text);
        setLoadingTheory(false);
      });
    }
  }, [labId]);

  useEffect(() => {
    if (currentLab) {
      setLoadingSolution(true);
      const simulationDetails = currentLab.types
        .map(
          (type) =>
            `Type: ${type.name}\nExplanation: ${type.explanation}\nExample: ${type.example}\nHint: ${type.lab.hint}`
        )
        .join("\n\n");

      const prompt = `Generate a clear and beginner-friendly walkthrough for solving the web security lab titled "${currentLab.name}".
The output should be formatted as a list of exactly 4 to 5 steps. Each step must have:
A short, clear title (like "Find the Input")
A brief description explaining what to do in that step.

Focus on helping the user:
1. Identify the vulnerable input.
2. Test or probe the application behavior.
3. Perform the attack using basic payloads or changes.
4. Verify if the attack succeeded.
5. End with a brief explanation of how to fix or prevent this issue.

Use the following details for context:
${simulationDetails}

Use short paragraphs. Avoid instructions, greetings, first-person language, markdown, emojis, and formatting symbols like *, -, or #. Output should be plain text only.`;

      fetchGeminiTheory(prompt).then((text) => {
        setGeminiSolution(text);
        setLoadingSolution(false);
      });
    }
  }, [labId]);

  const handleSubmit = async (endpoint) => {
    setAttempts(attempts + 1);
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: liveInput1,
          password: liveInput2,
          userId: liveInput1,
          comment: liveInput1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsCompleted(true);
        toast({ title: "Success", description: data.message });
      } else {
        toast({
          title: "Failed",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Server unreachable",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-2 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="!px-2 !py-1 text-base sm:text-sm"
              >
                <ArrowLeft />
                <span className="hidden xs:inline">Back to Labs</span>
              </Button>
            </Link>
            <div className="text-sm text-gray-600 sm:hidden">
              Attempts: {attempts}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-xl sm:text-2xl">{currentLab.icon}</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">
                {currentLab.name}
              </h1>
              <Badge>{currentLab.difficulty}</Badge>
              {isCompleted && (
                <Badge className="ml-2 bg-emerald-100 text-emerald-700">
                  <CheckCircle /> Completed
                </Badge>
              )}
            </div>
          </div>
          <div className="text-xs text-gray-600 hidden sm:block">
            Attempts: {attempts}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-2 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Desktop Tabs Section */}
        <div className="hidden sm:block">
          <Tabs defaultValue="theory">
            <TabsList>
              <TabsTrigger value="theory">
                <BookOpen /> <span className="ml-1">Theory</span>
              </TabsTrigger>
              <TabsTrigger value="walkthrough">
                <Terminal /> <span className="ml-1">Walkthrough</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="theory">
              <Card className="rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    What is {currentLab.name}?
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {currentLab.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-line text-sm sm:text-base text-gray-700 bg-gray-50 rounded-md p-3 overflow-x-auto">
                    {loadingTheory ? "Loading..." : geminiTheory}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="walkthrough">
              <Card className="rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    Walkthrough
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-line text-blue-900 bg-blue-50 border border-blue-100 rounded p-3 mb-4 text-sm sm:text-base overflow-x-auto">
                    {loadingSolution ? "Loading..." : geminiSolution}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Lab Tasks Section */}
        <div>
          {/* Mobile: Show only task names */}
          <div className="sm:hidden space-y-3">
            {currentLab.types?.map((type, idx) => (
              <Card
                key={idx}
                className="rounded-lg shadow-md p-3 flex items-center"
              >
                <Badge className="mr-2">{type.name}</Badge>
                <span className="text-base font-medium">
                  {type.explanation}
                </span>
              </Card>
            ))}
          </div>
          {/* Desktop: Show full simulation as before */}
          <div className="hidden sm:block">
            <Card className="rounded-lg shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Beaker />{" "}
                  <CardTitle className="text-base sm:text-lg">
                    Lab Simulation
                  </CardTitle>
                </div>
                <CardDescription className="text-sm sm:text-base">
                  Try exploiting each type of this vulnerability below.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {currentLab.types?.map((type, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 sm:p-4 bg-white shadow-sm mb-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <Badge>{type.name}</Badge>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {type.explanation}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="text-xs sm:text-sm">Example:</strong>
                      <pre className="bg-gray-100 p-2 rounded text-xs sm:text-sm overflow-x-auto">
                        {type.example}
                      </pre>
                    </div>
                    <div className="mb-2 text-xs sm:text-sm text-gray-600">
                      {type.lab.hint}
                    </div>

                    {!isCompleted ? (
                      <>
                        <Alert>
                          <Shield />{" "}
                          <span className="text-xs sm:text-sm">
                            Enter input to simulate this attack.
                          </span>
                        </Alert>
                        {type.formFields.map((label, i) => (
                          <div key={i} className="mb-2">
                            <Label>{label}</Label>
                            <Input
                              placeholder={`Enter ${label.toLowerCase()}`}
                              value={i === 0 ? liveInput1 : liveInput2}
                              onChange={(e) =>
                                i === 0
                                  ? setLiveInput1(e.target.value)
                                  : setLiveInput2(e.target.value)
                              }
                              className="text-base sm:text-sm"
                            />
                          </div>
                        ))}
                        {type.name === "Authentication Bypass" &&
                          labId === "sql-injection" && (
                            <div className="mb-4">
                              <Label>Live SQL Query Preview:</Label>
                              <pre className="bg-gray-100 p-2 rounded text-xs sm:text-sm overflow-x-auto text-red-700 border border-red-200">
                                {`SELECT * FROM users WHERE username='${liveInput1}' AND password='${liveInput2}'`}
                              </pre>
                              <div className="text-xs text-gray-500 mt-1">
                                This is how your input is used in the SQL query.
                                Try entering <strong>admin'--</strong> as
                                username!
                              </div>
                            </div>
                          )}
                        <Button
                          onClick={() => handleSubmit(type.lab.endpoint)}
                          className="w-full py-3 mt-4 text-base sm:text-sm"
                        >
                          Submit
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto" />
                        <h3 className="text-lg sm:text-xl font-bold mt-4">
                          Challenge Completed!
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          You have successfully demonstrated the vulnerability.
                        </p>
                        <Link to="/dashboard">
                          <Button className="mt-4 w-full sm:w-auto">
                            Back to Dashboard
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom App Bar for Tabs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex sm:hidden z-50">
        <button
          className="flex-1 py-3 flex flex-col items-center justify-center text-blue-600"
          onClick={() =>
            alert("Show Theory (implement modal or drawer if needed)")
          }
        >
          <BookOpen />
          <span className="text-xs mt-1">Theory</span>
        </button>
        <button
          className="flex-1 py-3 flex flex-col items-center justify-center text-blue-600"
          onClick={() =>
            alert("Show Walkthrough (implement modal or drawer if needed)")
          }
        >
          <Terminal />
          <span className="text-xs mt-1">Walkthrough</span>
        </button>
      </div>
    </div>
  );
};

export default Lab;
