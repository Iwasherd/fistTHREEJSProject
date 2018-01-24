(function() {
              const height = document.querySelector("#world").offsetHeight,
                width = document.querySelector("#world").offsetWidth,
                sniper = document.querySelector(".sniper"),
                 sniper180 = sniper.classList.add('sniper180');
              
              let scene = new THREE.Scene();
              let camera = new THREE.OrthographicCamera(width / -7, width / 7, height / 7, height / -7, 1, 1000);


              let renderer = new THREE.WebGLRenderer();
              renderer.setClearColor(0xeeeeee);
              renderer.setSize(width, height);
              let planeGeometry = new THREE.PlaneGeometry(height, width, 1, 1);
              let planeMaterial = new THREE.MeshBasicMaterial({
                color: 0x663333
              });
              let plane = new THREE.Mesh(planeGeometry, planeMaterial);
              plane.rotation.x = -0.5 * Math.PI;
              plane.position.x = 0;
              plane.position.y = 0;
              plane.position.z = 0;
              scene.add(plane);

              ///road///
              let roadVertical = new THREE.Mesh(new THREE.CubeGeometry(115, 40, 20, 1, 1, 1));
                  roadVertical.position.x = 40;
                  roadVertical.position.y = 85;
                  roadVertical.position.z = 103;
                  scene.add(roadVertical);

              let roadGorizontal = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 215, 1, 1, 1));
                    roadGorizontal.position.x = 40;
                    roadGorizontal.position.y = 22.5;
                    roadGorizontal.position.z = 0;
                    scene.add(roadGorizontal);


              
              camera.position.x = 180;
              camera.position.y = 180;
              camera.position.z = 0;
              camera.lookAt(scene.position);


              document.querySelector("#world").appendChild(renderer.domElement);
              renderer.render(scene, camera);

            function PlayerMoving() {
                let topCoordinates = sniper.getBoundingClientRect().top,
                  rightCoordinates = sniper.getBoundingClientRect().right;
                   textDown = document.querySelector(".text-down"),
                  textRight = document.querySelector(".text-right"),
                  textOver = document.querySelector(".text-over"),
                  console.log(rightCoordinates);
                  console.log(topCoordinates);
                  sniperTop = 54;
                  sniperLeft = 130;
                  

                         keyboardJS.bind("down", (e)=> {
                             console.log("down is pressed");
                             if ((sniper.style.top = sniperTop + "px" == 390 + "px")) {
                               sniper.style.animation = "none";
                               sniper.classList.add("sniper270");
                               textDown.style.display = "none";
                               textRight.style.display = "block";

                               keyboardJS.bind("right", e => {
                                   console.log("right is pressed");
                                   if ((sniper.style.left = sniperLeft + "px" >= 760 + "px")) {
                                     sniper.classList.add("sniperDeath");
                                     sniper.style.animation = "sniperDeath .8s steps(25)";
                                     sniper.style.top = 325 + "px";
                                     textRight.style.display = "none";
                                     textOver.style.display = "block";
                                     keyboardJS.unbind("right", previouslyBoundHandler);
                                   } else {
                                     sniperLeft += 0.2;
                                     sniper.style.animation = "sniper270 0.8s steps(25) infinite";
                                     sniper.style.left = sniperLeft + "px";
                                     console.log(rightCoordinates);
                                   }
                                 }, e => {
                                   sniper.style.animation = "none";

                                   console.log("a is released");
                                 });
                             } else {
                               sniperTop += 1.5;
                               sniper.style.animation = "sniper180 0.8s steps(25) infinite";
                               sniper.style.top = sniperTop + "px";
                               console.log(topCoordinates);
                             }
                           }, (e)=> {
                               if (sniper.classList.contains('sniperDeath')) {
                                   
                               }
                               else{
                                sniper.style.animation = "none";
                               }
                             
                             console.log("a is released");
                           });
                       }           
                        
                        
                        console.log(width*0.13)
            PlayerMoving();
            
            // requestAnimationFrame(animate);
           


})();