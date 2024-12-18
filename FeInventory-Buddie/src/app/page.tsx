import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
    <>
      <div className="px-5 pb-4 pt-4 lg:container lg:m-auto lg:max-w-[846px]">
        <h1 className="text-info text-center text-[32px] font-medium lg:pb-6 lg:pt-11 lg:text-5xl">
          Start monitoring your website Inventory Product
        </h1>
        <p className="mt-6 text-center text-base text-[16px] text-primary lg:text-[18px]">
          Get a birds eye view with our customizable dashboard. Stay on top of
          things! Revamp your work process with our game-changing feature. Boost
          productivity and efficiency!
        </p>
        <div className="flex flex-row items-center justify-center my-6 gap-6">
        <button className="rounded bg-[#4328EB] px-8 py-4 text-[18px] font-medium text-white">
          <a href="/auth/signup">Try App</a>
        </button>

        <Link
          className="flex items-center gap-x-3 text-[16px] font-medium text-[#4328EB] "
          href="/auth/signup"
        >
          Sign Up
          <Image
            src={"/images/blue-button.svg"}
            alt="BluArrow"
            width={32}
            height={32}
          />
        </Link>
        </div>
      </div>
      <div className="relative flex h-full w-full justify-center">
        <Image
          src={"/images/Gradient.svg"}
          width={32}
          height={32}
          className="min-h-[400px] w-full object-cover sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
          alt="Gradient"
        />
        <div className="absolute mx-auto">
          <img
            className="mx-auto w-3/4"
            src={"/images/landing.png"}
            alt="heroImage"
          />
        </div>
      </div>
    </>
  );
}
