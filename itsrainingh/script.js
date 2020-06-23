// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('plane', 'plane.png').load((loader, resources) => {
    const plane = new PIXI.Sprite(resources.plane.texture);

    // Setup the position of the bunny
    plane.x = app.renderer.width / 2;
    plane.y = app.renderer.height / 2;

    // Rotate around the center
    plane.anchor.x = 0.5;
    plane.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(plane);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        plane.rotation += 0.01;
    });
});