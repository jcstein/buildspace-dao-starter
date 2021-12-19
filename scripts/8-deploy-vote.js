import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xafa8b8a5a71fcd862174E2deA50Ff2A939ED42a6"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "Wellness DAO's first Proposal",

      votingTokenAddress: "0x1A930C7B458F0C6FE8f84625a09E91d3fcb51027",

      proposalStartWaitTimeInSeconds: 0,

      proposalVotingTimeInSeconds: 24 * 60 * 60,

      votingQuorumFraction: 0,

      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
