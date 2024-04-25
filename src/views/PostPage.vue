<template >
    <ion-page v-if="campaign" >
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#"></ion-back-button>
            </ion-buttons>
            <ion-title> {{ campaign.name_of }} </ion-title>
        </ion-toolbar>
        <ion-content >
            <div v-if="campaign" class="dash" style="width: 100%; min-height: 100%; font-family: 'Poppins'; " >
                <div class="comp" >
                    <div style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between"  >
                        <div >
                            Texte à utiliser
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;" >
                            <ion-icon style="position: relative; top: .1rem;" :icon="informationCircle" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); " >

                    </div>
                    <div style="padding: .4rem .6rem; font-size: .9rem; " >
                        {{ real_text(campaign.text_gen) }} <span v-if="campaign.text_gen.length > 120" style="color: blue;" @click="saw = !saw" >Voir {{ saw ? 'plus' : 'moins' }}</span>
                    </div>
                    <button v-if="!copied.includes(campaign.text_gen)" @click="copy_txt(campaign.text_gen)" class="but ripple-parent ion-activatable" style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        <ion-ripple-effect ></ion-ripple-effect>
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div >
                            Copier
                        </div>
                    </button>
                    <button v-else class="but " style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div >
                            Copié
                        </div>
                    </button>
                </div>
                <div class="comp" >
                    <div style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between"  >
                        <div style="color: blue" >
                            Lien à utilisé
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;" >
                            <ion-icon style="position: relative; top: .1rem;" :icon="informationCircle" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); " >

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; " >
                        {{ campaign.get_link }}
                    </div>
                    <button v-if="!copied.includes(campaign.get_link)" @click="copy_txt(campaign.get_link)" class="but ripple-parent ion-activatable" style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        <ion-ripple-effect ></ion-ripple-effect>
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div >
                            Copier
                        </div>
                    </button>
                    <button v-else class="but " style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div >
                            Copié
                        </div>
                    </button>
                </div>
                <div class="comp" >
                    <div style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between"  >
                        <div >
                            Résultat global
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;" >
                            <ion-icon style="position: relative; top: .1rem;" :icon="informationCircle" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); " >

                    </div>
                    <div style="padding: .9rem .6rem; font-size: .9rem; display: flex; align-items: center " >
                        <div style="padding: .5rem .9rem; background-color: rgb(224, 224, 224); margin-right: .6rem; border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_global.customers }}
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                visiteurs
                            </div>
                        </div>
                        <div style=" flex-grow: 1; padding: .5rem .9rem; background-color: rgb(224, 224, 224);  border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_global.moy }}$
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                coût moyen
                            </div>
                        </div>
                    </div>
                    <button @click="router.push('/result/' + campaign.id + '/global/')" class="but ripple-parent ion-activatable" style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        <ion-ripple-effect ></ion-ripple-effect>
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="eye" />
                        </div>
                        <div >
                            Voir tout
                        </div>
                    </button>
                </div>
                <div class="comp" >
                    <div style=" color: green; padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between"  >
                        <div >
                            Résultat positif
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;" >
                            <ion-icon style="position: relative; top: .1rem;" :icon="informationCircle" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); " >

                    </div>
                    <div style="padding: .9rem .6rem; font-size: .9rem; display: flex; align-items: center " >
                        <div style="padding: .5rem .9rem; background-color: rgba(0, 128, 0, 0.212); color: green; margin-right: .6rem; border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_success.customers }}
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                convertis
                            </div>
                        </div>
                        <div style=" flex-grow: 1; padding: .5rem .9rem; background-color: rgb(224, 224, 224);  border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_success.moy }}$
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                coût moyen
                            </div>
                        </div>
                    </div>
                    <button @click="router.push('/result/' + campaign.id + '/success/')" class="ripple-parent ion-activatable but_bot " style=" background-color: rgba(0, 128, 0, 0.212); color: green; padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        <ion-ripple-effect ></ion-ripple-effect>
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="eye" />
                        </div>
                        <div >
                            Voir tout
                        </div>
                    </button>
                </div>
                <div class="comp" >
                    <div style=" padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between"  >
                        <div >
                            Résultat ambigu
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;" >
                            <ion-icon style="position: relative; top: .1rem;" :icon="informationCircle" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); " >

                    </div>
                    <div style="padding: .9rem .6rem; font-size: .9rem; display: flex; align-items: center " >
                        <div style="padding: .5rem .9rem; background-color: rgb(224, 224, 224);  margin-right: .6rem; border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_ambigu.customers }}
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                visiteurs
                            </div>
                        </div>
                        <div style=" flex-grow: 1; padding: .5rem .9rem; background-color: rgb(224, 224, 224);  border-radius: 10px; " >
                            <div style="font-size: 2.5rem; font-weight: bold; " >
                                {{ campaign.get_ambigu.moy }}$
                            </div>
                            <div style="font-size: .9rem; margin-top: -.7rem; " >
                                coût moyen
                            </div>
                        </div>
                    </div>
                    <button @click="router.push('/result/' + campaign.id + '/ambigu/')" class="ripple-parent ion-activatable but_bot " style=" background-color: rgba(255, 0, 0, 0.199); color: red; padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; " >
                        <ion-ripple-effect ></ion-ripple-effect>
                        <div style="margin-right: .2rem;" >
                            <ion-icon style="font-size: 1.4rem" :icon="eye" />
                        </div>
                        <div >
                            Voir tout
                        </div>
                    </button>
                </div>
            </div>
        </ion-content>
    </ion-page>
    <ion-page v-else>
    <ion-content>
      <div class="body_all">
        <div style="display: flex; justify-content: center; flex-direction: column; height: 100%; 
} " >
          <div style="display: flex; justify-content: center;" >
            <div >
            	<ion-spinner color="primary" name="circles"></ion-spinner>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped >
.body_all {
  width: 100vw;
  min-height: 100vh;
  background: white;
  height: 100%;
}

.tst {
    color: rgba(255, 0, 0, 0.199)
}

.but_bot {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.but {
    background-color: rgba(0, 0, 255, 0.178);
    color: blue;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.comp {
    background-color: white;
    border-radius: 10px;
    margin: 1.5rem 0rem;
}

.dash {
    background-color: rgb(247, 247, 247);
    color: rgb(48, 48, 48);
    padding: .6rem 1rem;
}
</style>

<script setup lang="ts" >
import { IonPage, IonContent, IonToolbar, IonButtons, IonTitle, IonBackButton, IonIcon, IonRippleEffect, onIonViewDidEnter, onIonViewWillLeave } from "@ionic/vue"
import { checkmarkDone, copy, eye, informationCircle } from "ionicons/icons";
import { access_tok, copyTextToClipboard, showLoading } from "../global/utils"
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";

const id = ref(0)

const text = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ab quod cupiditate expedita facilis, ad aut magni tenetur ullam quasi neque nam quam hic cum accusamus quidem, modi, atque doloremque.')
const saw = ref(true)
const real_text = (txt : string) => {
    return txt.length > 120 ? ( saw.value ? txt.slice(0, 120) + '...' : txt) : txt
}

const copied = ref([] as string[])
const copy_txt = (text : string) => {
    copyTextToClipboard(text)
    copied.value.push(text)
    setTimeout(() => {
        copied.value = copied.value.filter(e => e != text)
    }, 2000)
}

const campaign = ref()
const route = useRoute()
const get_campaign = async (id : number) => {
    const resp = await axios.get('api/get_campaign/' + id + '/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if(resp.data['done']) {
        campaign.value = resp.data['result']
    }
}

const interv = ref()
onIonViewDidEnter(() => {
    id.value = parseInt(route.params['id'] as string)

    get_campaign(id.value)
    
    interv.value = setInterval(() => {
        get_campaign(id.value)
    }, 10000)

})

onIonViewWillLeave(() => {
	clearInterval(interv.value)	
})

</script>
