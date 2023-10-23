"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useApp } from "@/providers/app";
import { useWallet } from "@mintbase-js/react";
import { useRouter, useSearchParams  } from "next/navigation";
import { useFirstToken } from "@/hooks/useFirstToken";

export default function ContentContainer({
  unlockDocument,
  isLocked,
  isReducedSize,
}: {
  unlockDocument: () => void;
  isLocked: boolean;
  isReducedSize: boolean;
}) {
  const searchParams = useSearchParams();
  const mintSuccess = searchParams.get("mintSuccess");
  const { push } = useRouter();
  const { isConnected, activeAccountId } = useWallet();
  const { userToken, refetchUser } = useFirstToken();
  console.log(userToken);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchUser();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { takePicture, openModal } = useApp();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1 });
  const contentRef = useRef<HTMLDivElement>(null);
  const y = useTransform(
    smoothProgress,
    (v) =>
      window.innerHeight / 8 +
      v * -((contentRef?.current?.clientHeight || 0 - window.innerHeight) / 4)
  );

  const setupContentScroll = () => {
    const body = document.getElementsByTagName("body")[0];
    const calculatedHeight = `${window.innerHeight / 2 + (contentRef?.current?.clientHeight || 0)
      }px`;
    body.style.height = calculatedHeight;

    window.scrollTo({ top: 0 });
  };

  return (
    <motion.div
      className="lg:h-screen lg:pb-0 scrollbar-none w-full h-0 lg:w-0 overflow-y-auto lg:overflow-hidden flex flex-col items-center bg-black text-[#ECECE9] origin-bottom lg:origin-right relative lg:mask-text"
      initial={
        isReducedSize
          ? {
            opacity: 0,
            height: 0,
          }
          : { width: 0, opacity: 0 }
      }
      animate={
        isReducedSize
          ? {
            opacity: 1,
            height: "100%",
          }
          : {
            width: "50%",
            opacity: 1,
          }
      }
      transition={{
        width: { duration: 1.2, ease: [0.38, 0, 0.17, 1] },
        height: { duration: 1.2, ease: [0.38, 0, 0.17, 1] },
        opacity: { duration: 0.6, delay: 0.5 },
      }}
      onAnimationStart={() => {
        if (!isReducedSize) {
          setupContentScroll();
        }
      }}
      onAnimationComplete={(def) => {
        unlockDocument();
      }}
      layout={isReducedSize}
    >
      <motion.div
        className="text-base 2xl:text-xl 3xl:text-2xl py-16 lg:py-0 lg:translate-y-[calc(50vh-24px)]"
        style={isLocked || isReducedSize ? undefined : { y }}
        ref={contentRef}
      >
        {(userToken && activeAccountId) || mintSuccess ?
          <>
            <h1 className="uppercase text-xl 3xl:text-2xl text-center font-semibold">
              Your Aquarius NFT
              <br />
              has been minted!
            </h1>
            {isConnected && <p className="text-center text-sm text-gray-400">Connected as {activeAccountId}</p>}
            <div className="mt-12 space-y-8 mb-4 lg:space-y-12 w-[80vw] mx-auto lg:w-[458px] 3xl:w-[600px]">
              <a href={`https://www.mintbase.xyz/human/${activeAccountId}/owned/0`} target="_blank" className="w-full">
                {userToken?.media ?
                  <img
                    src={userToken.media}
                    alt="Aquarius NFT"
                    className="w-full h-auto"
                  />
                  :
                  <div
                    className="aspect-square rounded overflow-x-hidden cursor-pointer w-full relative"
                    key={1}
                  >
                    <div className="rounded animate-pulse w-full h-full bg-gray-600 dark:bg-gray-800" />
                  </div>
                }
              </a>
            </div>
            <h1 className="text-center mb-8 text-sm text-gray-400">{userToken?.title}</h1>
            <button className="w-full">
              <a
                className="rounded-[10px] text-center text-base font-semibold bg-[#C4DF94] py-[11px] text-black block z-0"
                onClick={
                  isConnected ? () => push("/mint") : () => openModal("default")
                }
              >
                Mint Another
              </a>
            </button>
          </>
          :
          <>
            <h1 className="uppercase text-xl 3xl:text-2xl text-center font-semibold">
              Mint your own
              <br />
              Aquarius NFT
            </h1>
            {isConnected && <p className="text-center text-sm text-gray-400">Connected as {activeAccountId}</p>}
            <div className="mt-12 space-y-8 mb-24 lg:space-y-12 w-[80vw] mx-auto lg:w-[458px] 3xl:w-[600px]">
              {/* Insert webp gif here */}
              <img
                src="/aquanft.webp"
                alt="Aquarius NFT"
                className="w-full h-auto"
              />
              <button className="w-full">
                <a
                  className="rounded-[10px] text-center text-base font-semibold bg-[#C4DF94] py-[11px] text-black block z-0"
                  onClick={
                    isConnected ? () => push("/mint") : () => openModal("default")
                  }
                >
                  Mint
                </a>
              </button>
            </div>
          </>}
      </motion.div>
    </motion.div>
  );
}
