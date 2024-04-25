<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="false">
      <div class="header">
        
        <div class="title_m">
          <div class="img_cont" style="margin-right: .5rem;" >
            <img :src="'../../imgs/icon.png'" class="img_m" />
          </div>
          <div class="text_m">StatusMax</div>
        </div>
      </div>
      <div v-if="user" class="serif" style="max-height: 100%; overflow-y: scroll; padding-bottom: 5rem;">
        <div class="profil_ac serif">
          <img :src="user.get_image" style="height: 4rem; margin-right: 1.2rem; border-radius: 10px; " />
          <div style="padding-top: .5rem;">
            <div style="font-size: 1.4rem; font-weight: bold; ">
              {{ user.name }}
            </div>
            <div style="font-size: 1rem;">
              {{ user.num_camp }} campagne{{ user.num_camp > 1 ? 's' : '' }}
            </div>
          </div>
        </div>
        <div class="wallet_cont serif">
          <div class="wallet">
            <div class="w_title">
              Montant total
            </div>
            <div style="font-size: 2rem; margin-top: .5rem; font-weight: bold; ">
              {{ user.get_amount }}
            </div>
            <button @click="yOpen = true" class="serv_status is_over">
              Charger
            </button>
          </div>
        </div>



        <div style="margin-top: 1rem;">
          <div class="serif"
            style="font-size: 1.2rem; text-align: center; padding: .3rem; margin-top: .5rem; font-weight: bold;">
            Autres options
          </div>

          <div class="menu_cont">
            <div class="hc_but serif ripple-parent ion-activatable" @click="hOpen = true">
              <ion-ripple-effect></ion-ripple-effect>
              <div style="display: flex; align-items: center;">
                <button class="profil_d sp_r" style="background-color: #9c2dcf4b;">
                  <ion-icon :icon="wallet" style="font-size: 1.2rem; color: #9c2dcf;" />
                </button>
                <div class="hc_but_text">
                  Historiques de paiement
                </div>
              </div>
              <button style="font-size: 1.9rem; background-color: transparent ; position: relative; top: .1.3rem;">
                <ion-icon :icon="chevronForward" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <pay-history :is-open="hOpen" @close="hOpen = false" />
      <pay-comp :is-open="yOpen" @close="yOpen = false" :mont="500" @done="get_user(), yOpen = false" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
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

.header {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu_cont {
  padding: .4rem 6vw;
}

.hc_but_text {
  font-size: 1.1rem;
  font-weight: bold;
}

.profil_d {
  width: 2.1rem;
  height: 2.1rem;

  border-radius: 10px;
}

.hc_but {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3rem 2vw;
  border-radius: 15px;
  margin-top: -.2rem;
  border-style: solid;
  border-color: #481c4b81;
  border-width: 1px;
}

.is_over {
  background-color: #74eff3;
  color: black;
}

.serv_status {
  padding: .5rem;
  border-radius: 5px;
  margin-top: .5rem;
  font-size: 1.1rem;
}

.w_title {
  font-size: 1rem;
  font-weight: bold;
}

.wallet {
  padding: .9rem 5vw;
  border-radius: 15px;
  width: 100%;
  background-color: #eeeeee;

}

.wallet_cont {
  padding: .8rem 6vw;
}

.profil_ac {
  display: flex;
  align-items: center;
  padding: 1rem 6vw;
}

.but {
  width: 11vw;
  height: 11vw;
  border-radius: 10px;
  font-size: 7vw;
  background-color: transparent;
  border: none;
  color: #481c4b;
}

.buts {
  display: flex;
  align-items: center;
  padding-top: .7vh;
}
</style>

<script setup lang="ts">
import { access_tok, showLoading } from '@/global/utils';
import router from '@/router';
import { IonPage, IonContent, IonRippleEffect } from '@ionic/vue';
import axios from 'axios';
import { book, chevronForward, compass, helpCircle, journal, person, search, settings, wallet, logoWhatsapp, informationCircle, addCircle, eye, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
import PayComp from '@/components/PayComp.vue';
import PayHistory from "@/components/PayHistory.vue"


const user = ref()
const yOpen = ref(false)
const hOpen = ref(false)

const get_user = async () => {
  const load = await showLoading('Patientez...')

  const resp = await axios.get('api/get_user/', {
    headers: {
      Authorization: `Bearer ${await access_tok(router, load)}`
    }
  })

  if (resp.data['done']) {
    user.value = resp.data['result']
    console.log(user.value)
  }
  load.dismiss()
}

get_user()

</script>
