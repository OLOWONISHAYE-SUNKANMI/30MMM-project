"use client";

import React, { useState } from "react";
import { logInAction, signUpAction } from "@/actions/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form({ isSignUp = true }) {
  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (isSignUp && password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      if (isSignUp) {
        toast("Signing up...");
        await signUpAction("credentials", {
          email,
          password,
          name: firstName + " " + lastName,
        });
      } else {
        toast("Logging in...");
        await logInAction("credentials", {
          email,
          password,
        });
      }
    } catch (error) {
      setError(error.message || "An error occurred during authentication");
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
      toast(isSignUp ? "Account created successfully" : "Login successful");
    }
  };

  return (
    <Card className="w-full border-none shadow-none outline-none">
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {isSignUp && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
                required
              />
            </div>
            {isSignUp && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="password_confirmation">
                    Confirm Password
                  </Label>
                  <Input
                    id="password_confirmation"
                    className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              </>
            )}

            {error && (
              <div className="text-sm font-medium text-red-500">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : isSignUp ? (
                "Create an account"
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </CardContent>
      </form>
      <CardFooter>
        {/* Login Link */}
        <div className="mb-5 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
          <span className="gap-2 tracking-tight">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <Link
            href={isSignUp ? "/login" : "/signup"}
            className="tracking-tighter text-primary-red"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
