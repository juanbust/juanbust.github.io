// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({width: window.innerWidth - 10, height: window.innerHeight - 10, backgroundColor: 0xffffff});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('plane', 'plane.png').load((loader, resources) => {
    let objs = [];
    for(let i = 0; i != 20;i++){
    let plane = new PIXI.Sprite(resources.plane.texture);

    // Setup the position of the bunny
    let vely = 0;
    plane.x = app.renderer.width * Math.random();
    plane.y = app.renderer.height * Math.random();

    // Rotate around the center
    plane.anchor.x = 0.5;
    plane.anchor.y = 1;

    plane.scale.x = 0.5;
    plane.scale.y = 0.5;
    objs.push(plane)
    // Add the bunny to the scene we are building
    app.stage.addChild(plane);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        vely += 0.1;
        if(plane.y > app.renderer.height)
        {
            vely = 100;
        }
        plane.y += vely;
    });
}
});