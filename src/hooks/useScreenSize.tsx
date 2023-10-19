"use client";

import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [size, setSize] = useState(0);

  // NextJS is annoying
  useEffect(() => {
    setSize(window.innerWidth);
  }, []);

  // a better and more accurate implementation would be to add a window resize listener and update these accordingly
  // but for this situation this is fine
  return size < 1024;
}
