import * as BABYLON from "@babylonjs/core";
import { Axis } from "@babylonjs/core";

export const createBuggy = (
  handleIntersect,
  handleIntersectHealthPowerUp
) => async (buggy) => {
  const scene = buggy.getScene();

  const light = new BABYLON.SpotLight(
    "spotLight",
    new BABYLON.Vector3(0, 30, -10),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    scene
  );
  light.diffuse = new BABYLON.Color3(255, 255, 255);

  const flashRed = () => {
    const redAnimation = new BABYLON.Animation(
      "redAnimation",
      "diffuse",
      10,
      BABYLON.Animation.ANIMATIONTYPE_COLOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keys = [
      { frame: 0, value: new BABYLON.Color3(255, 0, 0) },
      { frame: 7.5, value: new BABYLON.Color3(255, 0, 0) },
      { frame: 15, value: new BABYLON.Color3(255, 255, 255) },
    ];
    // assign keyframes
    redAnimation.setKeys(keys);
    scene.beginDirectAnimation(light, [redAnimation], 0, 15, false, 1);
  };

  const flashGreen = () => {
    const greenAnimation = new BABYLON.Animation(
      "greenAnimation",
      "diffuse",
      10,
      BABYLON.Animation.ANIMATIONTYPE_COLOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const keys = [
      { frame: 0, value: new BABYLON.Color3(0, 255, 0) },
      { frame: 10, value: new BABYLON.Color3(0, 255, 0) },
      { frame: 20, value: new BABYLON.Color3(255, 255, 255) },
    ];
    // assign keyframes
    greenAnimation.setKeys(keys);
    scene.beginDirectAnimation(light, [greenAnimation], 0, 20, false, 1);
  };

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
  wheelFI.position = new BABYLON.Vector3(-16, 19, -2);

  const wheelFO = wheelFI.createInstance("FO");
  wheelFO.parent = buggy;
  wheelFO.position = new BABYLON.Vector3(16, 19, -2);

  const wheelRI = wheelFI.createInstance("RI");
  wheelRI.parent = buggy;
  wheelRI.position = new BABYLON.Vector3(16, -14, -2);

  const wheelRO = wheelFI.createInstance("RO");
  wheelRO.parent = buggy;
  wheelRO.position = new BABYLON.Vector3(-16, -14, -2);

  wheels.push(wheelFI);
  wheels.push(wheelRO);
  wheels.push(wheelRI);
  wheels.push(wheelFO);

  const childMeshes = buggy.getChildMeshes();
  let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
  let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;

  for (let i = 0; i < childMeshes.length; i++) {
    const meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    const meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
    min = BABYLON.Vector3.Minimize(min, meshMin);
    max = BABYLON.Vector3.Maximize(max, meshMax);
  }

  buggy.position = new BABYLON.Vector3(-0.2, -0.4, -7.5);
  buggy.setBoundingInfo(new BABYLON.BoundingInfo(min, max));
  buggy.showBoundingBox = true;

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
      if (bomb.intersectsMesh(buggy, true, true)) {
        flashRed();
        bomb.dispose();
        handleIntersect();
      }
    });
    const healthPowerUps = scene.meshes.filter(
      (v) => v.name === "HealthPowerUp"
    );
    healthPowerUps.forEach((healthPowerUp) => {
      if (healthPowerUp.intersectsMesh(buggy, true, true)) {
        flashGreen();
        healthPowerUp.dispose();
        handleIntersectHealthPowerUp();
      }
    });
  });
};
