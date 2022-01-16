import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { UnsupportedChainIdError } from "@web3-react/core";
import { Icon } from "@iconify/react";

const sdk = new ThirdwebSDK("rinkeby");
const bundleDropModule = sdk.getBundleDropModule(
  "0x1b180078205CA42b3aa32237d72C1e5a5c1D838c"
);

const App = () => {
  // use the connectWallet hook thirdweb gives us
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address);

  //required to sign transaction, without can only read, not write
  const signer = provider ? provider.getSigner() : undefined;
  // state variable for if user has NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }
    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a Wellness Token!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a Wellness Token.");
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to get NFT balance", error);
      });
  }, [address]);

  console.log(error && error.name);

  if (error instanceof UnsupportedChainIdError) {
    return (
      <div className="unsupported-network">
        <h2>Please connect to Rinkeby</h2>
        <p>
          This dapp only works on the Rinkeby network, please switch networks in
          your connected wallet.
        </p>
        <div className="footer-container" />
      </div>
    );
  }

  // this is where the user hasn't connected wallet
  // to your web app, call connectWallet
  if (!address) {
    return (
      <div className="landing">
        <h1>TICK3T minting</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          connect your wallet <Icon icon="cib:ethereum" />
        </button>
        <div className="footer-container" />
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>TICK3TS_members-only-page</h1>
        <p>
          Thank you for being a member of our community. Follow us{" "}
          <a href="https://twitter.com/blockifyit">@TICK3TS</a> for updates.
        </p>
        <p>
          Check out your NFT on{" "}
          <a href="https://testnets.opensea.io/assets/0x1b180078205CA42b3aa32237d72C1e5a5c1D838c/0">
            OpenSea
          </a>
        </p>
        <div>
          <div>
            <div className="footer-container" />
          </div>
        </div>
      </div>
    );
  }

  const mintNFT = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim("0", 1)
      .catch((err) => {
        console.error("failed to claim", err);
        setIsClaiming(false);
      })
      .finally(() => {
        setIsClaiming(false);
        setHasClaimedNFT(true);
        alert(
          `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      });
  };
  return (
    <div className="mint-nft">
      <h1>{"{mint}"} your free 🎟 TICK3TS_membership-token</h1>
      <button disabled={isClaiming} onClick={() => mintNFT()}>
        {isClaiming ? "Minting..." : "mint my TICK3T"}
      </button>
      <div className="footer-container" />
    </div>
  );
};

export default App;
