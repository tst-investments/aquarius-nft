import React, { useContext, useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@mintbase-js/react";
import { uploadReference } from "@mintbase-js/storage";
import { constants } from "@/constants";
import { Heebo } from "next/font/google";
import "../style/global.css";
import { generateRandomId } from "@/utils/generateRandomId";
import { convertBase64ToFile } from "@/utils/base64ToFile";

const heebo = Heebo({ subsets: ["latin"] });

export const AppContext = createContext<{
  cameraRef: React.MutableRefObject<any> | undefined;
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => void;
  takePicture: () => void;
  currentPhoto: boolean;
  openModal: (modalType: "default" | "rewards") => void;
  closeModal: () => void;
  isMainModalOpen: boolean;
  isRewardsModalOpen: boolean;
  mintImage: (photo: string) => void;
  isLoading: boolean;
  mintSuccess: boolean;
}>({
  cameraRef: undefined,
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => null,
  takePicture: () => null,
  currentPhoto: false,
  openModal: (modalType: "default" | "rewards") => null,
  closeModal: () => null,
  isMainModalOpen: false,
  isRewardsModalOpen: false,
  mintImage: (photo: string) => null,
  isLoading: false,
  mintSuccess: false,
});

interface IAppConsumer {
  cameraRef: string | undefined;
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => void;
  takePicture: () => void;
  currentPhoto: string | undefined;
  openModal: (modalType: "default" | "rewards") => void;
  closeModal: () => void;
  isMainModalOpen: boolean;
  isRewardsModalOpen: boolean;
  mintImage: (photo: string) => void;
  isLoading: false;
  mintSuccess: boolean;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cameraRef, _setCameraRef] = useState<
    React.MutableRefObject<any> | undefined
  >(undefined);
  const [currentPhoto, setCurrentPhoto] = useState(false);
  const { selector, activeAccountId } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const { push } = useRouter();

  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isRewardsModalOpen, setRewardsModalOpen] = useState(false);

  const handleOpenModal = (modalType: string) => {
    if (modalType === "default") {
      setMainModalOpen(true);
    } else if (modalType === "rewards") {
      setRewardsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setMainModalOpen(false);
    setRewardsModalOpen(false);
  };

  const setCameraRef = (ref: React.MutableRefObject<any> | undefined) => {
    _setCameraRef(ref);
  };

  const takePicture = () => {
    setCurrentPhoto(true);
  };

  const fetchImageAsFile = async (imageUrl: any, fileName = 'image.jpg') => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const _mintImage = async (photo: string) => {
    if (!activeAccountId) return null;
    const wallet = await selector.wallet();
    setLoading(true);

    console.log("minting image", photo);

    const photoFile = await fetchImageAsFile(`/test/${photo}.png`)

    const refObject = {
      title: "Test NFT " + photo,
      description: "Test NFT " + photo,
      media: photoFile,
    };

    const uploadedData = await uploadReference(refObject);

    const currentUrl = new URL(window.location.href);

    const protocol = currentUrl.protocol;
    const domain = currentUrl.hostname;
    const port = currentUrl.port;

    const result = await wallet?.signAndSendTransaction({
      signerId: activeAccountId,
      receiverId: constants.proxyContractAddress,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "mint",
            args: {
              metadata: JSON.stringify({
                reference: uploadedData?.id,
                extra: null,
              }),
              nft_contract_id: constants.tokenContractAddress,
            },
            gas: "200000000000000",
            deposit: "10000000000000000000000",
          },
        },
      ],
      // @ts-ignore
      successUrl: `${protocol}//${domain}${!port ? "" : ":" + port}/?mintSuccess=true`,
    });
    if (result && result.transaction) {
      setMintSuccess(true);
      console.log("mint success", result);
    }
  };

  return (
    <>
      {" "}
      <style jsx global>{`
        html {
          font-family: ${heebo.style.fontFamily};
        }
      `}</style>
      <AppContext.Provider
        value={{
          cameraRef,
          setCameraRef,
          takePicture,
          currentPhoto,
          openModal: handleOpenModal,
          closeModal: handleCloseModal,
          isMainModalOpen,
          isRewardsModalOpen,
          mintImage: _mintImage,
          isLoading: isLoading,
          mintSuccess: mintSuccess,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

// @ts-ignore
export const useApp = () => useContext<IAppConsumer>(AppContext);
