import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner"
import { backendRequest } from "@/services/backendRequest";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
export function SignUp() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", location: "", availability: "", ispublic: true, agreed: false });
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSignUp = async () => {
        const { name, email, password, location, availability } = formData;
        if (!name || !email || !password || !location || !availability) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        try {
            const response = await backendRequest({
                url: "http://localhost:8000/signup/",
                method: "POST",
                data: formData,
            });

            console.log("Signup successful:", response);
            // You can add toast.success or redirect here
            toast.success("Successful Signup");
            // login(response.user);
            login(response.user);
            navigate("/");



        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };


    return (
        <main className="min-h-[90vh] flex items-center justify-center bg-background text-foreground">
            <Card className="w-full max-w-md bg-background ">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

                    <Input
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background text-foreground"
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background text-foreground"
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-background text-foreground"
                    />
                    <Input
                        placeholder="Enter your Current Location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="bg-background text-foreground"
                    />

                    <Select
                        onValueChange={(value) => setFormData({ ...formData, availability: value })}
                    >
                        <SelectTrigger className="bg-background text-foreground w-full">
                            <SelectValue placeholder="Select Availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={() => setFormData({ ...formData, ispublic: true })}
                    >
                        <SelectTrigger className="bg-background text-foreground w-full">
                            <SelectValue placeholder="Account Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" checked={formData.ispublic} onCheckedChange={() => setFormData({ ...formData, agreed: true })} />
                        <label htmlFor="terms" className="text-sm">
                            I agree to the <a href="/terms" className="text-blue-400 hover:underline">terms and conditions</a>
                        </label>
                    </div>

                    <Button className="w-full" onClick={onSignUp}>Create Account</Button>
                    <p className="text-sm text-center mt-4">
                        Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
                    </p>

                </CardContent>
            </Card>
        </main>
    );
}