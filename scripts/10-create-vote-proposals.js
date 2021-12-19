import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
  "0x26A4d01b2c4A209947A2cc8809bc997A09777E0b"
);

const tokenModule = sdk.getTokenModule(
  "0x1A930C7B458F0C6FE8f84625a09E91d3fcb51027"
);

(async () => {
  try {
    const amount = 100_000;
    await voteModule.propose(
      "Should Wellness DAO mint an additional " +
        amount +
        " tokens into the treasury?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 42_000;
    await voteModule.propose(
      "Should Wellness DAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for being a core contributor?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create first proposal", error);
  }
})();
