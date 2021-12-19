import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x471eE1AdE3D6e24730EF99F7a11FefAF44505e6C"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Wellness Token",
        description: "This NFT will give you access to Wellness DAO!",
        image: readFileSync("scripts/assets/WellnessDAO.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
