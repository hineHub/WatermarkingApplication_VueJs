<template>
    <div>
        <div class="jumbotron">
            <h2>Watermarking</h2>
            <p>Have some pictures you want copyright protected? Add your own logo or text lightly across the background so that no one can simply steal your graphics off your site. Make a program that will add this watermark to the picture. Optional: Use threading to process multiple images simultaneously.</p>
        </div>
        <img v-on:click="imageClick" src="..\assets\sydneyoperahouse.jpg" alt="logo" id="example1"/>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      image: {
          top: 0,
          left: 0
      }
    }},
    methods: {
        imageClick: function(event){
            var elemImg = document.getElementById('example1')
            this.image.top = (event.pageY - elemImg.offsetTop)
            this.image.left = (event.pageX - elemImg.offsetLeft)
            this.watermarkImage(elemImg, 'Suspicious');
        },
        watermarkImage: function(elemImage, text) {
            var top = this.image.top
            var left = this.image.left
            console.log(top)
            // Create test image to get proper dimensions of the image.
            var testImage = new Image();
            testImage.onload = function() {
                var h = testImage.height, w = testImage.width, img = new Image();
                // Once the image with the SVG of the watermark is loaded...
                img.onload = function() {
                // Make canvas with image and watermark
                var canvas = Object.assign(document.createElement('canvas'), {width: w, height: h});
                var ctx = canvas.getContext('2d');
                ctx.drawImage(testImage, 0, 0);
                ctx.drawImage(img, 0, 0);
                // If PNG can't be retrieved show the error in the console
                try {
                    elemImage.src = canvas.toDataURL('image/png');
                }
                catch (e) {
                    console.error('Cannot watermark image with text:', {src: elemImage.src, text: text, error: e});
                }
                };
                // SVG image watermark (HTML of text at bottom right)
                img.src = 'data:image/svg+xml;base64,' + window.btoa(
                '<svg xmlns="http://www.w3.org/2000/svg" height="' + h + '" width="' + w + '">' +
                    '<foreignObject width="100%" height="100%">' +
                    '<div xmlns="http://www.w3.org/1999/xhtml">' +
                        '<div style="position: absolute;' +
                                    'left: ' + left + 'px;' +
                                    'top: ' + top + 'px;' +
                                    'font-family: Tahoma;' +
                                    'font-size: 10pt;' +
                                    'background: #000;' +
                                    'color: #fff;' +
                                    'padding: 0.25em;' +
                                    'border-radius: 0.25em;' +
                                    'opacity: 0.6;' +
                                    'margin: 0 0.125em 0.125em 0;' +
                        '">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</div>' +
                    '</div>' +
                    '</foreignObject>' +
                '</svg>'
                );
            };
            testImage.src = elemImage.src;
            }
    }
  }

</script>


<style scoped>
@import '../assets/bootstrap.css';

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>