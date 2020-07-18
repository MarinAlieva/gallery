<template>
  <div class='gallery'>
    <div v-if="images" :class="[isLastRow ? 'last-item' : '', 'gallery__images']" >
      <div 
        v-for="(image) in images"
        :key="image.id"
        :class='[image.padding ? "image-padding" : "", "image-item"]'>
        <img
              class='picture'
              :src="image.url" alt=""  
              :height="image.height + 'px'"
              :width ="image.width + 'px'"
        >
        <a class='delete'>
          <img src='delete.png'  v-on:click='imageDelete(image.id)'>
        </a>
      </div>
    </div>
    <Loader :loading="loader" />
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Loader from './loader.vue';

export default {
  name: 'Gallery',
  components: {
    Loader,
  },
  data: function () {
    return {
      width: null,
      isLastRow: false,
      scrollWidth: 0,
      loader: false
    };
  },
  computed: {
    ...mapGetters({
      images: 'images',
    }),
    percentWidth() {
      return this.width*0.18;
    },
    maxRowHeight() {
      if (window.innerWidth <= 425) {
        return this.width*0.6;
      } else if (window.innerWidth <= 768) {
        return this.width*0.4;
      } else {
        return this.width*0.3;
      } 
    },
    minRowHeight() {
      return this.width*0.1;
    },
  },
  watch: {
    images: function () {
      this.resizeImages();
    },
  },
  methods: {
    ...mapActions({
      loadImages: 'loadImages'
    }),
    ...mapMutations({
      deleteImage: 'deleteImage'
    }),

    resizeImages() {
      this.width = document.querySelector('.gallery__images').getBoundingClientRect().width;

      let rowWidthControl = 0;
      let newRowIndex = 0;
      this.images.forEach((image, index) => {
       
        
        image.height = this.maxRowHeight;
        image.width = image.height* image.proportion;
        image.padding = false;

        rowWidthControl = rowWidthControl + image.width;
       
        let imageCount = (index+1) - newRowIndex;

        if(rowWidthControl + ((imageCount-1)*10) > this.width) {
          let newProportion = (this.width - ((imageCount - 1)*10)) / (rowWidthControl);
          
          for(let i = newRowIndex; i<=index; i++) {
            this.images[i].width = this.images[i].width * newProportion;
            this.images[i].height = this.images[i].width / this.images[i].proportion;
          }
          rowWidthControl = 0;
          newRowIndex = index + 1;
          if(this.images.length === (index+1)){
             this.isLastRow = false;
          }
        }
        else if (this.images.length === (index+1) && (rowWidthControl + ((imageCount - 1)*10)) < this.width )  {
          this.isLastRow = true;
       
          for(let i=newRowIndex+1; i<this.images.length; i++) {
            this.images[i-1].padding = true;
          }
        }
      });
    },
    imageDelete(id) {
      this.deleteImage(id);
    }
  },
  created() {
    window.addEventListener('resize', this.resizeImages);
  },
  mounted: function() {
    this.loader = true;
    this.loadImages()
      .then(() => {
        this.resizeImages();
        this.loader = false;
      })
      .catch((e) => {
        console.log('error: ', e);
      });
  }
}
</script>

<style lang='scss' scoped>
.gallery__images{
  max-width: 860px;
  min-width: 320px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  text-align: left;
  margin: auto;
  width: 90%;

  .image-item {
    position: relative;
    margin: 5px 0px;

    img{
      display: block;
    }

    .delete img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      opacity: 0;
      display: block;
      transition: all .5s ease-in-out;
      cursor: pointer;
    }

    &:hover .delete img {
      opacity: 1;
      z-index: 99;
      position: absolute;
    }

    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      display: block;
      background: rgba(0, 0, 0, 0.6);
      top: 0px;
      z-index: 0;
      opacity: 0;
      transition: all .5s ease-in-out;
    }
    &:hover:after{
      opacity: 1;
    }
  }
}

.last-item{
  &::after {
    content: "";
    flex: auto;
  }
  .image-padding {
    margin-right: 10px;
  }
}
</style>
