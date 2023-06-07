// このクラス内に three.js のコードを書いていきます
import * as THREE from "three";

export default class Canvas {
  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 10);
    this.camera.position.z = 3;

    this.scene = new THREE.Scene();

    this.light = new THREE.PointLight(0x00ffff);
    this.light.position.set(2, 2, 2);

    this.scene.add(this.light);

    this.light2 = new THREE.PointLight(0xffff00);
    this.light2.position.set(-2, 0, 2);

    this.scene.add(this.light2);

    const geo = new THREE.BoxGeometry(1, 1, 1);

    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.rotation.x = Math.PI / 4;
    this.mesh.rotation.y = Math.PI / 4;

    this.scene.add(this.mesh);

    this.renderer.render(this.scene, this.camera);
  }
}
