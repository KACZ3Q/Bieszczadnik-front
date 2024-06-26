"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { registerUserAction } from "@/data/actions/auth";
import { ZodErrors } from "../validation/ZodErrors";
import { StrapiErrors } from "../strapi/StrapiErrors";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SignupForm() {
  const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1 items-center">
            <CardTitle className="text-3xl font-bold">Rejestracja</CardTitle>
            <CardDescription>
              Wprowadź swoje dane, aby utworzyć nowe konto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Login</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="login"
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Hasło</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="hasło"
                  className="flex-1 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label="toggle password visibility"
                  className="absolute inset-y-0 right-2 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">Zarejestruj</Button>
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Posiadasz już konto?
          <Link className="underline ml-2" href="logowanie">
            Zaloguj się
          </Link>
        </div>
      </form>
    </div>
  );
}
