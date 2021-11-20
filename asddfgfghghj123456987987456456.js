const canvas = document.getElementById("renderCanvas"); 
const engine = new BABYLON.Engine(canvas, true);
global.projectName = "secondsNft";
global.userId = "ruban";
global.authenticationToken = "dudeyouthere";
global.designname = "dudeyouthere";
const dat = require('dat.gui');
const createScene =  () => {
    const GetTheProjectInfo = () => { 
        var path = window.location.pathname;
        var urlContent = [];
        var str = '';
        for(var i=0; i< path.length; i++)
        {
            if(path[i]==='/')
            {
                urlContent.push(str);
                str = ''; 
            }
            else{
                str +=path[i];
            }
        }
        urlContent.push(str);
        console.log(urlContent);
        global.designname= urlContent[1];
        console.log( global.designname);

    }

    GetTheProjectInfo();

    //console.log(global.projectName + "  " + global.userId + "  " + global.authenticationToken );

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.95, 0.95, 0.95)

    var camera2 = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 60, BABYLON.Vector3.Zero(), scene);
	camera2.lowerBetaLimit = 0.1;
	camera2.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera2.lowerRadiusLimit = 2;
	camera2.upperRadiusLimit = 200;
    camera2.wheelPrecision = 50;
	camera2.attachControl(canvas, true);
    camera2.fov = 0.65;
    

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(20, 10, 20));
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.intensity = 0.8;

    const light2 = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-20, 10, -20));
    light2.diffuse = new BABYLON.Color3(1, 1, 1);
    light2.specular = new BABYLON.Color3(1, 1, 1);
    light2.intensity = 0.8;




  

    var meshImportUrl = "https://designtheinside.xyz/threed_nft_projects/downloadthreedasset/xyz/abcd/"+global.designname;
    console.log(meshImportUrl);
    console.log("Got animation");
    BABYLON.SceneLoader.ImportMesh("", meshImportUrl, "", scene, function (newMeshes, animationGroups,xyz,abc) {
        console.log(newMeshes);
        // for(var i=1; i< newMeshes.length; i++)
        // {
        // }
        const sambaAnim = scene.getAnimationGroupByName("Idle_Aggressive");
        availableanimationArray = abc;
        if(abc.length >0)
        {
            global.animatebutton.isVisible = true;
        }
        document.getElementById("loader").style.display = "none";
        document.getElementById("renderCanvas").style.display = "block";
    console.log(abc);
    //Play the Samba animation  
    sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
        });

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var manipulationPanel = new BABYLON.GUI.StackPanel();
        manipulationPanel.width = "100px";
        manipulationPanel.isVertical = true;
        manipulationPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        manipulationPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(manipulationPanel);
    
        global.animatebutton = BABYLON.GUI.Button.CreateSimpleButton("animatebutton", "Animate");
        global.animatebutton .width = "150px"
        global.animatebutton .height = "50px";
        global.animatebutton .color = "white";
        global.animatebutton .background = "black";
        
        global.animatebutton .onPointerUpObservable.add(function() {
            let x = Math.floor((Math.random() * availableanimationArray.length) + 1);
            console.log(availableanimationArray[x].name + "      " + x);
            const sambaAnim = scene.getAnimationGroupByName(availableanimationArray[x].name);
            sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
         });
        
         manipulationPanel.addControl(global.animatebutton );
         global.animatebutton.isVisible = false;
   return scene;
}
   const scene = createScene(); //Call the createScene function
//doDownload();
engine.runRenderLoop(function () {


    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

const CanUserDownload = () =>{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var designData = this.responseText;
        var myArrRes = JSON.parse(designData);
        //console.log(myArrRes);
        if (myArrRes["message"] !== null)
        {        
        var response = myArrRes["message"];  
        if(response === null){
            return false;
        }
        else{
            var avaialbleDownloads = myArrRes["availableDownlaods"];
           // console.log(avaialbleDownloads);
            if(avaialbleDownloads <=0)
            {
                return false;
            }
            else{
               // console.log("Gonna return true");
                
                BABYLON.GLTF2Export.GLBAsync(scene, "fileName").then((glb) => {
                    glb.downloadFiles();
               });
               return true;
            }
        }

        }
    }
    var getUrl = "https://www.designtheinside.xyz/threed_nft_projects/get_available_downloads/"+global.userId+ "/"+global.authenticationToken ;
    xhttp.open("GET", getUrl);
    xhttp.send(); 
}

function doDownload() {
  
    CanUserDownload();
 
  

   var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
   xmlhttp.open("POST", "https://www.designtheinside.xyz/threed_nft_projects/deduct_a_download/"+global.userId+ "/"+global.authenticationToken);
   xmlhttp.setRequestHeader("Content-Type", "application/json");
   xmlhttp.send(JSON.stringify({}));

   xmlhttp.onload = () =>{
       var designData = xmlhttp.responseText;
       //console.log(designData);
       var myArrRes = JSON.parse(designData);
       //console.log(myArrRes["message"]);
       generateButton.isVisible = true;
   }


}
