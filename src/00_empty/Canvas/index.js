// このクラス内に js のコードを書いていきます
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";
import { PointLight } from "three/src/lights/PointLight";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three/src/objects/Mesh";

export default class Canvas {
  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    this.camera = new PerspectiveCamera(60, this.w / this.h, 1, 10);
    this.camera.position.z = 3;

    this.scene = new Scene();

    this.light = new PointLight(0x00ffff);
    this.light.position.set(2, 2, 2);

    this.scene.add(this.light);

    this.light2 = new PointLight(0xffff00);
    this.light2.position.set(-2, 0, 2);

    this.scene.add(this.light2);

    const geo = new BoxGeometry(1, 1, 1);

    const mat = new MeshLambertMaterial({ color: 0xffffff });

    this.mesh = new Mesh(geo, mat);
    this.mesh.rotation.x = Math.PI / 4;
    this.mesh.rotation.y = Math.PI / 4;

    this.scene.add(this.mesh);

    // this.renderer.render(this.scene, this.camera);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    const sec = performance.now() / 1000;

    this.mesh.rotation.x = sec * (Math.PI / 4);
    this.mesh.rotation.y = sec * (Math.PI / 4);

    this.renderer.render(this.scene, this.camera);
  }
}
