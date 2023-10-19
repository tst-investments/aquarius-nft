"use client";

import MintPage from "@/components/pages/mint";
import { constants } from "@/constants";

import React from "react";

const CameraComponent = () => {
  const { isClosed } = constants;

  if (isClosed) return null;

  return <MintPage />;
};

export default CameraComponent;
