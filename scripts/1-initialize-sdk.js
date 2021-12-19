import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// import and configure .env to securely store our env variables
import dotenv from "dotenv";
dotenv.config();

// make sure .env is working
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("🛑 Private key not found.");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("🛑 Alchemy API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("🛑 Wallet Address not found.");
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key
    process.env.PRIVATE_KEY,
    // RPC URL, we'll use our Alchemy API URL from our .env file
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address is:", apps[0].address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;
