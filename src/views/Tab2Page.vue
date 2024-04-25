<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <div class="body_all">
        <div class="header">
          
          <div class="title_m">
            <div class="img_cont" style="margin-right: .3rem;" >
              <img :src="'../../imgs/icon.png'" class="img_m" />
            </div>
            <div class="text_m">StatusMax</div>
          </div>
        </div>
        <div style="width: 100%; height: 100%; ">
          <div v-for="prod in old_prods" :key="prod.id" class="d_sp">
            <div  style="width: 100%; margin-right: .8rem;  ">
              <div class="img_all" :style="{
		      width: '100%',
		      backgroundImage: `url('${prod.get_image}')`,
		      height: '10rem',
		      borderRadius: '15px',
		    }">

              </div>

              <div
                style=" padding-top: .5rem; padding-left: .3rem; font-weight: bold; padding-bottom: .3rem; text-align: center; ">
                {{ prod.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>
.img_all {
  background-size: cover;
  background-position: center;
}

.text_m {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(41, 41, 41);
}

.img_m {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.title_m {
  display: flex;
  align-items: center;

}

.menu:active,
.menu_:active {
  box-shadow: none;
  background: white;
  color: #3880ff;
}

.menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #3880ff;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px #3880ff65, 0 4px 6px -2px #f2824129;
}

.header {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.d_sp {
  padding: 1rem 1rem;
}

.body_all {
  width: 100vw;
  min-height: 100vh;
  background: white;
}
</style>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { access_tok } from '@/global/utils';
import { ref } from 'vue';

const router = useRouter()
const old_prods = ref([] as any[])

const get_products = async () => {
  const resp = await axios.get('api/get_products/', {
    headers: {
      Authorization: `Bearer ${await access_tok(router, undefined)}`
    }
  })
  if (resp.data['done']) {
    old_prods.value = resp.data['result']
  }
}

get_products()

</script>
