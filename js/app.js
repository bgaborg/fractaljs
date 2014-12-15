define(["three", "dat.gui", "shaders/FresnelShader", "util/OrbitControl"], function (THREE, GUI, FresnelShader, OrbitControl) {
    "use strict"

    return function () {
        var self = this;
        var gui = new dat.GUI();

        var settings = {
            lookAtx: 0
        }

        gui.add(settings, 'lookAtx', -100, 100);

        self.init = function () {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.set(0, 120, 85);
            camera.up = new THREE.Vector3(0, 0, 1);
            camera.lookAt(new THREE.Vector3(0, -10, 0));

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMapEnabled = true;
            renderer.shadowMapSoft = true;

            document.body.appendChild(renderer.domElement);
            var controls = new OrbitControl(camera, renderer.domElement);

            /**
             * CUBE
             */
            var cube = new THREE.Mesh(
                new THREE.SphereGeometry(20, 20, 20),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('img/stone_texture_012.JPG')
                }));
            cube.castShadow = true;
            scene.add(cube);

            /**
             * FLOOR
             */
            var floor = new THREE.Mesh(
                new THREE.PlaneGeometry(100, 100, 10, 10),
                new THREE.MeshLambertMaterial({
                    map: THREE.ImageUtils.loadTexture('img/road_bare_asphalt.jpg'),
                    side: THREE.DoubleSide
                }));
            floor.position.z = -50;
            floor.receiveShadow = true;
            scene.add(floor);

            // directional lighting
            // LIGHT
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0,50,250);
            scene.add(light);
            light.castShadow = true;

            // revolutions per second
            var angularSpeed = 0.2;
            var lastTime = 0;

            // this function is executed on each animation frame
            function animate(time) {
                // update
                var timeDiff = time - lastTime;
                var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
                cube.rotation.y += angleChange;
                cube.rotation.z += angleChange;
                lastTime = time;
                controls.update();
                // render
                renderer.render(scene, camera);
                // request new frame
                requestAnimationFrame(function (time) {
                    animate(time);
                });
            }

            animate(0);
        }
    }
});