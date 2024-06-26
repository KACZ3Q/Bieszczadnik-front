"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { loginUserAction } from "@/data/actions/auth";
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

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1 items-center">
            <CardTitle className="text-3xl font-bold">Zaloguj się</CardTitle>
            <CardDescription>
              Wprowadź swoje dane, aby zalogować się na swoje konto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Login</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="login / email"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">hasło</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="hasło"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
                className="absolute right-2 top-1/2"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
              </button>
              <ZodErrors error={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">Zaloguj</Button>
            <StrapiErrors error={formState?.strapiErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Nie masz konta?
          <Link className="underline ml-2" href="rejestracja">
            Zarejestruj się
          </Link>
        </div>
      </form>
    </div>
  );
}
