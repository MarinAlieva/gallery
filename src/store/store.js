import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: []
  },

  getters: {
    images: state => state.images,
  },

  mutations: {
    setImages: (state, images) => state.images = images,
    addImage: (state, image) => {
      image.proportion = image.width / image.height;
      state.images.push(image);
    },
    deleteImage: (state, id) => {
      state.images = state.images.filter(image=>image.id!=id);
    }
  },

  actions: {
    loadImages(state) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "https://uralsvecha.ru/test.json"
          )
          .then(response => {
            let images =  response.data.galleryImages.map((image, index) => {
              image.id = index + 1;
              image.proportion = image.width / image.height;
              return image;
            });
            state.commit("setImages",  images);
            resolve();
          })
          .catch(e => {
            console.error(e);
            reject();
          });
      })
    }
  }
});
