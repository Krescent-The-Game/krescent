import * as BABYLON from "@babylonjs/core";

export const createRock = (rock) => {
  BABYLON.SceneLoader.ImportMesh(
    "",
    "/assets/rock/",
    "scene.gltf",
    rock.getScene(),
    (meshes) => {
      meshes.forEach((mesh) => (mesh.parent = rock));
    }
  );
};

export const createRandomRocks = () => {
  const yLoc = Math.random() * 40;
  const xLoc = Math.random() * 50;
  const limitedRandom = Math.random() >= 0.17 ? 0.17 : Math.random();

  return [
    {
      scaling: [limitedRandom, limitedRandom, limitedRandom],
      position: [
        Math.random() * xLoc,
        Math.random() * yLoc,
        -limitedRandom * 2,
      ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [limitedRandom, limitedRandom, limitedRandom],
      position: [
        Math.random() * xLoc,
        Math.random() * yLoc,
        -limitedRandom * 2,
      ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [limitedRandom, limitedRandom, limitedRandom],
      position: [
        Math.random() * xLoc,
        Math.random() * yLoc,
        -limitedRandom * 2,
      ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [limitedRandom, limitedRandom, limitedRandom],
      position: [
        Math.random() * xLoc,
        Math.random() * yLoc,
        -limitedRandom * 2,
      ],
      rotation: [0, Math.random(), Math.random()],
    },
  ];
};

export const createClusters = () => {
  return [
    {
      duration: Math.random() * 50,
    },
    {
      duration: Math.random() * 40,
    },
    {
      duration: Math.random() * 30,
    },
    {
      duration: Math.random() * 40,
    },
    {
      duration: Math.random() * 50,
    },
  ];
};
