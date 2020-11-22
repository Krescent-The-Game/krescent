import * as BABYLON from "@babylonjs/core";

export const createBullets = (handleIntersect) => (buggy) => {
  let bullet = new BABYLON.MeshBuilder.CreateCylinder(
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

  window.bulletTimer = setInterval(() => {
    clearInterval(window.bulletTimer);

    bullet.position.x += 0.1;
    if (bullet.position.x > 5) {
      bullet.dispose();
      bullet = null;
    }
  }, 100);

  buggy.getScene().registerBeforeRender(() => {
    const scene = buggy.getScene();
    const bombs = scene.meshes.filter((v) => v.name === "Bomb");
    bombs.forEach((bomb) => {
      if (!!bullet && bullet.intersectsMesh(bomb, true)) {
        bomb.dispose();
        bullet.dispose();
        handleIntersect();
      }
    });
  });
};
