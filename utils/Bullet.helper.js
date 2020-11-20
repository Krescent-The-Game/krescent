import * as BABYLON from "@babylonjs/core";

export const createBullets = (buggy) => {
  const bullet = new BABYLON.MeshBuilder.CreateSphere(
    "bullet",
    {
      diameterX: 0.07,
      diameterY: 0.04,
      diameterZ: 0.04,
    },
    buggy.getScene()
  );
  bullet.position = JSON.parse(JSON.stringify(buggy.position));

  const material = new BABYLON.StandardMaterial(buggy.getScene());
  material.alpha = 1;
  material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
  bullet.material = material;

  setInterval(
    () =>
      requestAnimationFrame(() => {
        bullet.position.x += 0.1;
      }),
    100
  );

  setTimeout(() => {
    bullet.dispose();
  }, 4000);
};
