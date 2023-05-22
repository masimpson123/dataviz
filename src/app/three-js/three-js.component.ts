import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.css']
})
export class ThreeJsComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef|null = null;

  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  // @Input() public texture: string = "/assets/texture.avif";

  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  desiredRotationX = 3.7699;
  cameraZ = 250;

  private camera!: THREE.PerspectiveCamera;
  private get canvas():HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }
  // private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1,1,1);
  private material = new THREE.MeshPhongMaterial({
    color: 0x49796B});
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private edges = new THREE.EdgesGeometry(this.geometry);
  // private lines = new THREE.LineSegments(
  //   this.edges, new THREE.LineBasicMaterial({color: 0x708090}));
  private light = new THREE.DirectionalLight(0xFFFFFF, 1);
  private fillLight = new THREE.AmbientLight(0xFFFFFF, .4);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  constructor() { }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x708090);
    this.scene.add(this.cube);
    // this.scene.add(this.lines);
    this.light.position.set(2,2,2);
    this.scene.add(this.light);
    this.scene.add(this.fillLight);
    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animateCube() {
    this.cube.rotation.x = this.desiredRotationX;
    this.cube.rotation.y += this.rotationSpeedY;
    //this.lines.rotation.x = this.desiredRotationX;
    //this.lines.rotation.y += this.rotationSpeedY;
    this.camera.position.z = this.cameraZ;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeJsComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  rotationUpdate(value: number|null) {
    this.desiredRotationX = (value ?? 0) / 50 * Math.PI;
  }

  zoomUpdate(value: number|null) {
    this.cameraZ = 400 - ((value ?? 0) * 2);
  }

}
