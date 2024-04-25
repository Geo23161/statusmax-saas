<template>
    <ion-modal :is-open="isOpen">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button fill="clear" @click="close()">
                    <ion-icon :icon="arrowBack" />
                </ion-button>
            </ion-buttons>
            <ion-title>Historique de paiement</ion-title>
        </ion-toolbar>
        <ion-content>
            <div v-if="false" style="padding-top: 40vh; display: flex; justify-content: space-around;">
                <div v-if="isLoading" >
                    <ion-spinner name="dots"></ion-spinner>
                </div>
            </div>
            <div v-else>
                <div  class="card_cont">
                    <div v-for="p in compays" :key="p.id" class="d_sp">
                        <div class="card">
                            <div class="card_info">
                                <div class="card_name">
                                    {{ format_date(p.created_at) }}
                                </div>
                                <div>
                                    <div class="stat_">
                                        <div class="show_p" :style="{
                                            'background-color': 'green',
                                        }">
                                        </div>
                                        <div class="stat_text">
                                            Effectué
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card_label">
                                {{ p.amount }} F
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
.card_label {
  font-size: 1.5rem;
  font-weight: bolder;
}

.stat_text {
  font-size: 1rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
}

.show_p {
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  border-radius: 100%;
  margin-right: 0.1rem;
}

.stat_ {
  display: flex;
  align-items: center;
}

.card_name {
  font-size: 1.1rem;
}

.card {
  width: 100%;
  padding: 0.6rem 0.9rem;
  background: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.card_cont {
  padding-top: 1rem;
}
</style>

<script setup lang="ts" >

import { access_tok } from '@/global/utils';
import { IonModal, IonContent, IonToolbar, IonTitle, IonButtons, IonButton, IonSpinner } from '@ionic/vue';
import axios from 'axios';
/* import axios from 'axios';
import { access_tok } from '@/global/utils'; */
import { arrowBack } from 'ionicons/icons';
import { mergeProps, ref, toRef, watch } from 'vue';
import { useRouter } from 'vue-router';

const props =  defineProps({
    isOpen: Boolean

})

const open = toRef(props, "isOpen")
/* watch(open, (newp, oldp) => {
    if(newp) get_cpays()
}) */

const emit = defineEmits(['close'])

const compays = ref([] as any[])

const close = () => {
    emit('close')
}

const router = useRouter()
const format_date = (dateString : string) => {
    const date = new Date(dateString);
    
    return date.toLocaleString('fr-FR', {
        year : 'numeric',
        month : 'long',
        day : 'numeric',
        hour : 'numeric',
        minute : 'numeric',
        second : 'numeric',
    })
}

const isLoading = ref(false)


const get_pays = async () => {
    
  try {
    const resp = await axios.get('api/get_pays/', {
      headers : {
        Authorization : `Bearer ${await access_tok(router, undefined)}`
      }
    })
    if(resp.data['done']) {
      compays.value = resp.data['result']
    }
  } catch(e) {
    console.log(e);
    
  }
}

get_pays()
</script>
