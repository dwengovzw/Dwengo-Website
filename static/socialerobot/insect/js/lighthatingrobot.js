export default class LightHatingRobot{
    canvas = null;
    ctx = null;
    robot = {
        location: [0, 0],
        angle: Math.PI/4,
        width: 100,
        height:75, 
        speed: 5
    }
    lampPosition = [0, 0]
    mousePosition = [0, 0]
    lampRadius = 100;
    constructor(startLocation, startAngle){
        this.robot.location = startLocation;
        this.robot.angle = startAngle;
    }

    initDisplay(){
        this.canvas = document.getElementById("simulationCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.addEventListener('mousemove', (evt) => {
            var mousePos = this.getMousePos(evt);
            this.mousePosition = mousePos;
            console.log(this.mousePosition);
        }, false);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return [evt.clientX - rect.left, evt.clientY - rect.top];
      }


    getDistanceBetweenPoints(p1, p2){
        return Math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2);
    }

      update(){
        this.lampPosition = this.mousePosition;
        let d = this.getDistanceBetweenPoints(this.robot.location, this.lampPosition);
        let offset = 60;
        let rotationSpeed = Math.PI/45;
        
        let incrementAngle = Math.atan((this.robot.width/2)/(this.robot.height/2));
        let p1 = [this.robot.location[0] + this.robot.height/2*Math.cos(this.robot.angle + incrementAngle),
                  this.robot.location[1] + this.robot.height/2*Math.sin(this.robot.angle + incrementAngle)]

        let p2 = [this.robot.location[0] + this.robot.height/2*Math.cos(this.robot.angle - incrementAngle),
                    this.robot.location[1] + this.robot.height/2*Math.sin(this.robot.angle - incrementAngle)]

        if (this.lampRadius > Math.sqrt((p1[0] - this.lampPosition[0])**2 + (p1[1] - this.lampPosition[1])**2)){
            this.robot.angle = (this.robot.angle - rotationSpeed)%(2*Math.PI);
        }else if(this.lampRadius > Math.sqrt((p2[0] - this.lampPosition[0])**2 + (p2[1] - this.lampPosition[1])**2)){
            this.robot.angle = (this.robot.angle + rotationSpeed)%(2*Math.PI);
        }else if(p1[0] < offset || p1[1] < offset || p1[0] > this.canvas.width - offset || p1[1] > this.canvas.height - offset){
            this.robot.angle = (this.robot.angle - rotationSpeed)%(2*Math.PI);
        }else if (p2[0] < offset || p2[1] < offset || p2[0] > this.canvas.width - offset || p2[1] > this.canvas.height - offset){
            this.robot.angle = (this.robot.angle + rotationSpeed)%(2*Math.PI);
        }else{
            /*if (this.robot.location[0] > 0 + offset && this.robot.location[0] < this.canvas.width - offset &&
                this.robot.location[1] > 0 + offset && this.robot.location[1] < this.canvas.height - offset) {
                    
            }else if (this.robot.location[1] < 0 + offset){
                this.robot.angle = (this.robot.angle + Math.PI + 2*(Math.PI/2 - this.robot.angle))%(2*Math.PI);
            }else if (this.robot.location[1] > this.canvas.height - offset){
                this.robot.angle = (this.robot.angle + Math.PI + 2*(3*Math.PI/2 - this.robot.angle))%(2*Math.PI);
            }else if (this.robot.location[0] > this.canvas.width - offset){
                this.robot.angle = (this.robot.angle + Math.PI + 2*(0*Math.PI/2 - this.robot.angle))%(2*Math.PI);
            }else if (this.robot.location[0] < 0 + offset){
                this.robot.angle = (this.robot.angle + Math.PI + 2*(Math.PI - this.robot.angle))%(2*Math.PI);
            }*/
            let deltaX = Math.cos(this.robot.angle);
            let deltaY = Math.sin(this.robot.angle);
            this.robot.location[0] += deltaX*this.robot.speed;
            this.robot.location[1] += deltaY*this.robot.speed;
        }
      }

      render(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#696969";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#000000";
        this.ctx.translate(this.robot.location[0], this.robot.location[1]);
        this.ctx.rotate(this.robot.angle);
        this.ctx.fillRect(-1*this.robot.width/2, -1*this.robot.height/2, this.robot.width, this.robot.height);
        this.ctx.rotate(-1*this.robot.angle);
        this.ctx.translate(-1*this.robot.location[0], -1*this.robot.location[1]);


        // Fill with gradient
        
        this.ctx.beginPath();
        var grd = this.ctx.createRadialGradient(this.lampPosition[0], this.lampPosition[1], 20, this.lampPosition[0], this.lampPosition[1], this.lampRadius);
        grd.addColorStop(0, "yellow");
        grd.addColorStop(1, "transparent");
        this.ctx.arc(this.lampPosition[0], this.lampPosition[1], this.lampRadius, 0, 2*Math.PI);
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.ctx.closePath();
      }



}

window.onload = e => {
    console.log("loading");
    let lightHatingRobot = new LightHatingRobot([250, 250], -1*Math.PI/4);
    lightHatingRobot.initDisplay();
    let gameloop = () => {
        setTimeout(()=>{
            lightHatingRobot.update();
            window.requestAnimationFrame(()=>{
                lightHatingRobot.render();
            });
            gameloop();
        }, 33)
    }
    gameloop();
};