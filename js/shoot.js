AFRAME.registerComponent("pellets", {

    init: function () {
      this.shootpellet();
    },

    setColor: function(){ 
        var letters = "0123456789ABCDEF";
        
        var color = '#';
        
        for (var i = 0; i < 6; i++){
        color += letters[(Math.floor(Math.random() * 16))];            
        }

        return color
    },
    
    shootpellet: function () {
      window.addEventListener("keyup", (e) => {
        if (e.key === "z") {
          var pellet = document.createElement("a-entity");
  
          pellet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });

          var elColor = this.setColor();
  
          pellet.setAttribute("material", "color", elColor);
  
          var cam = document.querySelector("#camera-rig");
  
          pos = cam.getAttribute("position");

          var camera = document.querySelector("#camera").object3D;
  
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);

          pellet.setAttribute("position", {
            x: (pos.x - direction.multiplyScalar(1).x),
            y: pos.y+1,
            z: pos.z-0.5,
          });
          pellet.setAttribute("velocity", direction.multiplyScalar(-10));
          var scene = document.querySelector("#scene");
  
          pellet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });

          scene.appendChild(pellet);  

          pellet.addEventListener("collide", this.removepellet);

          this.shootSound();

          var lifeTime = 100
          setInterval(()=>{
            lifeTime -= 1;
            if(lifeTime === 0){
                pellet.removeEventListener("collide", this.removepellet);
  
                var scene = document.querySelector("#scene");
                scene.removeChild(pellet);       
            }
          },1000)


        }
      });
    },
    removepellet: function (e) {
      console.log(e)

      var element = e.detail.target.el;
      var pos = element.getAttribute("position");
      pos.z -= 0.2
      console.log(pos)
  
      var elementHit = e.detail.body.el;
      console.log(elementHit.getAttribute("rotation"))

        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });

        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);

        element.removeEventListener("collide", this.shoot);

        var scene = document.querySelector("#scene");
        scene.removeChild(element);

        var paintEl = document.createElement("a-entity");
        paintEl.setAttribute("position", pos)
        paintEl.setAttribute("material", {
          color: element.getAttribute("material").color,
          src: "./images/download.jpeg",
          repeat: "1 1 1"
        });
        paintEl.setAttribute("geometry", {primitive: "box", width: 0.5, height:0.5, depth:0.5})
        scene.appendChild(paintEl)
        console.log(paintEl.getAttribute("geometry"))
        var lifeTime = 10
        setInterval(()=>{
          lifeTime -= 1;
          if(lifeTime === 0){
              paintEl.removeEventListener("collide", this.shoot);

              var scene = document.querySelector("#scene");
              scene.removeChild(paintEl);       
          }
        },1000)
      
    },
    shootSound: function(){
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    }
  });
  
  