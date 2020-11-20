import * as BABYLON from "@babylonjs/core";
import { Axis } from "@babylonjs/core";

export const createBuggy = (buggy) => {
  const bodyMaterial = new BABYLON.StandardMaterial(
    "body_mat",
    buggy.getScene()
  );
  bodyMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.25, 0.25);
  bodyMaterial.backFaceCulling = false;

  // Array of points for trapezium side of car.
  const side = [
    new BABYLON.Vector3(-6.5, 1.5, -2),
    new BABYLON.Vector3(2.5, 1.5, -2),
    new BABYLON.Vector3(3.5, 0.5, -2),
    new BABYLON.Vector3(-9.5, 0.5, -2),
  ];

  side.push(side[0]); // close trapezium

  // Array of points for the extrusion path
  const extrudePath = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 4),
  ];

  // Create body and apply material
  const carBody = BABYLON.MeshBuilder.ExtrudeShape(
    "body",
    { shape: side, path: extrudePath, cap: BABYLON.Mesh.CAP_ALL },
    buggy.getScene()
  );
  carBody.material = bodyMaterial;

  const wheelMaterial = new BABYLON.StandardMaterial(
    "wheel_mat",
    buggy.getScene()
  );
  const wheelTexture = new BABYLON.Texture(
    "http://i.imgur.com/ZUWbT6L.png",
    buggy.getScene()
  );
  wheelMaterial.diffuseTexture = wheelTexture;

  // Set color for wheel tread as black
  const faceColors = [];
  faceColors[1] = new BABYLON.Color3(0, 0, 0);

  // set texture for flat face of wheel
  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
  faceUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

  // create wheel front inside and apply material
  const wheelFI = BABYLON.MeshBuilder.CreateCylinder(
    "wheelFI",
    {
      diameter: 3,
      height: 1,
      tessellation: 24,
      faceColors,
      faceUV,
    },
    buggy.getScene()
  );
  wheelFI.material = wheelMaterial;

  // rotate wheel so tread in xz plane
  wheelFI.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
  /* -----------------------End Wheel------------------------------------------ */

  /* -------------------Pivots for Front Wheels----------------------------------- */
  const pivotFI = new BABYLON.Mesh("pivotFI", buggy.getScene());
  pivotFI.parent = carBody;
  pivotFI.position = new BABYLON.Vector3(-6.5, 0, -2);

  const pivotFO = new BABYLON.Mesh("pivotFO", buggy.getScene());
  pivotFO.parent = carBody;
  pivotFO.position = new BABYLON.Vector3(-6.5, 0, 2);
  /* ----------------End Pivots for Front Wheels-------------------------------- */

  /* ------------Create other Wheels as Instances, Parent and Position---------- */
  const wheelFO = wheelFI.createInstance("FO");
  wheelFO.parent = pivotFO;
  wheelFO.position = new BABYLON.Vector3(0, 0, 1.8);

  const wheelRI = wheelFI.createInstance("RI");
  wheelRI.parent = carBody;
  wheelRI.position = new BABYLON.Vector3(0, 0, -2.8);

  const wheelRO = wheelFI.createInstance("RO");
  wheelRO.parent = carBody;
  wheelRO.position = new BABYLON.Vector3(0, 0, 2.8);

  wheelFI.parent = pivotFI;
  wheelFI.position = new BABYLON.Vector3(0, 0, -1.8);
  /* ------------End Create other Wheels as Instances, Parent and Position---------- */

  setInterval(() => {
    requestAnimationFrame(spinWheel);
  }, 100);

  const spinWheel = () => {
    wheelFO.rotate(Axis.Y, -0.2);
    wheelFI.rotate(Axis.Y, -0.2);
    wheelRO.rotate(Axis.Y, -0.2);
    wheelRI.rotate(Axis.Y, -0.2);
  };

  carBody.parent = buggy;
  carBody.position = new BABYLON.Vector3(-0.2, -0.1, -8.5);
  carBody.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
};
