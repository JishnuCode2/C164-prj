AFRAME.registerComponent("walls", {
    schema: {
      height: {type: "number", default:5},
      width:{type: "number", default:10},
      depth: {type: "number", default:1},
    },

    setColor: function(){
        var letters = "0123456789ABCDEF";
        
        var color = '#';
        
        for (var i = 0; i < 6; i++){
        color += letters[(Math.floor(Math.random() * 16))];            
        }

        return color
    },

    init: function(){
     var posArX = ["-11", "-12","-7","-29","15","-35","-16","-20","-23","33"]
     var posArZ = ["-18", "-26", "-52","-11","-40","-39","-59","-17","-43","-58"]
     var rotAr = ["90","90","0","90","0","0","90","90","0","90"]

     for(var i=0; i<10 ;i++){
       var box = document.createElement("a-entity");
 
       box.setAttribute("id", "wall" + i);
 
       posX = posArX[i]
       posY = 1.5;
       posZ = posArZ[i]
       
       var rotationY = rotAr[i]
  
       position = {x: posX, y:posY, z:posZ};
       box.setAttribute("position", position);
 
       box.setAttribute("geometry",{
         primitive: "box",
         height: this.data.height,
         width: this.data.width,
         depth: this.data.depth
       });

       var elColor= this.setColor()
 
       box.setAttribute("material",{
         color: elColor,

       });

       box.setAttribute("rotation", {x:0, y:rotationY, z:0})
 
       box.setAttribute("static-body", {});
 
       var sceneEl = document.querySelector("#scene");
       sceneEl.appendChild(box)
     }
    }
})