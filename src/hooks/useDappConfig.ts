import { supportedTokens } from "src/config";

const useDappConfig = () => {
  const supportedChains = Object.keys(supportedTokens);
  const tokensList = supportedChains.map((chain) => {
    return supportedTokens[chain as any].tokens.map((data) => {
      return {
        ...data,
        chainId: chain,
      };
    });
  });

  return {
    tokensList: tokensList.flat(),
    supportedChains: supportedChains,
    supportedTokens: supportedTokens,
  };
};

export default useDappConfig;
