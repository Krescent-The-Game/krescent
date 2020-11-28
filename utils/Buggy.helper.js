import * as BABYLON from "@babylonjs/core";
import { Axis } from "@babylonjs/core";

export const createBuggy = (
  handleIntersect,
  handleIntersectHealthPowerUp
) => async (buggy) => {
  const scene = buggy.getScene();
  const planeMaterial = new BABYLON.Material();
  planeMaterial.alpha = 0;

  const planeFront = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    {
      width: 30,
      height: 30,
      size: 30,
    },
    scene
  );
  planeFront.parent = buggy;
  planeFront.position = new BABYLON.Vector3(
    buggy.position.x,
    buggy.position.y + 20,
    buggy.position.z
  );
  planeFront.rotate(BABYLON.Axis.X, Math.PI / 2);
  planeFront.material = planeMaterial;

  const planeTop = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    {
      width: 30,
      height: 30,
      size: 30,
    },
    scene
  );
  planeTop.parent = buggy;
  planeTop.position = new BABYLON.Vector3(
    buggy.position.x,
    buggy.position.y,
    buggy.position.z + 20
  );
  planeTop.rotate(BABYLON.Axis.Y, Math.PI);
  planeTop.material = planeMaterial;

  const wheelMaterial = new BABYLON.StandardMaterial("wheel_mat", scene);
  const wheelTexture = new BABYLON.Texture("/assets/buggy/wheel.png", scene);
  wheelMaterial.diffuseTexture = wheelTexture;

  const imported = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/buggy/",
    "scene.gltf",
    scene
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
    scene
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
  scene.registerBeforeRender(() => {
    const bombs = scene.meshes.filter((v) => v.name === "Bomb");
    bombs.forEach((bomb) => {
      if (
        bomb.intersectsMesh(planeFront, true, true) ||
        bomb.intersectsMesh(planeTop, true, true)
      ) {
        bomb.dispose();
        handleIntersect();
      }
    });
    const healthPowerUps = scene.meshes.filter(
      (v) => v.name === "HealthPowerUp"
    );
    healthPowerUps.forEach((healthPowerUp) => {
      if (
        healthPowerUp.intersectsMesh(planeFront, true, true) ||
        healthPowerUp.intersectsMesh(planeTop, true, true)
      ) {
        healthPowerUp.dispose();
        handleIntersectHealthPowerUp();
      }
    });
  });
};
