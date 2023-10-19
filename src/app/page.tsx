"use client";

import { HomePage } from "@/components/HomePage";
import { MINSTA_META } from "@/data/fallback";
import { Metadata } from "next";
import LayoutCube from "@/components/LayoutCube";
import ContentContainer from "@/components/SmoothScroll";
import useScreenSize from "@/hooks/useScreenSize";
import { motion } from "framer-motion";
import { MutableRefObject, useEffect, useRef, useState } from "react";

function useHandlerState<T>(
  initialValue: T
): [T, MutableRefObject<T>, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<T>(initialValue);
  const updateValue = (value: T) => {
    ref.current = value;
    setValue(value);
  };

  return [value, ref, updateValue];
}

// export const metadata: Metadata = {
//   openGraph: {
//     title: process.env.NEXT_PUBLIC_META_TITLE ?? MINSTA_META.title,
//     description:
//       process.env.NEXT_PUBLIC_META_DESCRIPTION ?? MINSTA_META.description,
//     images: [
//       {
//         type: "image/png",
//         url: process.env.NEXT_PUBLIC_META_IMAGE ?? MINSTA_META.image,
//         width: "1200",
//         height: "630",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: process.env.NEXT_PUBLIC_META_TITLE ?? MINSTA_META.title,
//     description:
//       process.env.NEXT_PUBLIC_META_DESCRIPTION ?? MINSTA_META.description,
//     siteId: "1467726470533754880",
//     creator: "Mintbase",
//     images: process.env.NEXT_PUBLIC_META_IMAGE ?? MINSTA_META.image,
//   },
//   title: process.env.NEXT_PUBLIC_META_TITLE ?? MINSTA_META.title,
//   description:
//     process.env.NEXT_PUBLIC_META_DESCRIPTION ?? MINSTA_META.description,
// };

export default function Home() {
  const [lock, lockRef, setLock] = useHandlerState(true);
  const [step, stepRef, setAnimationStep] = useHandlerState<number>(0);
  const isReducedSize = useScreenSize();

  const lockDocument = () => {
    if (step === 1) return;
    window.scrollTo({ top: 0 });
    setLock(true);
  };
  const unlockDocument = () => {
    setLock(false);
  };
  const scrollHandler = (e: Event) => {
    if (lockRef.current) {
      window.scrollTo({ top: 0 });
      return;
    }

    if (stepRef.current === 0 && window.scrollY > 0) {
      lockDocument();
      setAnimationStep(1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window?.addEventListener("scroll", scrollHandler);

    return () => window?.removeEventListener("scroll", scrollHandler);
  }, []);
  // return <HomePage />;

  return (
    <main className="w-full flex items-center justify-center font-[Borna]">
      <motion.section
        className="w-full h-screen flex flex-col lg:flex-row items-center justify-center fixed top-0 left-0 max-w-full min-w-full bg-black"
        transition={{ duration: 0.5, delay: 0 }}
        initial="initial"
        animate="show"
        variants={mainContainerVariants}
        onAnimationComplete={() => {
          if (isReducedSize) {
            setAnimationStep(1);
          }
        }}
      >
        <LayoutCube
          className="hidden lg:block top-6 left-6 bg-default-400"
          initialRounded={true}
        />
        <LayoutCube
          className="hidden lg:block bottom-6 left-6 bg-default-400"
          initialRounded={true}
        />
        <LayoutCube
          className="hidden lg:block top-6 right-6"
          initialRounded={true}
        />
        <LayoutCube
          className="hidden lg:block bottom-6 right-6"
          initialRounded={true}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute hidden lg:inline-block rotate-90 uppercase font-semibold text-default-600 top-1/2 -translate-y-1/2 -left-14 tracking-[1px] text-sm"
          transition={{ delay: 0.35 }}
          inherit={false}
        >
          aquarius financial
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute hidden lg:inline-block -rotate-90 uppercase font-semibold text-default-600 top-1/2 -translate-y-1/2 -right-14 tracking-[1px] text-sm z-20"
          transition={{ delay: 0.35 }}
          inherit={false}
        >
          aquarius financial
        </motion.p>
        <motion.div
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.38, 0, 0.17, 1],
            opacity: {
              type: "tween",
              ease: "easeOut",
              duration: 0.6,
              delay: 0.3,
            },
            width: {
              type: "tween",
              ease: "backOut",
              duration: 0.6,
              delay: 0.3,
            },
          }}
          initial="initial"
          animate="show"
          exit="exit"
          custom={step}
          className="w-full py-8 lg:w-1/2 inline-flex items-center justify-center"
          variants={logoContainerVariants}
          layout={!isReducedSize}
          onAnimationComplete={() => {
            unlockDocument();
          }}
          inherit={false}
        >
          <video
            className="w-[202px] md:w-[270px] lg:w-[239px] 2xl:w-[270px]"
            height="auto"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="aquarius-logo.webm" type="video/webm" />
            <source src="aquarius-logo.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-col gap-2 absolute bottom-6 p-4 rounded-[24px] bg-cream left-1/2 -translate-x-1/2 z-20 hidden lg:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-pulse-1"
          >
            <path
              d="M8.66689 4.66349C8.66689 4.2953 8.36842 3.99683 8.00023 3.99683C7.63204 3.99683 7.33356 4.2953 7.33356 4.66349L7.33356 9.49441L5.64393 7.80478C5.38358 7.54443 4.96147 7.54443 4.70112 7.80478C4.44077 8.06513 4.44077 8.48724 4.70112 8.74759L7.52892 11.5754C7.67737 11.7238 7.87842 11.7876 8.07207 11.7668C8.22549 11.7552 8.37565 11.6908 8.49297 11.5734L11.3167 8.74973C11.577 8.48938 11.577 8.06727 11.3167 7.80692C11.0563 7.54658 10.6342 7.54658 10.3739 7.80693L8.66689 9.51391V4.66349Z"
              fill="#141414"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-pulse-2"
          >
            <path
              d="M8.66689 4.66349C8.66689 4.2953 8.36842 3.99683 8.00023 3.99683C7.63204 3.99683 7.33356 4.2953 7.33356 4.66349L7.33356 9.49441L5.64393 7.80478C5.38358 7.54443 4.96147 7.54443 4.70112 7.80478C4.44077 8.06513 4.44077 8.48724 4.70112 8.74759L7.52892 11.5754C7.67737 11.7238 7.87842 11.7876 8.07207 11.7668C8.22549 11.7552 8.37565 11.6908 8.49297 11.5734L11.3167 8.74973C11.577 8.48938 11.577 8.06727 11.3167 7.80692C11.0563 7.54658 10.6342 7.54658 10.3739 7.80693L8.66689 9.51391V4.66349Z"
              fill="#141414"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-pulse-3"
          >
            <path
              d="M8.66689 4.66349C8.66689 4.2953 8.36842 3.99683 8.00023 3.99683C7.63204 3.99683 7.33356 4.2953 7.33356 4.66349L7.33356 9.49441L5.64393 7.80478C5.38358 7.54443 4.96147 7.54443 4.70112 7.80478C4.44077 8.06513 4.44077 8.48724 4.70112 8.74759L7.52892 11.5754C7.67737 11.7238 7.87842 11.7876 8.07207 11.7668C8.22549 11.7552 8.37565 11.6908 8.49297 11.5734L11.3167 8.74973C11.577 8.48938 11.577 8.06727 11.3167 7.80692C11.0563 7.54658 10.6342 7.54658 10.3739 7.80693L8.66689 9.51391V4.66349Z"
              fill="#141414"
            />
          </svg>
        </motion.div>
        {step === 1 && (
          <ContentContainer
            isReducedSize={isReducedSize}
            isLocked={lock}
            unlockDocument={unlockDocument}
          />
        )}
      </motion.section>
    </main>
  );
}

const mainContainerVariants = {
  initial: {
    backgroundColor: "#000000",
  },
  show: {
    backgroundColor: "#ecebe6",
  },
};

const logoContainerVariants = {
  initial: (step: number) => ({ opacity: 0 }),
  show: (step: number) => ({
    opacity: 1,
    transition:
      step === 0
        ? undefined
        : {
          duration: 0.8,
          ease: "backOut",
          opacity: { type: "tween", ease: "easeOut", duration: 0.6 },
          delay: 0,
        },
  }),
  exit: (step: number) => ({ opacity: 0 }),
};
