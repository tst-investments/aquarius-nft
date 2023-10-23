import { FETCH_FIRST_TOKEN } from "@/data/queries/feed.graphl";
import { useGraphQlQuery } from "@/data/useGraphQlQuery";
import { constants } from "@/constants";
import { useEffect, useState } from "react";
import { useWallet } from "@mintbase-js/react";
import { useApp } from "@/providers/app";

const FetchUser = `
  query FetchUser($contractAddress: String, $accountId: String) @cached {
    token: mb_views_nft_tokens(
      where: { nft_contract_id: { _eq: $contractAddress }, owner: { _eq: $accountId },, 
      burned_timestamp: {_is_null: true}, metadata_content_flag: {_is_null: true}, nft_contract_content_flag: {_is_null: true}}, order_by: {minted_timestamp: desc}, limit: 1, offset: 0) {
      id: token_id
      createdAt: minted_timestamp
      media
      title
      description
      metadata_id
    }
  }
`;

export const useFirstToken: any = () => {
  const [newToken, setNewToken] = useState<any>(null);
  const [userToken, setUserToken] = useState<any>(null);
  const [noneMinted, setNoneMinted] = useState<boolean>(false);
  const [tokensFetched, setTokensFetched] = useState<any>(null);
  const { isConnected, activeAccountId } = useWallet();
  const { mintSuccess } = useApp();

  const tryAgain = () => {
    setNewToken(null);
    setTokensFetched(null);
  };

  const queryObj = {
    queryName: "q_FETCH_FIRST_TOKEN",
    query: FETCH_FIRST_TOKEN,
    variables: {
      accountId: constants.proxyContractAddress,
      contractAddress: constants.tokenContractAddress,
    },
    queryOpts: { staleTime: Infinity, refetchInterval: 30000 },
  };

  const { data, isLoading, refetch: refetchToken } = useGraphQlQuery(queryObj);

  const queryObjUser = {
    queryName: "q_FetchUser",
    query: FetchUser,
    variables: {
      accountId: activeAccountId,
      contractAddress: constants.tokenContractAddress,
    },
    queryOpts: { staleTime: Infinity, refetchInterval: 10000 },
  };

  const { data: dataUser, isLoading: isLoadingUser, refetch: refetchUser } = useGraphQlQuery(queryObjUser);
  console.log("dataUser", dataUser);

  useEffect(() => {
    if (mintSuccess) {
      refetchUser
    }
  }, [mintSuccess]);

  useEffect(() => {
    if (dataUser?.token?.length) {
      setUserToken(dataUser.token[dataUser.token.length - 1]);
    }
  }, [activeAccountId, isLoadingUser, dataUser]);

  useEffect(() => {
    // media delay
    if (data?.token.length < 1 && !isLoading) {
      setNoneMinted(true);
    }

    if (tokensFetched && tokensFetched?.length > 1) {
      // window.location.reload();
    }
    // new media aint null
    if (data?.token[0]?.media !== null) {
      // but the newToken previous stored is somehow an async bug so it re-state the new media
      if (newToken?.media == null) {
        setNewToken(data?.token[0]);
      }

      // previous newToken is outdated like new coming media is id 301 and previous token 298
      if (newToken?.id) {
        if (data?.token[0]?.id !== newToken?.id) {

          // if isnt in direct order reload the page to organize the order.
          if (
            Number(data?.token[0]?.id) !== Number(newToken?.id) + 1 &&
            !isLoading
          ) {
            // window.location.reload();
          }
        }
      }
    }

    // first load

    if (
      (data?.token[0] && !newToken) ||
      (data?.token[0] && tokensFetched?.length < 1)
    ) {
      setNewToken(data?.token[0]);
    }

    // check if the newToken coming is the next id.

    if (
      newToken !== null &&
      Number(data?.token[0]?.id) === Number(newToken?.id) + 1 &&
      data?.token[0]?.media
    ) {
      let newTokensFetched = null;

      if (!tokensFetched) {
        newTokensFetched = [newToken];
      }

      if (tokensFetched?.length == 1) {
        newTokensFetched = [newToken, tokensFetched];
      }
      if (tokensFetched?.length > 1) {
        newTokensFetched = [newToken, ...tokensFetched];
      }

      setTokensFetched(newTokensFetched);
      setNewToken(data?.token[0]);
    }
  }, [data?.token, newToken, tokensFetched]);


  return {
    newToken: !isLoading ? newToken : null,
    tokensFetched,
    isLoading,
    tryAgain,
    userToken: !isLoadingUser ? userToken : null,
    refetchUser,
    noneMinted
  };
};
