import * as BABYLON from "@babylonjs/core";

export const createBullets = (buggy) => {
  const bullet = new BABYLON.MeshBuilder.CreateCylinder(
    "bullet",
    {
      diameter: 0.015,
      height: 0.05,
    },
    buggy.getScene()
  );
  bullet.rotation.x = Math.PI / 2;
  bullet.rotation.y = Math.PI / 2;

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
