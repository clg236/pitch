
			var camera, scene, renderer;
			var pointLight, pointLight2;
	    var mouseX = 0, mouseY = 0;
      const texture_path = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366';
			init();
			animate();
			function init() {
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 20;
				scene = new THREE.Scene();
				scene.add( new THREE.AmbientLight( 0xffffff ) );

        //pointlights
        
        var light1 = new THREE.PointLight( 0xffe19c, 1, 20 );
        light1.position.set( 0, 0, 7 );
        scene.add( light1 );
        var light2 = new THREE.PointLight( 0x00ffe2, 1, 25 );
        light2.position.set( 0, 7, 7 );
        scene.add( light2 );
        var light3 = new THREE.PointLight( 0x5098b0, 1, 25 );
        light3.position.set( 0, -7, 7 );
        scene.add( light3 );
        
        
				//round corners function
        
        makeRoundedCornerPlane = function(offset = 2, radius = 2, smooth = 16) {
    var cornerA, cornerB, cornerC, cornerD, geometry, matrixA, matrixB, matrixC, matrixD, planeA, planeB;
    geometry = new THREE.Geometry();
    offset = (offset - radius) / 2;
    radius = radius / 4;
    smooth = 16;
    cornerA = new THREE.CircleGeometry(radius, smooth, (Math.PI * 2 / 4) * 1, Math.PI * 2 / 4);
    matrixA = new THREE.Matrix4();
    matrixA.makeTranslation(0 - offset, 0 + offset, 0);
    geometry.merge(cornerA, matrixA);
    cornerB = new THREE.CircleGeometry(radius, smooth, (Math.PI * 2 / 4) * 0, Math.PI * 2 / 4);
    matrixB = new THREE.Matrix4();
    matrixB.makeTranslation(0 + offset, 0 + offset, 0);
    geometry.merge(cornerB, matrixB);
    cornerC = new THREE.CircleGeometry(radius, smooth, (Math.PI * 2 / 4) * 3, Math.PI * 2 / 4);
    matrixC = new THREE.Matrix4();
    matrixC.makeTranslation(0 + offset, 0 - offset, 0);
    geometry.merge(cornerC, matrixC);
    cornerD = new THREE.CircleGeometry(radius, smooth, (Math.PI * 2 / 4) * 2, Math.PI * 2 / 4);
    matrixD = new THREE.Matrix4();
    matrixD.makeTranslation(0 - offset, 0 - offset, 0);
    geometry.merge(cornerD, matrixD);
    planeA = new THREE.PlaneGeometry((offset + radius) * 2, offset * 2);
    geometry.merge(planeA);
    planeB = new THREE.PlaneGeometry(offset * 2, (offset + radius) * 2);
    geometry.merge(planeB);
    remapUVs(geometry);
    return geometry;
  };

  remapUVs = function(geo) {
    var face, i, j, len, max, min, offset, ref, size, v1, v2, v3;
    geo.computeBoundingBox();
    min = geo.boundingBox.min;
    max = geo.boundingBox.max;
    offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    size = new THREE.Vector2(max.x - min.x, max.y - min.y);
    // Remove the old UVs that were incorrect
    geo.faceVertexUvs[0] = [];
    ref = geo.faces;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      face = ref[i];
      v1 = geo.vertices[face.a];
      v2 = geo.vertices[face.b];
      v3 = geo.vertices[face.c];
      // Push on a new UV based on its position inside the shape
      geo.faceVertexUvs[0].push([new THREE.Vector2((v1.x + offset.x) / size.x, (v1.y + offset.y) / size.y), new THREE.Vector2((v2.x + offset.x) / size.x, (v2.y + offset.y) / size.y), new THREE.Vector2((v3.x + offset.x) / size.x, (v3.y + offset.y) / size.y)]);
    }
    return geo.uvsNeedUpdate = true;
  };
        
        //MAIN PLANES
        
        var geometry_main = makeRoundedCornerPlane(6, 0.7);
        var geometry_sides = makeRoundedCornerPlane(6, 0.7);
        var material1 = new THREE.MeshStandardMaterial( { transparent:true } );
        var material2 = new THREE.MeshStandardMaterial( { transparent:true } );
        var material3 = new THREE.MeshStandardMaterial( { transparent:true } );
        var main_plane = new THREE.Mesh( geometry_main, material1 );
        var right_plane = new THREE.Mesh( geometry_sides, material2 );
        var left_plane = new THREE.Mesh( geometry_sides, material3 );
        scene.add( main_plane );
        scene.add( right_plane );
        scene.add( left_plane );
        
        main_plane.scale.x = 1.7;
        right_plane.scale.x = 1.7;
        left_plane.scale.x = 1.7;
        
        right_plane.position.x = 8.0;
        right_plane.position.z = 5;
        right_plane.rotation.y = -39;
        
        left_plane.position.x = -8.0;
        left_plane.position.z = 5;
        left_plane.rotation.y = 39;
        
        //textures
        
        
        var manager = new THREE.LoadingManager();
        loader = new THREE.TextureLoader();
        loader.setCrossOrigin( 'https://s.codepen.io' );
        
        var texture1 = loader.load( texture_path + '/film1.jpg' );
        material1.map = texture1;
        var texture2 = loader.load( texture_path + '/film2.jpg' );
        material2.map = texture2;
        var texture3 = loader.load( texture_path + '/film3.jpg' );
        material3.map = texture3;
        
        	//BACKGROUND
        
        var geometry_back = new THREE.SphereGeometry(500, 150, 40);
        geometry_back.scale(-1, 1, 1);
        
        var material_back = new THREE.MeshStandardMaterial( { transparent:true } );
        var texture_back = loader.load( texture_path + '/a20.jpg' );
        material_back.map = texture_back;
        
         mesh_back = new THREE.Mesh(geometry_back, material_back);
         scene.add(mesh_back);
         mesh_back.position.z = -100;
        
				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0x000000, 0.0);
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
        
        //domevents
        var domEvents	= new THREEx.DomEvents(camera, renderer.right_plane);
        domEvents.addEventListener(right_plane, 'mouseover', function(event){
	      
        var tl = new TimelineLite();
        tl.to(camera.position,1,{z:6});
        tl.to(camera.rotation,1,{y:-75 * Math.PI / 180},'-=1');
          
        }, false)
        
        var domEvents	= new THREEx.DomEvents(camera, renderer.right_plane);
        domEvents.addEventListener(left_plane, 'mouseover', function(event){
	      
        var tl = new TimelineLite();
        tl.to(camera.position,1,{z:6});
        tl.to(camera.rotation,1,{y:75 * Math.PI / 180},'-=1');
          
        }, false)
        
        var domEvents	= new THREEx.DomEvents(camera, renderer.main_plane);
        domEvents.addEventListener(main_plane, 'mouseover', function(event){
	      
        var tl = new TimelineLite();
        tl.to(camera.position,1,{z:10, x:0});
        tl.to(camera.rotation,1,{y:0},'-=1');
          
        }, false)
       
        
        //controls
        //var controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.target.set( 0, 10, 0 );
				//controls.update();

				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}


			function animate() {
				requestAnimationFrame( animate );
        mesh_back.rotation.y += 0.001;
				render();

			}

			function render() {
			

				renderer.render( scene, camera );
        renderer.domElement.id = 'c';
       
			}