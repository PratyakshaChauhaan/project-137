status="";
input_text="";

function setup()
{
  canvas = createCanvas(300,290);
  canvas.center();

  video = createCapture(VIDEO);
  video.size(300,290);
  video.hide();
}

function start()
{
    object_detector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    input_text = document.getElementById("input_id").value;
}

function modelLoaded()
{
  console.log("model loaded");
  status = true;
}



function draw()
{
  image(video, 0,0,300,290)
  if (status !="") 
  {
    object_detector.detect(video, gotResults)
    for(i = 0;i< objects.length;i++)
    {
      document.getElementById("status").innerHTML = "Status: object detected";
      console.log(object.length);
      fill("#fc0303");
      percent = floor(objects[i].confidence*100);
      text(objects[i].label + " "+percent +"%", objects[i].x + 15, objects[i].y + 15)
      noFill();
      stroke("#fc0303");
      rect(object[i].x,object[i].y,object[i].width,object[i].height);

      if(objects[i].label == input_text)
      {
         video.stop();
         object_detector.detect(gotResults);
         document.getElementById("object_found").innerHTML = input_text+"Found";
         var synth = window.speechSynthesis;
         var utterThis = new SpeechSynthesisUtterance(input_text+"Found");
         synth.speak(utterThis);
      }
      else
      {
        document.getElementById("object_found").innerHTML = input_text+"Not Found";
      }
    }
  }
}

function gotResults(error, results)
{
   if(error)
   {
    console.error(error);
   }
   else
   {
    console.log(results);
    object =results;
   }
}