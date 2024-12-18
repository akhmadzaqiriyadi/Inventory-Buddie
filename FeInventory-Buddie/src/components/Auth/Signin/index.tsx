"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome Back! 👋
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Let’s get you signed in and back to exploring.
        </p>
      </div>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium text-gray-500 dark:bg-gray-dark dark:text-gray-400">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-700 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-semibold">
            Create one now!
          </Link>
        </p>
      </div>
    </>
  );
}