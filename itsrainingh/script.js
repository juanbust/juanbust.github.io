// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xffffff, resizeTo: window});
let objs = [];

function crearH(loader, resources)
{
    for(let i = 0; i != 100;i++){
        let plane = new PIXI.Sprite(resources.plane.texture);
    
        let velx = (Math.random() - 0.5) * 2;
        let vely = 0;
        let alreadychangedvelx = false;
        let alreadychangedvely = false;
        plane.x = app.renderer.width * Math.random();
        plane.y = app.renderer.height * Math.random();
    
        plane.anchor.x = 0.5;
        plane.anchor.y = 1;
    
        plane.scale.x = Math.random() / 5;
        plane.scale.y = plane.scale.x;
        objs.push(plane)
        app.stage.addChild(plane);
    
        // Listen for frame updates
        app.ticker.add(() => {
            app.renderer.width = window.innerWidth;
            app.renderer.height = window.innerHeight;
            vely += 0.5;
            if(plane.y > app.renderer.height || plane.y < 0)
            {
                if(!alreadychangedvely)
                {
                    
                    if(plane.y > app.renderer.height)
                    {
                        vely = ((app.renderer.height - vely) * -1);
                        plane.y = app.renderer.height;
                    }
                    else
                    {
                        vely = ((app.renderer.height - vely) * -1);
                        plane.y = 0;
                    }
                    alreadychangedvely = true;
                }
                else
                {
                    alreadychangedvely = false;
                }
            }
    
            if(plane.x > app.renderer.width || plane.x < 0)
            {
                if(!alreadychangedvelx)
                {
                    velx = velx * -1;
                    if(plane.x > app.renderer.width)
                    {
                        plane.x = app.renderer.width;
                    }
                    else
                    {
                        plane.x = 0;
                    }
                    alreadychangedvelx = true;
                }
                else
                {
                    alreadychangedvelx = false;
                }
            }
            plane.y += vely;
            plane.x += velx;
        });
    }
}




// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

document.getElementById("hregen").onclick = crearH;

// load the texture we need
app.loader.add('plane', 'h.png').load((loader, resources) => {
    
    crearH(loader,resources);
});