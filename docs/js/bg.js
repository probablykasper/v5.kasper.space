// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/bg.js":[function(require,module,exports) {
// minOnSave: true, minifier: uglify-js
var canvasHeight = 500; // originally 400

var SEPARATION = 100;
var AMOUNTX = 80; // originally 80

var AMOUNTY = 10; // originally 80

var particleColor = "#3f3f3f";
var container;
var camera, scene, renderer;
var particles,
    particle,
    count = 0;
var mouseX = 0,
    mouseY = 0;
container = document.createElement('div');
container.classList.add("canvas-container");
container.classList.add("hidden");
setTimeout(function () {
  container.classList.remove("hidden");
}, 1000);
document.body.appendChild(container);

function getCanvasContainerWidth() {
  return document.querySelector(".canvas-container").clientWidth;
}

var windowHalfX = getCanvasContainerWidth() / 2;
var windowHalfY = canvasHeight / 2;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, getCanvasContainerWidth() / canvasHeight, 1, 10000);
  camera.position.z = 10000;
  scene = new THREE.Scene();
  particles = new Array();
  window.material = new THREE.SpriteCanvasMaterial({
    color: particleColor,
    program: function program(context) {
      context.beginPath();
      context.arc(0, 0, 0.5, 0, 2 * Math.PI, true);
      context.fill();
    }
  });
  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++] = new THREE.Sprite(material);
      particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
      particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
      scene.add(particle);
    }
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(getCanvasContainerWidth(), canvasHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  var canvasContainerWidth = getCanvasContainerWidth();
  windowHalfX = canvasContainerWidth / 2;
  windowHalfY = canvasHeight / 2;
  camera.aspect = canvasContainerWidth / canvasHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainerWidth, canvasHeight);
} //
//


function animate() {
  requestAnimationFrame(animate);
  render();
}

var defaultCanvasY = 0;
var defaultCameraPos = 250;
camera.position.set(0, defaultCameraPos, 1200);
container.style.transform = "translateY(".concat(defaultCanvasY - 0.1 * document.documentElement.scrollTop, "px)");
document.addEventListener('scroll', function (e) {
  var yValue = e.target.scrollingElement.scrollTop;
  camera.position.setY(defaultCameraPos + 1 * yValue);
  container.style.transform = "translateY(".concat(defaultCanvasY - 0.1 * yValue, "px)");
});

function render() {
  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
    }
  }

  renderer.render(scene, camera);
  count += 0.1;
}
},{}]},{},["js/bg.js"], null)
//# sourceMappingURL=/js/bg.js.map