// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({width: window.innerWidth - 10, height: window.innerHeight - 10, backgroundColor: 0xffffff});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('plane', 'h.png').load((loader, resources) => {
    let objs = [];
    for(let i = 0; i != 100;i++){
    let plane = new PIXI.Sprite(resources.plane.texture);

    // Setup the position of the bunny
    let velx = Math.sign(Math.random() - 0.5) * 10;
    let vely = 0;
    plane.x = app.renderer.width * Math.random();
    plane.y = app.renderer.height * Math.random();

    // Rotate around the center
    plane.anchor.x = 0.5;
    plane.anchor.y = 1;

    plane.scale.x = Math.random() / 2;
    plane.scale.y = plane.scale.x;
    objs.push(plane)
    // Add the bunny to the scene we are building
    app.stage.addChild(plane);

    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        vely += 0.1;
        if(plane.y > app.renderer.height)
        {
            vely = vely * -1;
        }
        if(plane.x > app.renderer.width || plane.x < 0)
        {
            velx = velx * -1;
        }
        plane.y += vely;
        plane.x += velx;
    });
}
});