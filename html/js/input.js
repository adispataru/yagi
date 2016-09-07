//
//  main.js
//
//  A project template for using arbor.js
//

(function($){

  function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  var counter = 0;
  var colors = ["#FF0303", "#03BBFF", "#BBFF03", "#FF0333", "#3303FF"];
  var playRandomEvent = function (sys, nodes) {
    counter++;
    console.log("Called " + counter);
    var r = counter % colors.length;
    var task_color = getRandomColor();
    gEvents = [{from:"g", to:"a", message:"Blueprint"},
                {from:"a", to:"r1", message:"Blueprint"},
                {from:"r1", to:"s1", message:"Blueprint"},
                {from:"s1", to:"v1", message:"Blueprint"},
   ]
    var edges = sys.getEdgesFrom("CM");
    var edge;
    for(i in gEvents){
      r = Math.floor(Math.random() * 10) % edges.length;
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
        if(!nodes){
            edges = sys.getEdgesFrom(edge.target);
            sys.tweenNode(edge.target, .002, {color:task_color});
            if(edges.length == 0) sys.pruneNode(edge.target);
            // sys.tweenNode(edge.target, 5, {color:"gray"});
           continue;
         }

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

  var mergeRandomVRacks = function (sys, nodes) {
    counter++;
    console.log("Called " + counter);
    var r = counter % colors.length;
    var task_color = getRandomColor();
    var edges = sys.getEdgesFrom("CM");
    var edge;
    for(i in [0, 1, 2, 3]){
      r = Math.floor(Math.random() * 10) % edges.length;
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

        console.log(edge.target.data.label);
        if(edge.target.data.label == "v" && edges.length > 1){
          r2 = Math.floor(Math.random() * 10) % edges.length;
          if(r2 == r)
            r2 = r2 + 1 % edges.length;
          edge2 = edges[r2];
          v1 = edge.target;
          v2 = edge2.target;
          v1Size = v1.data.size;
          v2Size = v2.data.size;
          s = v1Size+v2Size;
          sys.pruneNode(v2.name);
          sys.tweenNode(v1.name, .5,{size:s});

        }

        edges = sys.getEdgesFrom(edge.target);
        sys.tweenNode(edge.target, .002, {color:task_color});
        // if(edges.length == 0) {
        //   sys.pruneNode(edge.target)
        // }
        // sys.tweenNode(edge.target, 5, {color:"gray"});
       continue;

      }
    }


    return false;
  }

  var readTextFile = function (file){
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      var allText;
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  allText = rawFile.responseText;
                  alert(allText);
              }
          }
      }
      rawFile.send(null);
      return allText;
  }

  var metrics = {};
  var layouts = {};
  var percentageMultiplier = [25, 100, 100, 100, 100, 0.1, 0.1];

  $(document).ready(function(){
    var sys;
    // add some nodes to the graph and watch it go...
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    // var text = readTextFile("/LICENSE");
    // alert(text);
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //do your stuff!
      document.getElementById('fileinput').addEventListener('change', paintLayout, false);
      var nameLabel = document.getElementById('fileName');
      function paintLayout(evt) {
        //Retrieve the first (and only!) File from the FileList object
        if(sys)
          sys.stop();
        sys = arbor.ParticleSystem(2600, 510, 0.5) // create the system with sensible repulsion/stiffness/friction
        sys.parameters({gravity:true, fps:30}) // use center-gravity to make the graph settle nicely (ymmv)
        sys.renderer = Renderer("#canvasView") // our newly created renderer will have its .init() method called shortly by sys...
        sys.screenPadding(100);

        var f = evt.target.files[0];

        if (f) {
          var r = new FileReader();
          r.onload = function(e) {
    	      var contents = e.target.result;
            console.log(nameLabel)
            nameLabel.innerText = f.name;
            sys.addNode("CM", {label:"CellManager", shape:"dot", color:"green"})
            var minTime = 5000;
            var maxTime = 0;
            var lines = contents.split("\n");
            lines.forEach(function(item, index){
              if(item == "")
                return;
              if(item.substr(0, 1) == "%")
                return;

                edge = item.split(",");
                var time = parseInt(edge[0]);
                if(time < minTime)
                  minTime = time;
                if(time > maxTime)
                    maxTime = time;
                if(!layouts[time])
                  layouts[time] = {}
                var nodename = edge[2];
                var entry = {};
                entry['parent'] = edge[1];
                entry['size'] = edge[3];

                layouts[time][nodename] = entry;

                if(time == minTime){
                    var props = {};
                    if(edge[2].substr(0, 5) == "VRack"){
                      props["label"] = "v";
                      props["shape"] = "dot";
                      props["size"] = edge[3];
                    }else{
                      props["label"] = edge[2];
                    }
                    sys.addNode(nodename, props);
                    sys.addEdge(edge[1], nodename);
                }
                // sys.addEdge(edge[1], edge[0]);

            });
            $('#metricSlider').slider({min:minTime, max:maxTime, tooltip: 'show', step:300, value:minTime})
            .on('slide', function(ev){
              var mvalue = ev.value;

              for (nodename in layouts[mvalue]){
                var props = {};
                var entry = layouts[mvalue][nodename];
                if(nodename.substr(0, 5) == "VRack"){
                  props["label"] = "v";
                  props["shape"] = "dot";
                  props["size"] = entry['size'];
                }else{
                  props["label"] = nodename;
                }
                node = sys.getNode(nodename);
                if(!node){
                  sys.addNode(nodename, props);
                  sys.addEdge(entry['parent'], nodename);
                }else{
                  sys.tweenNode(node, 0.01, props);
                }
              }


              var value = $("#metricSelection").val();
              var toremove = [];
              sys.eachNode(function f(node, pt){
                if(node.name == "CM")
                    return;
                if(layouts[mvalue] && !layouts[mvalue][node.name]){
                    toremove.push(node.name);
                    return;
                }
                if(metrics[mvalue] && metrics[mvalue][node.name]){
                  var aValue = metrics[mvalue][node.name].split(",")[value];
                  var color = getScaleColor(Math.floor(aValue*percentageMultiplier[value]));
                  node.data.color = color;
                }
              });
              for(i in toremove){
                sys.pruneNode(toremove[i]);
              }
            });
            $('#metricSlider').slider('setValue', minTime);
          }
          r.readAsText(f);
        } else {
          alert("Failed to load file");
        }
      }


      document.getElementById('propertyfileinput').addEventListener('change', paintProperties, false);
      var pnameLabel = document.getElementById('propertyFileName');
      function paintProperties(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var f = evt.target.files[0];

        if (f) {
          var r = new FileReader();
          r.onload = function(e) {
    	      var contents = e.target.result;
            console.log(nameLabel)
            pnameLabel.innerText = f.name;
            var lines = contents.split("\n");

            lines.forEach(function(item, index){
              if(item == "")
                return;

              if(item.substr(0, 1) == "%"){
                var metricSelection = document.getElementById('metricSelection');
                metricSelection.text = "";
                names = item.split(',');
                for(var i = 2; i < names.length; i++){
                  var option = document.createElement("option");
                  option.text = names[i];
                  option.value = i-2;
                  metricSelection.appendChild(option);
                }
                metricSelection.value = 0;
                metricSelection.onchange = function metricChange() {
                  var value = $(this).val();
                  sys.eachNode(function f(node, pt){
                    var mvalue = $('#metricSlider').val();
                    if(metrics[mvalue] && metrics[mvalue][node.name]){
                      var aValue = metrics[mvalue][node.name].split(",")[value];
                      var color = getScaleColor(Math.floor(aValue*percentageMultiplier[value]));
                      node.data.color = color;
                    }
                  });
                }
                return;
              }

              properties = item.split(",");
              var time = parseInt(properties[0]);
              if(!metrics[time])
                metrics[time] = {}
              var nodename = properties[1];

              var property = "" + properties[2];
              for(var i = 3; i < properties.length; i++){
                property = property + "," + properties[i];
              }
              metrics[time][nodename] = property;
              var current = $("#metricSelection").val();
              if(time == current){
                  var aValue = property.split(",")[0];
                  var siColor = getScaleColor(Math.floor(aValue*25));
                  sys.tweenNode(nodename, .002, {color:siColor});
              }

            });

          }
          r.readAsText(f);
        } else {
          alert("Failed to load file");
        }
      }
    } else {
      alert('The File APIs are not fully supported by your browser.');
    }

    var merge = document.getElementById("merge");
    merge.onclick = function(e){
      mergeRandomVRacks(sys);
    }

    var play = document.getElementById("systemplay");
    play.onclick = function(e){
        playRandomEvent(sys, undefined);
    }

    var five = document.getElementById("play5");
    five.onclick = function(e){
      for(i = 0; i < 5; i++){
        // Usage!
        sleep(500).then(() => {
          playRandomEvent(sys, undefined);
        })
      }
    }
    var mfive = document.getElementById("merge5");
    mfive.onclick = function(e){
      for(i = 0; i < 5; i++){
        // Usage!
        sleep(500).then(() => {
          mergeRandomVRacks(sys);
        })
      }
    }

    // var a = document.getElementById("alterlink");
    // var ten = document.getElementById("moreEvents");
    // a.onclick = function(e){
    //   playRandomEvent(sys, undefined);
    // }
    // ten.onclick = function(e){
    //   for(i = 0; i < 5; i++){
    //     // Usage!
    //     sleep(500).then(() => {
    //       playRandomEvent(sys, undefined);
    //     })
    //   }
    // }


  })

})(this.jQuery)
