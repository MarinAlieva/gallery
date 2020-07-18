<template>
    <div class="load-image">
        <input v-model="imageURL" placeholder="Вставьте URL картинки">
        <button v-on:click="importImagesUrl">Загрузить</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>

        <Loader :loading="loader" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Loader from './loader.vue';

export default {
  name: 'ImageLoad',
  components: {
    Loader,
  },
  data: function () {
    return {
        imageURL: '',
        errorMessage: '',
        loader: false,
    };
  },
  methods: {
    ...mapMutations({
        addImage: 'addImage',
    }),
    importImagesUrl() {
        this.loader = true;
        if(this.imageURL) {
            this.getImageSize(this.imageURL)
            .then(data => {
                this.errorMessage = '';
                this.imageURL = '';
                this.addImage(data);
            })
            .catch(e => {
                this.errorMessage = e;
                this.imageURL = '';
            });
        } else {
            this.errorMessage = 'Введите URL';
        }
        this.loader = false;
    },
    getImageSize(url) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.src = url;

            image.addEventListener('load', () => {
                let result = {
                    width: image.width,
                    height: image.height,
                    url: url,
                };
                resolve(result);
            });
            image.onerror = () => reject('Не получилось загрузить картинку по данному URL');
        });
    },
  },
}
</script>

<style lang='scss' scoped>
.load-image{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 90%;
    max-width: 860px;
    min-width: 320px;
    margin: 30px auto;
    
    input {
        flex: 1;
        padding: 12px 20px;
        box-sizing: border-box;
        border: none;
        border-bottom: 2px solid black;
        margin-right: 30px;
    }
    input:focus {
        border-bottom: none;
    }
    
    button {
        padding: 12px 20px;
        border: none;
        width: 100%;
        max-width: 120px;
        min-width: 70px;
    }
}

@media screen and (max-width: 400px){
    .load-image{
        
        input {
            margin-right: 0;
            margin-bottom: 15px;
        }
        
        button {
            padding: 12px 20px;
            border: none;
            width: 100%;
            max-width: none;
            min-width: none;
        }
    }
}

</style>