import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x1b180078205CA42b3aa32237d72C1e5a5c1D838c"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "TICK3T",
        description: "This NFT will give you access to TICK3TS!",
        image: readFileSync("scripts/assets/tick3ts.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
