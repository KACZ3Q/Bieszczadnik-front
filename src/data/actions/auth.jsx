"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getAuthToken } from "../services/get-token";
import { getUserMeLoader } from "../services/get-user-me-loader";

import { registerUserService, loginUserService } from "../services/auth";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 tydzień
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3, {
    message: "Nazwa użytkownika musi mieć co najmniej 3 znaki",
  }).max(20, {
    message: "Nazwa użytkownika może mieć maksymalnie 20 znaków",
  }),
  password: z.string().min(6, {
    message: "Hasło musi mieć co najmniej 6 znaków",
  }).max(100, {
    message: "Hasło może mieć maksymalnie 100 znaków",
  }),
  email: z.string().email({
    message: "Proszę podać prawidłowy adres email",
  }),
});

export async function registerUserAction(prevState, formData) {

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Brakujące pola. Rejestracja nie powiodła się.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ups! Coś poszło nie tak. Spróbuj ponownie.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Rejestracja nie powiodła się.",
    };
  }

  const responseCookies = cookies();
  responseCookies.set("jwt", responseData.jwt, config);
  redirect("/profil");

}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identyfikator musi mieć co najmniej 3 znaki",
    })
    .max(20, {
      message: "Proszę podać prawidłową nazwę użytkownika lub adres email",
    }),
  password: z
    .string()
    .min(6, {
      message: "Hasło musi mieć co najmniej 6 znaków",
    })
    .max(50, {
      message: "Hasło musi mieć od 6 do 50 znaków",
    }),
});

export async function loginUserAction(prevState, formData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Brakujące pola. Logowanie nie powiodło się.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ups! Coś poszło nie tak. Spróbuj ponownie.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Logowanie nie powiodło się.",
    };
  }

  const responseCookies = cookies();
  responseCookies.set("jwt", responseData.jwt, config);

  redirect("/profil");
}

export async function logoutAction() {
  const responseCookies = cookies();
  responseCookies.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export async function getUser() {
  const authToken = await getAuthToken();
  if (!authToken) return null;

  const userResponse = await getUserMeLoader();
  if (userResponse.ok) {
    return userResponse.data;
  }

  return null;
}