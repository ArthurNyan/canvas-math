import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";

const config = {
	scene: {
		speed: 0.24,
		position: 3
	},
	object: {
		speed: 0.25
	},
	shader: {
		time: 0.31,
		u_noise: 0.37,
		decay: 0.33,
		turb: 0.23,
		scale: 5.0,
		waves: 5.66,
		size: 1.0,
		displ: 0.0,
		broken: true,
		invert: true,
		color: 5.0,
		complex: 0.1,
	}
};

const uniforms = {
	turb: {
		type: "f",
		value: 0.0
	},
	time: {
		type: "f",
		value: 0.0
	},
	u_noise: {
		type: "f",
		value: 0.0
	},
	decay: {
		type: "f",
		value: 0.0
	},
	complex: {
		type: "f",
		value: 0.0
	},
	waves: {
		type: "f",
		value: 0.0
	},
	eqcolor: {
		type: "f",
		value: 0.0
	},
	pointscale: {
		type: "f",
		value: 0.0
	},
	scale: {
		type: "f",
		value: 0.0
	},
	displ: {
		type: "f",
		value: 0.0
	},
	fragment: {
		type: "i",
		value: true
	},
	redhell: {
		type: "i",
		value: true
	}
};

class Panel {
	constructor() {
		this.init();
	}
	init() {
		function generatePane() {
			const pn = new Tweakpane.Pane({ title: "Panel" });
			const sn = pn.addFolder({ title: "Scene", expanded: false });
			sn.addInput(config.scene, "speed", { min: 0, max: 1, label: "Speed" });
			//--
			const sd = pn.addFolder({ title: "Shader" });
			sd.addInput(config.shader, "time", { min: 0.01, max: 1.0 });
			sd.addInput(config.shader, "u_noise", { min: -1.0, max: 1.0 });
			sd.addInput(config.shader, "decay", { min: 0.01, max: 1.0 });
			sd.addInput(config.shader, "turb", { min: 0.01, max: 1.0 });
			sd.addInput(config.shader, "scale", { min: 0.1, max: 5.0 });
			sd.addSeparator();
			sd.addInput(config.shader, "broken");
			sd.addInput(config.shader, "waves", { min: 0.01, max: 10.0 });
			sd.addInput(config.shader, "size", { min: 0.1, max: 5.0, step: 0.5 });
			//sd.addInput(config.shader, "displ", { min: 0.1, max: 10.0 });
			sd.addSeparator();
			sd.addInput(config.shader, "invert");
			sd.addInput(config.shader, "color", { min: 0.1, max: 5.0 });
			//sd.addInput(config.shader, "complex", { min: 0.01, max: 2.0 });
			//--
			const bt = pn.addFolder({ title: "Preset", expanded: false });
			sd.addButton({ title: "Reset", label: "Config" }).on("click", () => {
				config.shader.time = 0.31;
				config.shader.u_noise = 0.37;
				config.shader.decay = 0.33;
				config.shader.turb = 0.23;
				config.shader.scale = 5.0;
				config.shader.waves = 5.66;
				//config.shader.size = 1.0;
				config.shader.displ = 0.0;
				config.shader.broken = true;
				config.shader.invert = true;
				config.shader.color = 5.0;
				config.shader.complex = 0.1;
				pn.refresh();
			});
			bt.addSeparator();
			bt.addButton({ title: "Liquid", label: "Preset 1" }).on("click", () => {
				config.shader.time = 0.24;
				config.shader.u_noise = 0.22;
				config.shader.decay = 0.52;
				config.shader.turb = 0.31;
				config.shader.scale = 1.01;
				config.shader.waves = 10.0;
				//config.shader.size = 1.0;
				config.shader.displ = 0.0;
				config.shader.broken = true;
				config.shader.invert = true;
				config.shader.color = 0.10;
				config.shader.complex = 2.0;
				pn.refresh();
			});
			bt.addButton({ title: "Lava", label: "Preset 2" }).on("click", () => {
				config.shader.time = 0.43;
				config.shader.u_noise = 1.0;
				config.shader.decay = 1.0;
				config.shader.turb = 0.24;
				config.shader.scale = 0.21;
				config.shader.waves = 8.0;
				//config.shader.size = 1.0;
				config.shader.displ = 0.0;
				config.shader.broken = true;
				config.shader.invert = false;
				config.shader.color = 5.0;
				config.shader.complex = 2.0;
				pn.refresh();
			});
			bt.addButton({ title: "Box 1", label: "Preset 3" }).on("click", () => {
				config.shader.time = 0.46;
				config.shader.u_noise = 0.44;
				config.shader.decay = 1.48;
				config.shader.turb = 0.65;
				config.shader.scale = 1.33;
				config.shader.waves = 10.0;
				//config.shader.size = 1.0;
				config.shader.displ = 5.0;
				config.shader.broken = false;
				config.shader.invert = false;
				config.shader.color = 0.23;
				config.shader.complex = 0.2;
				pn.refresh();
			});
			bt.addButton({ title: "Box 2", label: "Preset 4" }).on("click", () => {
				config.shader.time = 0.01;
				config.shader.u_noise = 0.37;
				config.shader.decay = 1.0;
				config.shader.turb = 0.32;
				config.shader.scale = 0.0;
				config.shader.waves = 10.0;
				//config.shader.size = 1.0;
				config.shader.displ = 0.0;
				config.shader.broken = false;
				config.shader.invert = true;
				config.shader.color = 3.0;
				config.shader.complex = 0.1;
				pn.refresh();
			});
			bt.addSeparator();
			bt.addButton({ title: "Random", label: "Change" }).on("click", () => {
				config.shader.time = Math.random() * 1.0;
				config.shader.u_noise = -Math.random() * 1.0 + Math.random() * 1.0;
				config.shader.turb = Math.random() * 1.0;
				config.shader.decay = Math.random() * 1.0;
				//config.shader.waves = Math.random() * 10.0;
				//config.shader.size = 1.0;
				config.shader.scale = Math.random() * 1.0;
				config.shader.displ = 0;
				config.shader.color = Math.random() * 2.0;
				config.shader.complex = Math.random() * 2.0;
				//config.shader.broken = false;
				//config.shader.invert = true;
				pn.refresh();
			});
		}
		generatePane();
	}
}

class Control {
	constructor(props) {
		this.controls = new OrbitControls(props.camera, props.canvas);
		this.init();
	}
	init() {
		this.controls.target.set(0, 0, 0);
		this.controls.rotateSpeed = 0.5;
		this.controls.enableZoom = false;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.01;
		this.update();
	}
	update() {
		this.controls.update();
	}
}

class Particles {
	constructor(props) {
		this.scene = props.scene ? props.scene : null;
		this.clock = new THREE.Clock();
		this.init();
	}
	init() {
		this.p_grp = new THREE.Object3D();
		this.p_mat = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: document.getElementById("vertexShader").textContent,
			fragmentShader: document.getElementById("fragmentShader").textContent
		});
		this.p_geo = new THREE.IcosahedronBufferGeometry(0.5, 80);
		this.p_mes = new THREE.Points(this.p_geo, this.p_mat);
		this.scene.add(this.p_mes);
	}
	render() {
		this.p_mat.uniforms["time"].value =
			this.clock.getElapsedTime() * config.shader.time;
		this.p_mat.uniforms["turb"].value = config.shader.turb;
		this.p_mat.uniforms["u_noise"].value = config.shader.u_noise * 0.1;
		this.p_mat.uniforms["decay"].value = config.shader.decay * 0.01;
		this.p_mat.uniforms["complex"].value = config.shader.complex;
		this.p_mat.uniforms["waves"].value = config.shader.waves * 3;
		this.p_mat.uniforms["pointscale"].value = config.shader.size;
		this.p_mat.uniforms["eqcolor"].value = config.shader.color;
		this.p_mat.uniforms["fragment"].value = config.shader.broken;
		this.p_mat.uniforms["scale"].value = config.shader.scale;
		this.p_mat.uniforms["displ"].value = config.shader.displ * 0.01;
		this.p_mat.uniforms["redhell"].value = config.shader.invert;
	}
}

class Space {
	constructor(props) {
		this.name = props.name ? props.name : "Null";
		this.canvas = props.canvas ? props.canvas : null;
		this.main();
	}
	main() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		});
		this.clock = new THREE.Clock();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45);
		this.camera.position.set(0, 0.5, 3);
		this.scene.background = new THREE.Color(0x000005);
		this.control = new Control({ camera: this.camera, canvas: this.canvas });
		//--
		this.axesHelper = new THREE.AxesHelper(2);
		this.axesHelper.position.y = -1.5;
		//this.scene.add(this.axesHelper);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShoftSHadowMap;
		this.init();
	}
	init() {
		const scene = this.scene;
		this.particle = new Particles({ scene });
		//--
		this.render();
		this.loop();
		this.resize();
	}
	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	render() {
		this.scene.rotation.y = this.clock.getElapsedTime() * config.scene.speed;
		this.camera.lookAt(this.scene.position);
		this.camera.updateMatrixWorld();
		this.renderer.render(this.scene, this.camera);
		this.control.update();
		this.particle.render();
	}
	loop() {
		this.render();
		requestAnimationFrame(this.loop.bind(this));
	}
}

const canvas = document.querySelector("canvas");
const world = new Space({ canvas });
const panel = new Panel();
window.addEventListener("resize", () => world.resize());
window.addEventListener("load", () => world.resize());

