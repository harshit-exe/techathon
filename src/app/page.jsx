"use client";

import Home from "@/components/Home/Hero";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
const page = () => {
  const { user } = useAuth();
  console.log(`User : ${user}`);
  return (
    <>
      <Home />
    </>
  );
};

export default page;
