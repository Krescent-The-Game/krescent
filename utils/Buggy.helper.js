import * as BABYLON from "@babylonjs/core";

export const createBuggy = (handleIntersect) => async (buggy) => {
  const imported = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/buggy/",
    "scene.gltf",
    buggy.getScene()
  );
  imported.meshes.forEach((v) => {
    v.parent = buggy;
  });
  buggy.getScene().registerBeforeRender(() => {
    const scene = buggy.getScene();
    const bombs = scene.meshes.filter((v) => v.name === "Bomb");
    bombs.forEach((bomb) => {
      if (bomb._children) {
        bomb._children.forEach((child) => {
          if (child.intersectsMesh(buggy, true)) {
            bomb.dispose();
            handleIntersect();
          }
        });
      }
    });
  });
};
