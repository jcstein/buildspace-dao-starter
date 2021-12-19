import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0xafa8b8a5a71fcd862174E2deA50Ff2A939ED42a6");

(async () => {
  try {
    // deploy a standard ERC-20 contract
    const tokenModule = await app.deployTokenModule({
      // token name
      name: "Wellness DAO Governance Token",
      // token symbol
      symbol: "WELL",
    });
    console.log(
      "✅ Successfully deployed Wellness DAO token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy Wellness DAO token module", error);
  }
})();
