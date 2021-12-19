import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// address of ERC-20 token contract
const tokenModule = sdk.getTokenModule(
  "0x1A930C7B458F0C6FE8f84625a09E91d3fcb51027"
);

(async () => {
  try {
    // set max supply
    const amount = 1_000_000;
    // use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // interact with deployed ERC-20 contract and mint the tokens
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    // print how many tokens there are now
    console.log(
      "✅ There now are",
      ethers.utils.formatUnits(totalSupply, 18),
      "$WELL in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
