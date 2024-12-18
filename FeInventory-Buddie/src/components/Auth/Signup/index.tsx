"use client";
import Link from "next/link";
import React from "react";
import SignupWithEmail from "@/components/Auth/SigninWithEmail";

export default function Signup() {
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Join Us Today! 🚀
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Create your account and start exploring new possibilities.
        </p>
      </div>

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium text-gray-500 dark:bg-gray-dark dark:text-gray-400">
          Or sign up with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SignupWithEmail />
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-700 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
