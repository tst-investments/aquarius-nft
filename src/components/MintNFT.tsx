import { useApp } from "@/providers/app";
import { Spinner } from "./Spinner";
import InlineSVG from "react-inlinesvg";

export function Mint({
  backStep,
  currentPhoto,
  id,
}: {
  backStep: () => any;
  currentPhoto: any;
  id: any;
}) {
  const { isLoading, mintImage } = useApp();

  return (
    <main className="h-camera w-screen flex flex-col items-center margin-mint">
      {isLoading ? (
        <>
          {" "}
          <Spinner />
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-mainText text-center">
            Uploading your image...
          </h1>
        </>
      ) : (
        <div className="h-full w-64 md:h-96 md:w-96 flex flex-col gap-4">
          <img src={currentPhoto} />

          <div className="flex gap-4 w-full">
            <button
              className="text-secondaryBtnText"
              onClick={backStep}
            >
              <InlineSVG
                src="/images/arrow_back.svg"
                className="fill-current text-headerText"
              />
            </button>
            <button
              className="w-full rounded-[10px] text-center text-base font-semibold bg-[#C4DF94] py-[11px] text-black block z-0"
              onClick={() => mintImage(id)}
            >
              Mint
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
