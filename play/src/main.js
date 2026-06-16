import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";

const canvas = document.getElementById("game");
const overlay = document.getElementById("overlay");
const scoreEl = document.getElementById("score");
const healthEl = document.getElementById("health");
const startBtn = document.getElementById("startBtn");

let engine;
let scene;
let buggy;
let score = 0;
let health = 100;
let playing = false;
let obstacles = [];
let pickups = [];
let speed = 0.18;

function updateHud() {
  scoreEl.textContent = String(Math.floor(score));
  healthEl.textContent = String(Math.max(0, Math.floor(health)));
}

function spawnObstacle() {
  const rock = MeshBuilder.CreateBox("rock", { size: 0.8 + Math.random() * 0.6 }, scene);
  rock.position = new Vector3((Math.random() - 0.5) * 14, 0.5, buggy.position.z + 30 + Math.random() * 20);
  const mat = new StandardMaterial("rockMat", scene);
  mat.diffuseColor = new Color3(0.9, 0.2, 0.2);
  rock.material = mat;
  rock.actionManager = new ActionManager(scene);
  rock.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnIntersectionEnterTrigger, () => {
      if (!playing) return;
      health -= 18;
      score = Math.max(0, score - 5);
      updateHud();
      rock.dispose();
      obstacles = obstacles.filter((o) => o !== rock);
      if (health <= 0) endGame();
    })
  );
  obstacles.push(rock);
}

function spawnPickup() {
  const crystal = MeshBuilder.CreatePolyhedron("crystal", { type: 1, size: 0.45 }, scene);
  crystal.position = new Vector3((Math.random() - 0.5) * 12, 0.6, buggy.position.z + 25 + Math.random() * 15);
  const mat = new StandardMaterial("crystalMat", scene);
  mat.diffuseColor = new Color3(0.2, 0.9, 0.4);
  mat.emissiveColor = new Color3(0.05, 0.3, 0.1);
  crystal.material = mat;
  crystal.actionManager = new ActionManager(scene);
  crystal.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnIntersectionEnterTrigger, () => {
      if (!playing) return;
      health = Math.min(100, health + 12);
      score += 10;
      updateHud();
      crystal.dispose();
      pickups = pickups.filter((p) => p !== crystal);
    })
  );
  pickups.push(crystal);
}

function endGame() {
  playing = false;
  overlay.classList.remove("hidden");
  overlay.querySelector("h1").textContent = "Mission over";
  startBtn.textContent = "Retry";
}

function createScene() {
  engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  scene = new Scene(engine);
  scene.clearColor = new Color4(0.02, 0.02, 0.06, 1);

  const camera = new ArcRotateCamera("cam", -Math.PI / 2, 1.1, 18, new Vector3(0, 1, 0), scene);
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 12;
  camera.upperRadiusLimit = 22;
  camera.wheelPrecision = 80;

  new HemisphericLight("light", new Vector3(0, 1, 0), scene).intensity = 1.1;

  const ground = MeshBuilder.CreateGround("moon", { width: 40, height: 200, subdivisions: 32 }, scene);
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0.35, 0.35, 0.38);
  groundMat.specularColor = new Color3(0.1, 0.1, 0.1);
  ground.material = groundMat;
  ground.position.z = 40;

  buggy = MeshBuilder.CreateBox("buggy", { width: 1.2, height: 0.5, depth: 1.8 }, scene);
  buggy.position = new Vector3(0, 0.5, 0);
  const buggyMat = new StandardMaterial("buggyMat", scene);
  buggyMat.diffuseColor = new Color3(0.55, 0.45, 0.95);
  buggy.material = buggyMat;

  const keys = {};
  window.addEventListener("keydown", (e) => { keys[e.code] = true; });
  window.addEventListener("keyup", (e) => { keys[e.code] = false; });

  let spawnTimer = 0;
  scene.onBeforeRenderObservable.add(() => {
    if (!playing) return;

    const turn = (keys.ArrowLeft || keys.KeyA ? 1 : 0) - (keys.ArrowRight || keys.KeyD ? 1 : 0);
    const accel = (keys.ArrowUp || keys.KeyW ? 1 : 0) - (keys.ArrowDown || keys.KeyS ? 1 : 0);
    buggy.rotation.y += turn * 0.06;
    buggy.position.z += accel * speed + 0.12;
    buggy.position.x += Math.sin(buggy.rotation.y) * (accel * speed * 0.5);
    camera.target = buggy.position.clone();
    camera.alpha = -Math.PI / 2 + buggy.rotation.y * 0.15;

    score += 0.05;
    speed = Math.min(0.35, 0.18 + score / 800);
    updateHud();

    spawnTimer += engine.getDeltaTime();
    if (spawnTimer > 900) {
      spawnTimer = 0;
      spawnObstacle();
      if (Math.random() > 0.4) spawnPickup();
    }

    obstacles.forEach((o) => { o.position.z -= speed * 0.3; if (o.position.z < buggy.position.z - 10) o.dispose(); });
    pickups.forEach((p) => { p.position.z -= speed * 0.3; p.rotation.y += 0.04; if (p.position.z < buggy.position.z - 10) p.dispose(); });
    obstacles = obstacles.filter((o) => !o.isDisposed());
    pickups = pickups.filter((p) => !p.isDisposed());

    if (keys.Space) {
      obstacles.slice(0, 1).forEach((o) => {
        if (Vector3.Distance(o.position, buggy.position) < 8) {
          score += 5;
          o.dispose();
        }
      });
    }
  });

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
}

function startGame() {
  if (scene) {
    scene.dispose();
    engine.dispose();
    obstacles = [];
    pickups = [];
  }
  score = 0;
  health = 100;
  speed = 0.18;
  playing = true;
  updateHud();
  overlay.classList.add("hidden");
  createScene();
}

startBtn.addEventListener("click", startGame);
