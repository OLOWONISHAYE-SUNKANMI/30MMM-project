"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleLoginButton from "@/components/common/GoogleSignIn";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !passwordConfirm || !agreedToTerms) {
      // Handle validation errors
      return;
    }
    
    if (password !== passwordConfirm) {
      // Handle password mismatch
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Implement your signup logic here
      // Example: await signUpUser(email, password);
      
      // Redirect or show success message
    } catch (error) {
      // Handle signup error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Sign up to continue the login process. 
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <GoogleLoginButton />
            </div>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                placeholder="Enter the same password again"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setAgreedToTerms}
                required
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/Terms">
                  <span className="text-primary-red hover:text-red-800 hover:underline hover:decoration-primary-red hover:underline-offset-2">
                    terms and conditions
                  </span>
                </Link>
              </label>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !agreedToTerms}
            className="w-full bg-primary-red hover:bg-red-800"
            type="submit"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </Button>
        </CardFooter>
        
        <div className="pb-6 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-primary-red hover:text-red-800 hover:underline hover:decoration-primary-red hover:underline-offset-2">
                Log in
              </span>
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default UserSignUp;