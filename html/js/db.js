//
//  main.js
//
//  A project template for using arbor.js
//

(function($){

  var metrics = {};
  var layouts = {};
  var componentCol = {'CellManager' : 'green', 'pRouter' : 'blue', 'pSwitch' : 'purple', 'vRM' : 'orange'};
  var componentshape = {'CellManager' : 'dot', 'pRouter' : 'rect', 'pSwitch' : 'rect', 'vRM' : 'dot'};

  var recursiveDBParse = function(sys, id){
    $.ajax({
        type:"GET",
        async:true, // set async false to wait for previous response
        url: "/model/" + id,
        dataType:"json",
        success: function(datas)
        {
            var data = datas[0];
            if(data){
                var node = data.id;
                var role = data.role;
                var members = data.members.split(",");
                props = {label: role, color:componentCol[role], shape:componentshape[role]};
                if(!sys.getNode(node)){
                    sys.addNode(node, props);
                }else{
                    console.log("tweening");
                    sys.tweenNode(node, 0.001, props);
                }
                if(members.length > 0){
                    for(i in members){
                        name = members[i];
                        if(name.substr(0,1) == " "){
                          name = name.substr(1, name.length);
                        }
                        if(!sys.getNode(name)){
                            sys.addNode(name, {shape:'dot', color:'green'});
                        }
                        sys.addEdge(node, name);
                        console.log(node + "(" + role + ") -> " + name);
                        recursiveDBParse(sys, name);
                    }
                }
            }
        }
    });
  }

  $(document).ready(function(){
    var sys;

    var play = document.getElementById("startDB");
    var layout = {};
    var props = {};
    play.onclick = function(e){
      $.getJSON( "/model/last/CM", function( data ) {
          if(!data){
              console.log("No Cell Manager found.");
              document.getElementById("statusSpan").className = "glyphicon glyphicon-alert";
              document.getElementById("statusText").innerText = "No Cell Manager found.";
              return;
          }
          var cellId = data.id;
          document.getElementById("spanStatus").className = "glyphicon glyphicon-ok";
          if(sys)
            sys.stop();
          sys = arbor.ParticleSystem(1600, 510, 0.5) // create the system with sensible repulsion/stiffness/friction
          sys.parameters({gravity:false, fps:30}) // use center-gravity to make the graph settle nicely (ymmv)
          sys.renderer = Renderer("#canvasView") // our newly created renderer will have its .init() method called shortly by sys...
          sys.screenPadding(100);
          recursiveDBParse(sys, cellId);
      });
    }
  })

})(this.jQuery)
