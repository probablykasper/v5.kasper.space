// minOnSave: true, minifier: uglify-js
var canvasHeight = 500; // originally 400
var SEPARATION = 100;
var AMOUNTX = 80; // originally 80
var AMOUNTY = 10; // originally 80
var particleColor = "#3f3f3f";

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

container = document.createElement( 'div' );
container.classList.add("canvas-container");
container.classList.add("hidden");
setTimeout(function() {
    container.classList.remove("hidden");
}, 1000);
document.body.appendChild( container );

function getCanvasContainerWidth() {
	return document.querySelector(".canvas-container").clientWidth;
}

var windowHalfX = getCanvasContainerWidth() / 2;
var windowHalfY = canvasHeight / 2;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 75, getCanvasContainerWidth() / canvasHeight, 1, 10000 );
	camera.position.z = 10000;

	scene = new THREE.Scene();

	particles = new Array();

	window. material = new THREE.SpriteCanvasMaterial( {

		color: particleColor,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 0.5, 0, 2*Math.PI, true );
			context.fill();

		}

	} );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i ++ ] = new THREE.Sprite( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( getCanvasContainerWidth(), canvasHeight );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
  var canvasContainerWidth = getCanvasContainerWidth();

	windowHalfX = canvasContainerWidth / 2;
	windowHalfY = canvasHeight / 2;

	camera.aspect = canvasContainerWidth / canvasHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( canvasContainerWidth, canvasHeight );

}

//

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

camera.position.set(0,0,1200);
window.camera = camera
const defaultCanvasY = -125
window.container = container
container.style.transform = `translateY(${defaultCanvasY}px)`
document.addEventListener('scroll', (e) => {
	// console.log(e)
	let yValue = e.target.scrollingElement.scrollTop
	// let yValue = e.pageY/document.documentElement.clientHeight - 0.5
	// let xValue = e.pageX/document.documentElement.clientWidth - 0.5
	// if (yValue > 150) yValue = 150
	// console.log(yValue)
	// camera.rotation.set(yValue/30,xValue/10,-xValue/10);
	console.log(yValue)
	camera.position.setY(120+1*yValue);
	container.style.transform = `translateY(${defaultCanvasY-0.4*yValue}px)`
})
setInterval(() => {
	// camera.rotation.set(new Date().valueOf()%10000*0.001,0,0);
}, 10)

function render() {
	// camera.position.set(0,355,122);
	// new Date().valueOf() % 10
	// camera.position.set(0,150,722);

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
				( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
				( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

		}

	}

	renderer.render( scene, camera );

	count += 0.1;

}
