<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#"></ion-back-button>
            </ion-buttons>
            <ion-title>Résultat positif</ion-title>
        </ion-toolbar>
        <ion-content>
            <div v-if="prospects.length" style="width: 100%; min-height: 100%; font-family: 'Poppins'; ">
                <div v-for="pros in prospects" :key="pros.id" style="width: 100%; ">
                    <div style="width: 100%; height: 2px; background-color: rgb(235, 235, 235); ">

                    </div>
                    <div @click="has_clicked = (has_clicked == pros.id ? 0 : pros.id)" class="ion-activatable ripple-parent"
                        style="padding: .5rem 1rem ; display: flex; align-items: center; justify-content: space-between;">
                        <ion-ripple-effect></ion-ripple-effect>
                        <div style="display: flex; align-items: center;">
                            <button
                                style="padding: .3rem .4rem; border-radius: 100%; background-color: blue; color: white; margin-right: .5rem; ">
                                <ion-icon v-show="pros.id != has_clicked" :icon="chevronDown" style="font-size: 1.4rem;" />
                                <ion-icon v-show="pros.id == has_clicked" :icon="chevronUp" style="font-size: 1.4rem;" />
                            </button>
                            <div style="font-size: .9rem; font-weight: bold;">
                                {{ pros.name_of }}
                            </div>
                        </div>
                        <button style="padding: .5rem .8rem; border-radius: 10px; font-size: .8rem; font-weight: bold;">
                            <span v-if="pros.checked" style="color: green;">
                                Converti
                            </span>
                            <span v-else-if="!pros.checked && pros.commenced" style="color: gray;">
                                Ambigu
                            </span>
                            <span v-else-if="!pros.commenced" style="color: red;">
                                Non interessé
                            </span>
                        </button>
                    </div>
                    <div v-if="has_clicked == pros.id && pros.resume" style="padding: .5rem 1rem;  font-size: .9rem;">
                        
                        <div style="padding: .1rem 0rem; padding-left: 3.5rem !important;">
                            <span style="font-weight: bold;">
                                Date: {{ formatOnline(pros.created_at) }}
                            </span> 
                        </div>
                        <div style="padding: .1rem 0rem; padding-left: 3.5rem !important;">
                            <span style="font-weight: bold;">
                                Coût:
                            </span> {{ pros.get_cost }}$
                        </div>
                        <div style="padding: .1rem 0rem; padding-left: 3.5rem !important;">
                            <span style="font-weight: bold;">
                                Messages:
                            </span> {{ pros.get_messages }}
                        </div>

                        <div style="padding: .1rem 0rem; padding-left: 3.5rem !important;">
                            <span style="font-weight: bold;">
                                Statut:
                            </span> <span :style="{
                                color : pros.checked ? 'green' : 'gray'
                            }" >
                                {{ pros.resume }}
                            </span>
                        </div>
                        <div style="width: 100%; display: flex; align-items: center; padding: .5rem 0rem;">
                            <button @click="opn_link(pros.open_link)" class=" ripple-parent ion-activatable"
                                style=" background-color: rgba(0, 0, 255, 0.178); color: blue; padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; margin-right: .4rem; ">
                                <ion-ripple-effect></ion-ripple-effect>
                                <div style="margin-right: .2rem;">
                                    <ion-icon style="font-size: 1.4rem" :icon="openOutline" />
                                </div>
                                <div style="position: relative; top: .15rem;">
                                    Voir
                                </div>
                            </button>
                            <button :class="{
                            	is_g : pros.checked, gray_c : !pros.checked
                            }" @click=" pros.checked ? router.push('/prospect/' + pros.id + '/') : 0" class="ripple-parent ion-activatable but_bot "
                                style="  padding: .4rem; font-size: .9rem; display: flex; align-items: center; justify-content: center; width: 100%; ">
                                <ion-ripple-effect></ion-ripple-effect>
                                <div style="margin-right: .2rem;">
                                    <ion-icon style="font-size: 1.4rem" :icon="checkbox" />
                                </div>
                                <div>
                                    Résultat
                                </div>
                            </button>
                        </div>
                    </div>
                    <div v-else-if="has_clicked == pros.id && !pros.resume" style="padding: .5rem 1rem;  font-size: .9rem;">
                        <div style="display: flex; justify-content: space-around; padding: 1rem;" >
                            <ion-spinner :name="'crescent'" ></ion-spinner>
                        </div>
                    </div>
                </div>
                
                <div style="width: 100%; padding: .6rem 0rem; display: flex; justify-content: center; ">
                    <ion-button @click="get_prospects()" >
                        Voir plus
                        <ion-icon slot="end" :icon="addCircle"></ion-icon>
                    </ion-button>

                </div>

            </div>
            <div v-else  >
            	<div style="padding-top: 10rem ; display: flex; justify-content: center;" >
            		<img style="width: 60vw;" :src="'../../img/no_data.svg'" />
            	</div>
            	<div style="padding-top: 2rem; text-align: center; font-weight: bold;" >
            		Aucun prospect pour le moment
            	</div>
            	
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.gray_c {
color : gray;
}

.is_g {
background-color: rgba(0, 128, 0, 0.212); 
color: green;
}

.dash {
    background-color: rgb(247, 247, 247);
    color: rgb(48, 48, 48);
    padding: .6rem 1rem;
}
</style>

<script setup lang="ts">
import { access_tok, showLoading, show_alert, formatOnline } from "@/global/utils";
import router from "@/router";
import { IonPage, IonContent, IonToolbar, IonButtons, IonTitle, IonBackButton, IonIcon, IonRippleEffect, onIonViewWillEnter, IonSpinner } from "@ionic/vue"
import axios from "axios";
import { add, addCircle, checkbox, chevronDown, chevronUp, open, openOutline } from "ionicons/icons"
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const pk = ref(0)
const slug = ref('')
const route = useRoute()
const prospects = ref([] as any[])

const pks = computed(() => {
    const ls = [] as number[]
    for(const p of prospects.value) ls.push(p.id)
    return ls
})
const is_over = ref(false)


const get_prospects = async () => {
    const load = await showLoading('Patientez...')

    const resp = await axios.post('api/get_prospects/' + pk.value + '/', {
        pks : JSON.stringify(pks.value),
        slug : slug.value
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']) {
        const res = resp.data['result']
        prospects.value = prospects.value.concat(res)
        if (!res.length ) {
            is_over.value = true
            await show_alert('', 'Plus de prospects restant')
        } 
    }

    load.dismiss()

}

const has_clicked= ref(0)
watch(has_clicked, (newh, oldh) => {
    if(newh) if (!prospects.value.filter(e => e.id == newh)[0].resume) set_resume()
})

const set_resume = async () => {
    const resp = await axios.get('api/set_resume/' + has_clicked.value + '/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if(resp.data['done']) prospects.value.filter(e => e.id == has_clicked.value)[0].resume = resp.data['result']
}


onIonViewWillEnter(() => {
    pk.value = parseInt(route.params['id'] as string)
    slug.value = route.params['slug'] as string

    if(!prospects.value.length) get_prospects()

})

const opn_link = (lnk : string) => {
	window.location.href = lnk
}

</script>
