import * as BABYLON from "@babylonjs/core";

export const createBuggy = async (buggy) => {
  const imported = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/buggy/",
    "scene.gltf",
    buggy.getScene()
  );
  imported.meshes.forEach((v) => {
    v.parent = buggy;
  });
};
