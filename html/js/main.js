//
//  main.js
//
//  A project template for using arbor.js
//

(function($){

  // var Renderer = function(canvas){
  //   var canvas = $(canvas).get(0)
  //   var ctx = canvas.getContext("2d");
  //   var gfx = arbor.Graphics(canvas)
  //   var particleSystem
  //
  //   var that = {
  //     init:function(system){
  //       //
  //       // the particle system will call the init function once, right before the
  //       // first frame is to be drawn. it's a good place to set up the canvas and
  //       // to pass the canvas size to the particle system
  //       //
  //       // save a reference to the particle system for use in the .redraw() loop
  //       particleSystem = system
  //
  //       // inform the system of the screen dimensions so it can map coords for us.
  //       // if the canvas is ever resized, screenSize should be called again with
  //       // the new dimensions
  //       particleSystem.screenSize(canvas.width, canvas.height)
  //       particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side
  //
  //       // set up some event handlers to allow for node-dragging
  //       that.initMouseHandling()
  //     },
  //
  //     redraw:function(){
  //       //
  //       // redraw will be called repeatedly during the run whenever the node positions
  //       // change. the new positions for the nodes can be accessed by looking at the
  //       // .p attribute of a given node. however the p.x & p.y values are in the coordinates
  //       // of the particle system rather than the screen. you can either map them to
  //       // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
  //       // which allow you to step through the actual node objects but also pass an
  //       // x,y point in the screen's coordinate system
  //       //
  //       ctx.fillStyle = "white"
  //       ctx.fillRect(0,0, canvas.width, canvas.height)
  //
  //       particleSystem.eachEdge(function(edge, pt1, pt2){
  //         // edge: {source:Node, target:Node, length:#, data:{}}
  //         // pt1:  {x:#, y:#}  source position in screen coords
  //         // pt2:  {x:#, y:#}  target position in screen coords
  //
  //         // draw a line from pt1 to pt2
  //         ctx.strokeStyle = "rgba(0,0,0, .333)"
  //         ctx.lineWidth = 1
  //         ctx.beginPath()
  //         ctx.moveTo(pt1.x, pt1.y)
  //         ctx.lineTo(pt2.x, pt2.y)
  //         ctx.stroke()
  //       })
  //
  //       particleSystem.eachNode(function(node, pt){
  //         // node: {mass:#, p:{x,y}, name:"", data:{}}
  //         // pt:   {x:#, y:#}  node position in screen coords
  //
  //         // draw a rectangle centered at pt
  //         // node: {mass:#, p:{x,y}, name:"", data:{}}
  //         // pt:   {x:#, y:#}  node position in screen coords
  //
  //         // determine the box size and round off the coords if we'll be
  //         // drawing a text label (awful alignment jitter otherwise...)
  //         var label = node.data.label||""
  //         var w = ctx.measureText(""+label).width + 10
  //         if (!(""+label).match(/^[ \t]*$/)){
  //           pt.x = Math.floor(pt.x)
  //           pt.y = Math.floor(pt.y)
  //         }else{
  //           label = null
  //         }
  //
  //         // draw a rectangle centered at pt
  //         if (node.data.color) ctx.fillStyle = node.data.color
  //         else ctx.fillStyle = "rgba(0,0,0,.2)"
  //         if (node.data.color=='none') ctx.fillStyle = "white"
  //
  //         if (node.data.shape=='dot'){
  //           gfx.oval(pt.x-w/2, pt.y-w/2, w,w, {fill:ctx.fillStyle})
  //           nodeBoxes[node.name] = [pt.x-w/2, pt.y-w/2, w,w]
  //         }else{
  //           gfx.rect(pt.x-w/2, pt.y-10, w,20, 4, {fill:ctx.fillStyle})
  //           nodeBoxes[node.name] = [pt.x-w/2, pt.y-11, w, 22]
  //         }
  //
  //         // draw the text
  //         if (label){
  //           ctx.font = "12px Helvetica"
  //           ctx.textAlign = "center"
  //           ctx.fillStyle = "white"
  //           if (node.data.color=='none') ctx.fillStyle = '#333333'
  //           ctx.fillText(label||"", pt.x, pt.y+4)
  //           ctx.fillText(label||"", pt.x, pt.y+4)
  //         }
  //       })
  //     },
  //
  //     initMouseHandling:function(){
  //       // no-nonsense drag and drop (thanks springy.js)
  //       var dragged = null;
  //
  //       // set up a handler object that will initially listen for mousedowns then
  //       // for moves and mouseups while dragging
  //       var handler = {
  //         clicked:function(e){
  //           var pos = $(canvas).offset();
  //           _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
  //           dragged = particleSystem.nearest(_mouseP);
  //
  //           if (dragged && dragged.node !== null){
  //             // while we're dragging, don't let physics move the node
  //             dragged.node.fixed = true
  //           }
  //
  //           $(canvas).bind('mousemove', handler.dragged)
  //           $(window).bind('mouseup', handler.dropped)
  //
  //           return false
  //         },
  //         dragged:function(e){
  //           var pos = $(canvas).offset();
  //           var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
  //
  //           if (dragged && dragged.node !== null){
  //             var p = particleSystem.fromScreen(s)
  //             dragged.node.p = p
  //           }
  //
  //           return false
  //         },
  //
  //         dropped:function(e){
  //           if (dragged===null || dragged.node===undefined) return
  //           if (dragged.node !== null) dragged.node.fixed = false
  //           dragged.node.tempMass = 1000
  //           dragged = null
  //           $(canvas).unbind('mousemove', handler.dragged)
  //           $(window).unbind('mouseup', handler.dropped)
  //           _mouseP = null
  //           return false
  //         }
  //       }
  //
  //       // start listening
  //       $(canvas).mousedown(handler.clicked);
  //
  //     },
  //
  //   }
  //   return that
  // }

  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  var counter = 0;
  var playRandomEvent = function (sys, nodes) {
    var colors = ["#FF0303", "#03BBFF", "#BBFF03", "#FF0333", "#3303FF"];
    counter++;
    console.log("Called " + counter);
    var r = counter % colors.length;
    var task_color = getRandomColor();
    gEvents = [{from:"g", to:"a", message:"Blueprint"},
                {from:"a", to:"r1", message:"Blueprint"},
                {from:"r1", to:"s1", message:"Blueprint"},
                {from:"s1", to:"v1", message:"Blueprint"},
   ]
    var edges = sys.getEdgesFrom("g");
    for(i in gEvents){
      r = Math.floor(Math.random() * 10) % edges.length;
      e = gEvents[i]
      // console.log(sys.getEdges(e.from, e.to));
      // edge = sys.getEdges(e.from, e.to)[0];
      edge = edges[r];

      var maxSI = 4;
      if(edge){
        sys.tweenEdge(edge, .001, {message:"Task " + counter, message_color:task_color, color:task_color});
        // sys.tweenNode(edge.source, .1, {delay:i, color:"green"});
        // console.log(edge.source.data);

        sys.tweenEdge(edge, 5, {message:" "});
        // sys.tweenNode(edge.source, 2, {delay:i, color:nodes[e.from].color});
        if(!nodes) return
        if(nodes[edge.target.name]) {
          nodes[edge.target.name].si *= 0.9;
        }else{
          nodes[edge.target.name] = edge.target.data;
          nodes[edge.target.name].si = maxSI * 0.9;
        }
        var si = nodes[edge.target.name].si;
        console.log(si*100/4);
        var siColor = getScaleColor(Math.floor(si*100)/maxSI);
        sys.tweenNode(edge.target, .002, {color:siColor});
        edges = sys.getEdgesFrom(edge.target);
      }
    }
    return false;
  }


  $(document).ready(function(){
    var sys = arbor.ParticleSystem(9600, 512, 12) // create the system with sensible repulsion/stiffness/friction
    sys.parameters({gravity:false, fps:50}) // use center-gravity to make the graph settle nicely (ymmv)
    sys.renderer = Renderer("#canvasView") // our newly created renderer will have its .init() method called shortly by sys...
    sys.screenPadding(100)
    // add some nodes to the graph and watch it go...
    var nodes = {};

    nodes["a"] = {label:"Cell Manager", color:"gray", mass:4, si:4}
    nodes["g"] = {label:"Gateway Service", fixed:true, color:"green", mass:4}
    nodes["r1"] = {label:"pRouter1", color:"gray", mass:3, si:4}
    nodes["r2"] = {label:"pRouter2", color:"gray", mass:3, si:4}
    nodes["s1"] = {label:"pSwitch1", color:"gray", mass:2, si:4}
    nodes["s2"] = {label:"pSwitch2", color:"gray", mass:2, si:4}
    nodes["s3"] = {label:"pSwitch3", color:"gray", mass:2,si:4}
    nodes["v1"] = {label:"vRM1", shape:'dot', color:"gray", mass:1, si:4}
    nodes["v2"] = {label:"vRM2", shape:'dot', color:"gray", mass:1, si:4}
    nodes["v3"] = {label:"vRM3", shape:'dot', color:"gray", mass:1, si:4}
    nodes["v4"] = {label:"vRM4", shape:'dot', color:"gray", mass:1, si:4}

    for (key in nodes){
      var value = nodes[key];
      sys.addNode(key, value);
    }

    sys.addEdge('g','a', {directed: true, color:"green", message:"Sample message\nNew line"})
    sys.addEdge('a','r1', {length:5, color:"#000000"})
    sys.addEdge('a','r2', {length:5, color:"#000000"})
    sys.addEdge('r1','s1', {length:2.5, color:"#000000"})
    sys.addEdge('r1','s2', {length:2.5, color:"#000000"})
    sys.addEdge('r2','s3', {length:2.5, color:"#000000"})
    sys.addEdge('r2','s4', {length:2.5, color:"#000000"})
    sys.addEdge('s4','s43', {length:2.5, color:"#000000"})
    sys.addEdge('s4','s44', {length:2.5, color:"#000000"})
    sys.addEdge('s4','s45', {length:2.5, color:"#000000"})
    sys.addEdge('s1', 'v1', {length:1})
    sys.addEdge('s1', 'v2', {length:1})
    sys.addEdge('s2', 'v3', {length:1})
    sys.addEdge('s3', 'v4', {length:1})
    //
    sys.addEdge('s1', 'v15', {length:1})
    sys.addEdge('s2', 'v23', {length:1})
    sys.addEdge('s1', 'v14', {length:1})
    sys.addEdge('s2', 'v21', {length:1})
    sys.addEdge('s1', 'v13', {length:1})
    sys.addEdge('s2', 'v22', {length:1})
    sys.addEdge('s3', 'v5', {length:1})
    sys.addEdge('s3', 'v6', {length:1})
    sys.addEdge('s3', 'v7', {length:1})
    sys.addEdge('s3', 'v8', {length:1})
    sys.addEdge('s3', 'v9', {length:1})
    sys.addEdge('s3', 'v10', {length:1})
    sys.addEdge('s3', 'v11', {length:1})
    sys.addEdge('s3', 'v12', {length:1})
    // sys.addNode('f', {alone:true, mass:.25})
    // sys.addNode('g', {alone:true, mass:.25, label:"The g"})

    // or, equivalently:
    //
    // sys.graft({
    //   nodes:{
    //     f:{alone:true, mass:.25}
    //   },
    //   edges:{
    //     a:{ b:{},
    //         c:{},
    //         d:{},
    //         e:{}
    //     }
    //   }
    // })


    //Set code to run when the link is clicked
    // by assigning a function to "onclick"
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    var a = document.getElementById("alterlink");
    var ten = document.getElementById("moreEvents");
    a.onclick = function(e){
      playRandomEvent(sys, nodes);
    }
    ten.onclick = function(e){
      for(i = 0; i < 5; i++){
        // Usage!
        sleep(500).then(() => {
          playRandomEvent(sys, nodes);
        })
      }
    }


  })

})(this.jQuery)
