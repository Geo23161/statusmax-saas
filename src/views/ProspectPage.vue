<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#"></ion-back-button>
            </ion-buttons>
            <ion-title> {{ prospect?.name_of }} </ion-title>
        </ion-toolbar>
        <ion-content>
            <div v-if="prospect" class="dash" style="width: 100%; min-height: 100%; font-family: 'Poppins'; ">
                
                <div v-if="prospect.get_result.name" class="comp">
                    <div
                        style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between">
                        <div >
                            Nom et prenom
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;">
                            <ion-icon style="position: relative; top: .1rem;" :icon="person" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; ">
                        {{ prospect.get_result.name }}
                    </div>
                    <button v-if="!copied.includes(prospect.get_result.name)"
                        @click="copy_txt(prospect.get_result.name)" class="but ripple-parent ion-activatable"
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div>
                            Copier
                        </div>
                    </button>
                    <button v-else class="but "
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">

                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div>
                            Copié
                        </div>
                    </button>
                </div>
                <div v-if="prospect.get_result.email" class="comp">
                    <div
                        style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between">
                        <div >
                            Email
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;">
                            <ion-icon style="position: relative; top: .1rem;" :icon="mail" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; ">
                        {{ prospect.get_result.email }}
                    </div>
                    <button v-if="!copied.includes(prospect.get_result.email)"
                        @click="copy_txt(prospect.get_result.email)" class="but ripple-parent ion-activatable"
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div>
                            Copier
                        </div>
                    </button>
                    <button v-else class="but "
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">

                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div>
                            Copié
                        </div>
                    </button>
                </div>
                <div v-if="prospect.get_result.tel" class="comp">
                    <div
                        style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between">
                        <div >
                            Téléphone
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;">
                            <ion-icon style="position: relative; top: .1rem;" :icon="call" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; ">
                        {{ prospect.get_result.tel }}
                    </div>
                    <button v-if="!copied.includes(prospect.get_result.tel)"
                        @click="copy_txt(prospect.get_result.tel)" class="but ripple-parent ion-activatable"
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div>
                            Copier
                        </div>
                    </button>
                    <button v-else class="but "
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">

                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div>
                            Copié
                        </div>
                    </button>
                </div>
                <div v-if="prospect.get_result.whatsapp" class="comp">
                    <div
                        style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between">
                        <div >
                            Whatsapp
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;">
                            <ion-icon style="position: relative; top: .1rem;" :icon="logoWhatsapp" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; ">
                        {{ prospect.get_result.whatsapp }}
                    </div>
                    <button v-if="!copied.includes(prospect.get_result.whatsapp)"
                        @click="copy_txt(prospect.get_result.whatsapp)" class="but ripple-parent ion-activatable"
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div>
                            Copier
                        </div>
                    </button>
                    <button v-else class="but "
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">

                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div>
                            Copié
                        </div>
                    </button>
                </div>
                <div v-if="prospect.get_result.lieu" class="comp">
                    <div
                        style="padding: .4rem .6rem; font-size: 1.1rem; font-weight: bold; display: flex; align-items: center; justify-content: space-between">
                        <div >
                            Ville et Quartier
                        </div>
                        <button style="font-size: 1.3rem; padding: .2rem .4rem; border-radius: 5px;">
                            <ion-icon style="position: relative; top: .1rem;" :icon="location" />
                        </button>
                    </div>
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div style="padding: .8rem .6rem; font-size: .9rem; text-decoration: dotted; ">
                        {{ prospect.get_result.lieu }}
                    </div>
                    <button v-if="!copied.includes(prospect.get_result.lieu)"
                        @click="copy_txt(prospect.get_result.lieu)" class="but ripple-parent ion-activatable"
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="copy" />
                        </div>
                        <div>
                            Copier
                        </div>
                    </button>
                    <button v-else class="but "
                        style="padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">

                        <div style="margin-right: .2rem;">
                            <ion-icon style="font-size: 1.4rem" :icon="checkmarkDone" />
                        </div>
                        <div>
                            Copié
                        </div>
                    </button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
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

<script setup lang="ts">
import { IonPage, IonContent, IonToolbar, IonButtons, IonTitle, IonBackButton, IonIcon, IonRippleEffect, onIonViewWillEnter } from "@ionic/vue"
import { call, callOutline, checkbox, checkmarkDone, chevronDown, chevronUp, copy, location, logoWhatsapp, mail, open, openOutline, person } from "ionicons/icons"
import { ref } from "vue";
import { access_tok, copyTextToClipboard, showLoading } from "../global/utils"
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";


const copied = ref([] as string[])
const copy_txt = (text : string) => {
    copyTextToClipboard(text)
    copied.value.push(text)
    setTimeout(() => {
        copied.value = copied.value.filter(e => e != text)
    }, 2000)
}

const prospect = ref()
const id = ref(0)
const route = useRoute()

const get_prospect = async () => {
    const load = await showLoading('Patientez...')

    const resp = await axios.get('api/get_prospect/' + id.value + '/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if(resp.data['done']) {
        prospect.value = resp.data['result']
    }
    load.dismiss()
}

onIonViewWillEnter(() => {
    
    id.value = parseInt(route.params['id'] as string)
    get_prospect()

})

</script>

