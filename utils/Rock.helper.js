import * as BABYLON from "@babylonjs/core";
import { randomWithin } from "./Random.helper";

export const createRock = (rock) => {
  const scene = rock.getScene();

  const meteorite = BABYLON.MeshBuilder.CreateIcoSphere(
    "rock",
    {
      radiusX: 0.5,
      radiusY: 0.5,
      radiusZ: 0.5,
      subdivisions: 2,
    },
    scene
  );
  meteorite.parent = rock;
};

export const createRandomRocks = () => {
  const yLoc = Math.random() * 40;
  const xLoc = randomWithin(1.2, 1.1) * 50;
  const randomScale = randomWithin(0.8, 0.7);
  const randomZ = randomWithin(0, -5);

  return [
    {
      scaling: [randomScale, randomScale, randomScale],
      position: [Math.random() * xLoc, Math.random() * yLoc, -randomZ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [randomScale, randomScale, randomScale],
      position: [Math.random() * xLoc, Math.random() * yLoc, -randomZ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [randomScale, randomScale, randomScale],
      position: [Math.random() * xLoc, Math.random() * yLoc, -randomZ],
      rotation: [0, Math.random(), Math.random()],
    },
    {
      scaling: [randomScale, randomScale, randomScale],
      position: [Math.random() * xLoc, Math.random() * yLoc, -randomZ],
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
