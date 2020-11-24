import * as BABYLON from "@babylonjs/core";

export const createBullets = (handleIntersect) => (buggy) => {
  const scene = buggy.getScene();
  const bullet = new BABYLON.MeshBuilder.CreateCylinder(
    "bullet",
    {
      diameter: 0.015,
      height: 0.05,
    },
    scene
  );
  bullet.rotation.x = Math.PI / 2;
  bullet.rotation.y = Math.PI / 2;

  bullet.position = JSON.parse(JSON.stringify(buggy.position));

  const material = new BABYLON.StandardMaterial(scene);
  material.alpha = 1;
  material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
  bullet.material = material;

  BABYLON.Animation.CreateAndStartAnimation(
    "bulletAnimation",
    bullet,
    "position.x",
    30,
    50,
    buggy.position.x,
    buggy.position.x + 5,
    0,
    null,
    () => {
      bullet.dispose();
    }
  );

  scene.registerBeforeRender(() => {
    const bombs = scene.meshes.filter((v) => v.name === "Bomb");
    bombs.forEach((bomb) => {
      if (!bullet.isDisposed() && bullet.intersectsMesh(bomb, false)) {
        bomb.setEnabled(false);
        bomb.dispose();

        bullet.setEnabled(false);
        bullet.dispose();

        handleIntersect();
      }
    });
  });
};
