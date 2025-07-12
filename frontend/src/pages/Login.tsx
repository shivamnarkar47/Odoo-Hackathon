import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { backendRequest } from "@/services/backendRequest"; // adjust path as needed
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in both fields.");
            return;
        }

        try {
            const response = await backendRequest({
                url: "http://localhost:8000/login/",
                method: "POST",
                data: { email, password },
            });

            // Assuming successful login returns user or token
            toast.success("Login successful!");
            console.log(response);
            navigate("/"); // or wherever you'd like to redirect
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center dark:bg-background dark:text-foreground">
            <Card className="w-full max-w-md dark:bg-background/35 dark:text-foreground border-2">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Login</h2>

                    <Input
                        placeholder="Email"
                        type="email"
                        className="dark:bg-background dark:text-foreground"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        className="dark:bg-background dark:text-foreground"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button className="w-full" onClick={handleLogin}>
                        Login
                    </Button>

                    <p className="text-sm text-center mt-4">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-400 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
