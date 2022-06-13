
import { Objects, Vec2, Planet } from './Objects.js';



export class SimGravity {
    constructor(count) {
        this.count = count;
        //Generate list of random Objects with random position, velocity, mass, radius and color to simulate
        this.objects = [];
        for (let i = 0; i < this.count; i++) {
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            let vx = Math.random() * .8 - .4;
            let vy = Math.random() * .8 - .4;
            let mass = Math.random() * 200;
            let radius = 4 * Math.cbrt(mass);

            this.objects.push(new Objects(new Vec2(x, y), new Vec2(vx, vy), mass, radius, 255));
        }

        //bindings  

        this.stepForward = this.stepForward.bind(this);
        this.draw = this.draw.bind(this);

    }

    stepForward() {
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {

                if (this.objects[i] == null)
                    continue;
                if (this.objects[j] == null) {
                    continue;
                }
                if (this.objects[i] === this.objects[j])
                    continue;
                this.objects[i].interact(this.objects[j]);
                if (this.objects[j].consumed) {
                    this.objects[j] = null;
                }
            }
        }

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] == null)
                continue;
            this.objects[i].update();
        }
    }

    draw(p5) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i] == null) {
                return;
            }
            this.objects[i].draw(p5);
        }
    }
}



export class SimPlanet {
    constructor() {
        this.planets = [];
        this.sun = new Planet(new Vec2(window.innerWidth / 2, window.innerHeight / 2), new Vec2(0, 0), 500000, 255);

        //bindings
        this.stepForward = this.stepForward.bind(this);
        this.draw = this.draw.bind(this);
        this.addPlanet = this.addPlanet.bind(this);
    }

    draw(p5) {
        this.sun.draw(p5);
        this.planets.forEach(planet => {
            planet.draw(p5);
        });
    }

    stepForward() {
        this.planets.forEach(planet => {

            //this.planets.forEach(other => {
            //     if (planet !== other)
            //         planet.interact(other);
            //});
            planet.interact(this.sun);
            //this.sun.interact(planet);
            planet.update();
        }
        );
        //this.sun.update();
    }

    addPlanet(planet) {
        this.planets.push(planet);
    }
}

