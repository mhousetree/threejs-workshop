import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { OrthographicCamera } from "three/src/cameras/OrthographicCamera";
import { Scene } from "three/src/scenes/Scene";
import { PlaneGeometry } from "three/src/geometries/PlaneGeometry";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { Mesh } from "three/src/objects/Mesh";
import { Vector2 } from "three/src/math/Vector2";

// シェーダーソース
import vertexSource from "./shaders/shader.vert";
import fragmentSource from "./shaders/shader.frag";

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // レンダラーを作成
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.w, this.h); // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio); // ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    // カメラを作成（背景シェーダーだけならパースいらないので、OrthographicCameraをつかう）
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1);

    // シーンを作成
    this.scene = new Scene();

    // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
    // const geo = new PlaneGeometry(2, 2, 10, 10);
    const geo = new PlaneGeometry(2, 2, 1, 1);

    this.mouse = new Vector2(0.5, 0.5);
    this.targetRadius = 0.005;

    this.uniforms = {
      uAspect: {
        value: this.w / this.h,
      },
      uTime: {
        value: 0.0,
      },
      uMouse: {
        value: new Vector2(0.5, 0.5),
      },
      uRadius: {
        value: this.targetRadius,
      },
    };

    // シェーダーソースを渡してマテリアルを作成
    const mat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      // wireframe: true
      // wireframe: false,
    });

    this.mesh = new Mesh(geo, mat);

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

    // 描画ループ開始
    this.render();
  }

  mouseMoved(x, y) {
    this.mouse.x = x / this.w;
    this.mouse.y = 1.0 - y / this.h;
  }

  mousePressed(x, y) {
    this.mouseMoved(x, y);
    this.targetRadius = 0.25;
  }

  mouseReleased(x, y) {
    this.mouseMoved(x, y);
    this.targetRadius = 0.005;
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render();
    });

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000;

    this.uniforms.uTime.value = sec;

    this.uniforms.uMouse.value.lerp(this.mouse, 0.2);

    this.uniforms.uRadius.value +=
      (this.targetRadius - this.uniforms.uRadius.value) * 0.2;

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }
}
