/*
This work by Mark Roden is licensed under a Creative Commons Attribution 3.0 Unported License.
Based on work at www.xomino.com.
*/

function stencil(){

    //wrap the image in a div so that we can position the canvas
    $('#backIMG').wrap('<div class="wrapDiv" />')
    //create the canvas element inside the div    
    $('.wrapDiv').append($('<canvas id="canvas"/>'));
    var eyes=$('#backIMG')
    var cWidth=eyes.css('width')
    var cHeight=eyes.css('height')
    //position the image absolutely    
    eyes.css('position', 'absolute')
    //position the canvas relative to the image and above it in the z-index    
    $('canvas').css({position: 'relative', 
                    'z-index': 2, 
                    width: cWidth, 
                    height: cHeight
        }) 

    //using the techniques published by Patrick Weid
    //http://goo.gl/en1pO
    //get the canvas    
    var canvas = document.getElementById('canvas');
    var ctx= canvas.getContext('2d');

    //color the text RED
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.font = $('#inputFont1').val();
    ctx.textBaseline = 'top';
    //position the text on the canvas and write it
    ctx.fillText($('#inputText1').val(), 10, 30)
        
    // get the image data object (in this case the text on the canvas)
    var image = ctx.getImageData(0, 0, 750, 250);
    // get the image data values
    var imageData = image.data,
    length = imageData.length;
    //cycle through the images
    for(var i=0; i < length; i+=4){
    //if the image color is the same as the text then make the image
    //pixel transparent - in this case RED
        if (imageData[i]==255 && imageData[i+1]==0 && imageData[i+2]==0){

             imageData[i+3] = 0;
        } else {
            //otherwise make the rest of the canvas white and not transparent
            imageData[i]=255;
            imageData[i+1]=255;
            imageData[i+2]=255;
            imageData[i+3] = 255;        }
    }

    // after the manipulation, reset the data
    image.data = imageData;
    // and put the imagedata back to the canvas
    ctx.putImageData(image, 0, 0);

}?