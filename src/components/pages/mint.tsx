import { Mint } from "@/components/MintNFT";
import { FooterButton } from "@/components/footer";
import { useFirstToken } from "@/hooks/useFirstToken";
import Image from "next/image";
import { useRouter } from 'next/navigation'

export default function MintPage() {
    const { newToken, tokensFetched, isLoading, tryAgain } = useFirstToken();
    console.log(newToken);
    const router = useRouter();
    // if (newToken && tokensFetched && !isLoading) {
    //     return <Mint currentPhoto={`/nft/${newToken + 1}.png`} backStep={tryAgain} />;
    // }

    return (
        <>
            {newToken && !isLoading ? (
                <Mint currentPhoto={`/test/${Number(newToken?.id) + 1}.png`} id={(Number(newToken?.id) + 1).toString()} backStep={router.back} />
            ) : (
                <main className="h-camera overflow-hidden	 w-screen flex items-center justify-center">
                    <div className="h-1/2 relative m-camera">
                        <h2 className="align-center flex font-semibold mb-4 text-mainText text-center flex-col">
                            <span className="w-full">Mint your NFT</span>
                            <div
                                className="aspect-square rounded overflow-x-hidden cursor-pointer sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative"
                                key={1}
                            >
                                <div className="rounded animate-pulse w-full h-full bg-gray-600 dark:bg-gray-800" />
                            </div>
                        </h2>
                    </div>
                </main>
            )}
        </>
    );
}