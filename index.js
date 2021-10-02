const vshader = `
    void main() { 
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`
const fshader = `
    void main (void) {
        gl_FragColor = vec4(1.0, 0.1, 0.1, 1);
    }
`

const TARGET_POS_X = 2;
const SMOOTH_TIME = 0.1;

let speed = 0.02;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.ShaderMaterial({
    vertexShader: vshader,
    fragmentShader: fshader
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    rotateCube();
    moveCube();

    renderer.render(scene, camera);
}

function rotateCube() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function moveCube() {
    const rangeX = 2;
    cube.position.x = clamp(cube.position.x + speed, -rangeX, rangeX, () => { speed = -speed; });
}

animate();

function clamp(cur, min, max, callback) {
    if (cur > max) {
        callback();
        return max;
    }
    else if (cur < min) {
        callback();
        return min;
    }

    return cur;
}

// function lerp(a, b, t) {
//     return a * t + b * (1 - t)
// }