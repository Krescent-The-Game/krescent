import * as BABYLON from "@babylonjs/core";
import { Axis } from "@babylonjs/core";

export const createBuggy = (
  handleIntersect,
  handleIntersectHealthPowerUp
) => async (buggy) => {
  const wheelMaterial = new BABYLON.StandardMaterial(
    "wheel_mat",
    buggy.getScene()
  );
  const wheelTexture = new BABYLON.Texture(
    "/assets/buggy/wheel.png",
    buggy.getScene()
  );
  wheelMaterial.diffuseTexture = wheelTexture;

  const imported = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/buggy/",
    "scene.gltf",
    buggy.getScene()
  );
  const wheels = [];

  imported.meshes.forEach((mesh) => {
    if (mesh.id === "node3" || mesh.id === "node10") {
      mesh.dispose();
    }
    mesh.parent = buggy;
  });

  const faceColors = [];
  faceColors[1] = new BABYLON.Color3(0, 0, 0);
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
  faceUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

  const wheelFI = BABYLON.MeshBuilder.CreateCylinder(
    "wheelFI",
    {
      diameter: 15,
      height: 2,
      tessellation: 24,
      faceColors,
      faceUV,
    },
    buggy.getScene()
  );
  wheelFI.material = wheelMaterial;
  wheelFI.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
  wheelFI.parent = buggy;

  const wheelFO = wheelFI.createInstance("FO");
  wheelFO.parent = buggy;
  wheelFO.position = new BABYLON.Vector3(12, 19, -2);

  const wheelRI = wheelFI.createInstance("RI");
  wheelRI.parent = buggy;
  wheelRI.position = new BABYLON.Vector3(12, -14, -2);

  const wheelRO = wheelFI.createInstance("RO");
  wheelRO.parent = buggy;
  wheelRO.position = new BABYLON.Vector3(-12, -14, -2);
  wheelFI.position = new BABYLON.Vector3(-12, 19, -2);

  wheels.push(wheelFI);
  wheels.push(wheelRO);
  wheels.push(wheelRI);
  wheels.push(wheelFO);

  setInterval(() => {
    requestAnimationFrame(spinWheel);
  }, 100);

  const spinWheel = () => {
    wheels.forEach((wheel) => {
      wheel.rotate(Axis.Y, 0.2);
    });
  };
  buggy.name = "Buggy";
  buggy.getScene().registerBeforeRender(() => {
    const scene = buggy.getScene();
    const bombs = scene.meshes.filter((v) => v.name === "Bomb");
    bombs.forEach((bomb) => {
      if (bomb.intersectsMesh(buggy, true, true)) {
        bomb.dispose();
        handleIntersect();
      }
    });
    const healthPowerUps = scene.meshes.filter(
      (v) => v.name === "HealthPowerUp"
    );
    healthPowerUps.forEach((healthPowerUp) => {
      if (healthPowerUp.intersectsMesh(buggy, true, true)) {
        healthPowerUp.dispose();
        handleIntersectHealthPowerUp();
      }
    });
  });
};
