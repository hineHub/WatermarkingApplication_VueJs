<template>
    <div>
        <div class="jumbotron">
            <h2>Stamping - images</h2>
            <p>Have some pictures you want copyright protected? Add your own logo or text lightly across the background so that no one can simply steal your graphics off your site. Make a program that will add this watermark to the picture. Optional: Use threading to process multiple images simultaneously.</p>
        </div>
        <img v-on:click="imageClick" src="..\assets\newspaper.jpg" alt="newspaper" id="example1"/>
        <img src="..\assets\stampsmall.png" alt="fakeStamp" id="stamp" hidden />
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
            var stamp = document.getElementById('stamp')
            this.image.top = (event.pageY - elemImg.offsetTop) - (stamp.height / 2)
            this.image.left = (event.pageX - elemImg.offsetLeft) - (stamp.width / 2)
            this.watermarkImage(elemImg);
        },
        watermarkImage: function(elemImage) {
            var top = this.image.top
            var left = this.image.left

            var testImage = new Image()
            var stamp = new Image()
                        
            stamp.onload = function(){
                testImage.onload = function() {
                    var h = testImage.height, w = testImage.width, img = new Image();
                    
                    var canvas = Object.assign(document.createElement('canvas'), {width: w, height: h});
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(testImage, 0, 0);
                    ctx.drawImage(img, 0, 0);
                    ctx.drawImage(stamp, left, top)
                    // If PNG can't be retrieved show the error in the console
                        try {
                            elemImage.src = canvas.toDataURL('image/png');
                        }
                        catch (e) {
                            console.error('Cannot watermark image with text:', {src: elemImage.src, text: text, error: e});
                        }

                };
            };
            stamp.src = document.getElementById('stamp').src
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