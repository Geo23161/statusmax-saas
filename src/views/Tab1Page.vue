<template>
  <ion-page v-if="company">
    <ion-toolbar>

      <ion-buttons slot="primary">
        <button @click="router.push('/create')" class="custom_but is_add">
          <ion-icon :icon="add" />
        </button>
      </ion-buttons>
      <ion-title>{{ company.nom }}</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="separator">

      </div>

      <div v-if="!is_on" style="padding: 1rem 0.8rem ; width: 100%;">
        <div class="card">
          <h2 class="card-title">Compte bloqué !</h2>
          <p class="card-message">Oops ! Votre compte est actuellement bloqué en raison d'un problème de paiement.</p>
          <a @click="yOpen = true" class="pay-button">Effectuer le paiement</a>
        </div>
      </div>

      <div class="in_toolb">
        <div class="title_">
          Campagnes
        </div>
        <div class="buts">
          <button @click="router.push('/stat')" class="custom_but chart ">
            <ion-icon :icon="barChart" />
          </button>
        </div>
      </div>
      <div class="no_campaign" v-if="!posts.length">
        <div>
          <div style="display: flex; justify-content: space-around;">
            <img :src="'../../img/no_ad.svg'" style="width: 50vw;" />
          </div>
          <div style="padding: 0.9rem 1rem; text-align: center;">
            <div style="font-size: 1rem; font-weight: bold;">
              Vous n'avez ajoutez aucune campagne
            </div>
            <div style="font-size: 0.9rem; padding-top: 1rem; ">
              Ajoutez votre campagne maintenant pour augmenter vos ventes
            </div>
            <div style="display: flex; justify-content: space-around; padding-top: 0.9rem;">
              <ion-button @click="router.push('/create')" mode="ios">
                <ion-icon slot="start" :icon="add"></ion-icon>
                Commencer
              </ion-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="dems_cont">
          <div v-for="post in posts" :key="post.id" @click="router.push('/post/' + post.id)" class="d_sp dem white ">
            <div class="dem_h">
              <div class="stats">
                <div :style="{ 'background-color': 'green' }" class="indic"></div>
                <div class="stat_title">{{ formatOnline(post.created_at) }}</div>
              </div>
              <div @click.stop="target_post.name = post.name, target_post.id = post.id, aOpen = true" class="dem_menu">
                <ion-icon :icon="ellipsisVertical" />
              </div>
            </div>
            <div class="dem_body">
              <div :style="{
                'min-width': '42px',
                'min-height': '42px',
                'border-radius': '10px',
                'background-size': 'cover',
                'background-position': 'top center',
                'background-image': `url('${post.get_media.get_image}')`,
                'margin-right': '1rem',
                'position': 'relative'
              }">
                <button class="play_b" v-if="post.get_media.get_video">
                  <ion-icon slot="start" :icon="play"></ion-icon>
                </button>
              </div>
              <div class="dem_text">{{ post.name_of }}</div>
            </div>
            <div class="dem_foot">
              <div>
                <div class="unit">{{ post.get_visitors }}</div>
                <div class="sub_unit">visiteurs</div>
              </div>
              <div>
                <div class="unit">{{ post.get_ready }}</div>
                <div class="sub_unit">convertis</div>
              </div>
              <div>
                <div class="unit">{{ post.get_price }}$</div>
                <div class="sub_unit">coût moyen</div>
              </div>
            </div>
          </div>

          <div v-if="loading" style="text-align: center; padding-top: 0.8rem">
            <ion-spinner name="dots"></ion-spinner>
          </div>
          <div v-if="has_next" style="display: flex; justify-content: space-around">
            <div>
              <ion-button @click="get_posts()" mode="ios">
                <ion-icon :icon="caretDownCircle"></ion-icon>
                <div style="padding-left: 0.5rem">Voir plus</div>
              </ion-button>
            </div>
          </div>
          <div v-if="no_data" style="text-align: center; padding-top: 0.5rem">
            Plus de données
          </div>
        </div>
      </div>
    </ion-content>

    <pay-comp :is-open="yOpen" @close="yOpen = false" :mont="500" @done="get_update(), yOpen = false" />
    <ion-action-sheet :is-open="aOpen" :header="target_post.name" :buttons="getActionsButs(target_post.id)"
      @didDismiss="aOpen = false"></ion-action-sheet>
  </ion-page>
  <ion-page v-else>
    <ion-content>
      <div class="body_all">
        <div class="global_spinner">
          <div>
            <ion-spinner color="primary" name="circles"></ion-spinner>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>
.card {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #fa0b0b;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  color: #333;
}

.card-message {
  margin-bottom: 1rem;
  color: #555;
}

.pay-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3880ff;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.pay-button:hover {
  background-color: #5c97fd;
}

.play_b {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  font-size: 12px;
  margin-left: -10px;
  margin-top: -10px;
  padding-left: 0.1rem;
  background: #3880ff;
  padding-top: 2px;
  color: white;

}

.fixed {
  position: sticky;
  top: 0px;
}

.sub_unit {
  color: rgb(48, 48, 48);
  font-weight: 300;
}

.unit {
  font-size: 1.2rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
}

.dem_foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.dem_text {
  color: rgb(48, 48, 48);
  font-size: 1.1rem;
}

.dem_body {
  display: flex;
  align-items: center;
  padding-top: 0.4rem;
  padding-bottom: 0.5rem;
}

.dem_menu:active {
  background-color: rgba(128, 128, 128, 0.118);
  border-radius: 10px;
}

.dem_menu {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.stat_title {
  color: rgb(48, 48, 48);
}

.indic {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 0.3rem;
}

.stats {
  display: flex;
  align-items: center;
}

.dem_h {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rose {
  background: #f0c5c9;
}

.white {
  background-color: white;
}

.dem:hover {
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1), 0 10px 20px 0 rgba(0, 0, 0, 0.06);
}

.dem {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 5px 0 rgba(0, 0, 0, 0.06);
}

.d_sp {
  margin-top: 0.9rem;
  margin-bottom: 0.9rem;
}

.title_cont {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: rgb(63, 63, 63);
}

.dems_cont {
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.no_campaign {
  padding-top: 15vh;
}

.is_add:active {
  background: #006f2c !important;
}

.is_add {
  padding-top: 4.5px;
  font-size: 1.7rem !important;
  background: #2dd36f !important;
  color: white;
  margin-right: 0.8rem;

}

.chart:active {
  background: rgb(195, 195, 195);
}


.custom_but {
  width: 45px;
  height: 45px;
  min-height: 40px;
  min-width: 40px;
  background: rgb(225, 225, 225);
  font-size: 1.2rem;
  border-radius: 100%;
}

.title_ {
  font-size: 1.2rem;
  font-weight: bolder;

}

.in_toolb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.1rem;
}

.separator {
  width: 100vw;
  height: 1px;
  background-color: rgb(225, 225, 225);

}

.global_spinner {
  padding-top: 40vh;
  display: flex;
  justify-content: space-around;
}

.body_all {
  width: 100vw;
  min-height: 100%;
  background: white;
}

ion-content {
  --color: rgb(61, 61, 61);
}
</style>

<script setup lang="ts">
import PayComp from '@/components/PayComp.vue';
import { showLoading, my_company, access_tok, show_alert, show_warn, formatOnline } from '@/global/utils';
import { IonPage, IonToolbar, IonTitle, IonContent, IonSpinner, IonButtons, IonButton, IonIcon, ActionSheetButton, IonActionSheet, onIonViewDidLeave, onIonViewDidEnter } from '@ionic/vue';
import axios from 'axios';
import { add, barChart, caretDownCircle, copy, ellipsisVertical, open, play, search, trash } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const company = ref()
const posts = ref<any[]>([])
const router = useRouter()
const has_next = ref(false)
const aOpen = ref(false)
const loading = ref(false)
const no_data = ref(false)
const is_on = ref(true)
const yOpen = ref(false)

const target_post = ref({
  name: '',
  id: 0
})
const pks = computed(() => {
  const ls = [] as number[];
  posts.value.forEach((element: any) => {
    ls.push(element.id)
  });
  return ls
})

const get_company = async () => {
  await get_posts(undefined)
  company.value = await my_company();
  console.log(company.value)
}

const get_posts = async (load?: any) => {
  loading.value = true
  const resp = await axios.post('api/get_posts/', {
    pks: JSON.stringify(pks.value)
  }, {
    headers: {
      Authorization: `Bearer ${await access_tok(router, load)}`
    }
  })
  if (resp.data['done']) {
    posts.value = posts.value.concat(resp.data['result']);
    is_on.value = resp.data['is_on']
    has_next.value = resp.data['has_next'];
    if (!has_next.value) {
      no_data.value = true
      setTimeout(() => {
        no_data.value = false
      }, 3500)
    }
  }
  loading.value = false
}

const deletId = ref(0)

const delete_post = async () => {
  const id = deletId.value
  const load = await showLoading('Suppression...');
  const resp = await axios.post('api/delete_post/' + id + '/', {}, {
    headers : {
      Authorization : `Bearer ${await access_tok(router, load)}`
    }
  })
  if(resp.data['done']) posts.value = posts.value.filter(e => e.id != id)
  load.dismiss()
  deletId.value = 0
}

const setup_alert = (title : string, message : string) => {
  show_alert(title, message)
}

const getActionsButs: (id: number) => ActionSheetButton[] = (id: number) => {
  return [
    {
      text: 'Ouvrir',
      icon: open,
      handler: () => {
        router.push('/post/' + id)
      }
    },
    {
      text: 'Dupliquer ',
      icon: copy,
      handler() {
        router.push('/create?duplic=' + id)
      },
    },
    {
      text: 'Supprimer',
      icon: trash,
      handler() {
        
        deletId.value = id
        show_warn("Confirmation requise", "Etes-vous sûre de vouloir supprimer cette campagne? Vos propects n'auront plus accès a la page de dicussion.", "Supprimer", delete_post)
      },
    },
  ];
}

get_company()
const get_update = async () => {
  if(!pks.value.length) return ;
  const resp = await axios.post('api/get_update/', {
    pks: JSON.stringify(pks.value)
  }, {
    headers: {
      Authorization: `Bearer ${await access_tok(router, undefined)}`
    }
  })
  if (resp.data['done']) {
    posts.value = resp.data['result']
    is_on.value = resp.data['is_on']
  }
}

let interval : any = 0 
const route = useRoute()

interval = setInterval(() => {
  if (posts.value.length) get_update()
}, 5000)

onIonViewDidEnter(() => {
  if('has_created' in route.query) {
    posts.value = []
  }
  get_update()
})

onIonViewDidLeave(() => {
  console.log('heeeryyyy')
  console.log(interval)
  clearInterval(interval)
  
})

</script>
