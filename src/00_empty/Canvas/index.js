// このクラス内に js のコードを書いていきます
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";
import { PointLight } from "three/src/lights/PointLight";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three/src/objects/Mesh";
import { Vector2 } from "three";

export default class Canvas {
  constructor() {
    this.mouse = new Vector2(0, 0);
    this.scrollY = 0;

    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    // this.camera = new PerspectiveCamera(60, this.w / this.h, 1, 10);
    // this.camera.position.z = 3;

    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = this.h / 2 / Math.tan(fovRad);

    this.camera = new PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;

    this.scene = new Scene();

    this.light = new PointLight(0x00ffff);
    // this.light.position.set(2, 2, 2);
    this.light.position.set(0, 0, 400);

    this.scene.add(this.light);

    this.light2 = new PointLight(0xffff00);
    // this.light2.position.set(-2, 0, 2);
    this.light2.position.set(-400, -100, 400);

    this.scene.add(this.light2);

    // const geo = new BoxGeometry(1, 1, 1);
    const geo = new BoxGeometry(300, 300, 300);

    const mat = new MeshLambertMaterial({ color: 0xffffff });

    this.mesh = new Mesh(geo, mat);
    this.mesh.rotation.x = Math.PI / 4;
    this.mesh.rotation.y = Math.PI / 4;

    this.scene.add(this.mesh);

    // this.renderer.render(this.scene, this.camera);

    this.render();
  }

  mouseMoved(x, y) {
    this.mouse.x = x - this.w / 2;
    this.mouse.y = -y + this.h / 2;

    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }

  scrolled(y) {
    this.scrollY = y;
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    const sec = performance.now() / 1000;

    this.mesh.rotation.x = sec * (Math.PI / 4);
    this.mesh.rotation.y = sec * (Math.PI / 4);

    this.mesh.position.y = this.scrollY * 0.5;

    this.renderer.render(this.scene, this.camera);
  }
}
