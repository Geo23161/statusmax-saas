<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="#"></ion-back-button>
            </ion-buttons>
            <ion-title>Ajoutez votre campagne</ion-title>
        </ion-toolbar>
        <ion-content>

            <div v-if="stp == 0" class="body_all">
                <div>
                    <div class="mtitle">
                        Choix du produits
                    </div>
                    <div style=" font-size: .95rem; padding-top: .5rem;">
                        Veuillez choisir le produit utilisé pour la campagne ou ajouter un nouveau
                    </div>
                </div>
                <div style="display: flex; justify-content: space-around; flex-grow: 1; flex-direction: column;">
                    <div style="padding: 2rem 0rem;">
                        <div v-if="!prod" @click="cOpen = true" class="product_empty ripple-parent ion-activatable  ">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div style="display: flex; justify-content: space-around;  ">
                                <img style="width: 60vw;" :src="'../../imgs/add.svg'" />
                            </div>
                            <div style="text-align: center; padding-top: .6rem;">
                                Cliquez pour choisir le produit
                            </div>
                        </div>
                        <div v-else>
                            <div style="width: 100%; ">
                                <div class="img_all" :style="{
                width: '100%',
                backgroundImage: `url('${prod.get_image}')`,
                height: '10rem',
                borderRadius: '15px'
            }">

                                </div>

                                <div
                                    style=" padding-top: .5rem; padding-left: .3rem; font-weight: bold; padding-bottom: .3rem; text-align: center; ">
                                    {{ prod.name }}
                                </div>
                                <div @click="prod = undefined" class="ion-activatable ripple-parent"
                                    style="text-align: center; padding: .6rem; font-size: .9rem; border-radius: 15px; width: 100%; background-color: rgba(179, 39, 39, 0.144); color: red; ">
                                    <ion-ripple-effect></ion-ripple-effect>
                                    Supprimer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; padding: .6rem 0rem; ">
                    <ion-button @click="to_next()" expand="block">
                        Continuer
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button>
                </div>
            </div>
            <div v-else-if="stp == 1" class="body_all">
                <div>
                    <div class="mtitle">
                        Objectif final
                    </div>
                    <div style=" font-size: .95rem; padding-top: .5rem;">
                        Que voulez-vous qu'un client prêt à acheter fasse?
                    </div>
                </div>
                <div style="display: flex; justify-content: space-around; flex-grow: 1; flex-direction: column;">
                    <div style="padding: 2rem 0rem;">
                        <div class="d_sp">
                            <div style="padding-bottom: .3rem;">
                                Selectionner l'objectif
                            </div>
                            <select class="my_inp" placeholder="cliquez ici..." v-model="goal">
                                <option value="livraison"> Obtenir les contacts pour la livraison
                                </option>
                                <option value="event"> Enregistrer ses informations 
                                </option>
                                <option value="paiement"> Rediriger vers la page de paiement
                                </option>
                            </select>
                        </div>
                        <div v-if="goal == 'livraison' || goal == 'event'" class="d_sp">
                            <div style="padding-bottom: .3rem;">
                                Quels informations voulez-vous?
                            </div>
                            <div v-for="ch in choices_c" :key="ch.id" @click.stop="contacts.includes(ch.id) ? (contacts = contacts.filter(e => e != ch.id)) : contacts.push(ch.id)" style="padding: .5rem .5rem ;">
                                <ion-checkbox :checked="contacts.includes(ch.id)"
                                    
                                    label-placement="end">{{ ch.name
                                    }}</ion-checkbox>
                            </div>
                        </div>
                        <div v-else-if="goal == 'paiement'" class="d_sp">
                            <div style="padding-bottom: .3rem;">
                                Lien vers la page de paiement
                            </div>
                            <input v-model="link" class="my_inp" placeholder="ecrivez..." />
                        </div>
                    </div>
                </div>
                <div style="width: 100%; padding: .6rem 0rem; ">
                    <ion-button @click="to_next()" expand="block">
                        Continuer
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button>

                </div>
            </div>
            <div v-else class="body_all">
                <div>
                    <div class="mtitle">
                        Budget alloué
                    </div>
                    <div style=" font-size: .95rem; padding-top: .5rem;">
                        Combien voulez-vous utiliser pour l'acquisition des clients.
                    </div>
                </div>
                <div style="display: flex; justify-content: space-around; flex-grow: 1; flex-direction: column;">
                    <div style="padding: 2rem 0rem;">
                        <div @input="set_bud" class="product_empty  " style="font-size: 3rem; font-weight: bold; "
                            contenteditable>
                            2000
                        </div>
                        <div v-if="prox > 5" style="padding: .5rem; font-weight: bold">
                            <span style="color: green;"> Résultats probable: </span> {{ prox }} ventes
                        </div>
                    </div>
                </div>
                <div style="width: 100%; padding: .6rem 0rem; ">
                    <ion-button @click="to_next()" expand="block">
                        Continuer
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button>

                </div>
            </div>
            <pay-comp :is-open="yOpen" :mont="mont" @close="yOpen = false" @done=" yOpen = false, create_compaign()" />
            <choose-or-add :is-open="cOpen" @close="cOpen = false" @done="e => (prod = e, cOpen = false)" />
            <learn-robot :is-open="lOpen" :id="prod ? prod.id : 0" @close="lOpen = false" @done="e => (prod = e, lOpen = false)" />
        </ion-content>
    </ion-page>
</template>

<style scoped>
.my_inp {
    width: 100%;
    padding: .8rem;
    background-color: rgb(238, 238, 238);
    color: rgb(46, 46, 46);
    border: none;
}

*:focus {
    outline: none
}

.d_sp {
    padding: .5rem 0rem;
}

.img_all {
    background-size: cover;
    background-position: center;
    background-color: rgba(179, 39, 39, 0.144);
}

*:focus {
    outline: blue;
}

.product_empty {
    width: 100%;
    border-radius: 15px;
    background-color: rgb(241, 241, 241);
    padding: 2rem;
    font-size: 1rem;
    color: rgb(66, 66, 66);

}

.mtitle {
    font-size: 1.7rem;
    font-weight: bold;
    padding-top: 1rem;
}

.body_all {
    width: 100%;
    height: 100%;
    padding: .7rem 1rem;
    font-family: 'Poppins';
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>

<script setup lang="ts">
import { IonPage, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonRippleEffect } from "@ionic/vue"
import { arrowForward } from "ionicons/icons";

import ChooseOrAdd from "../components/ChooseOrAdd.vue"
import LearnRobot from "../components/LearnRobot.vue"
import { ref, watch } from "vue";
import { access_tok, showLoading, show_alert } from "@/global/utils";
import axios from "axios"
import router from "@/router";
import PayComp from "@/components/PayComp.vue";

const choices_c = ref([{
    id: 'tel',
    name: 'Numéro de téléphone'
},
{
    id: 'whatsapp',
    name: 'Numéro Whatsapp'
},
{
    id: 'email',
    name: "Email",
},
{
    id: 'name',
    name: "Nom et Prénom"
},
{
    id: 'lieu',
    name: 'Ville et Quartier',
}
])

const goal = ref('')
const contacts = ref([] as string[])
watch(contacts, (newc, oldc) => {
	console.log(newc)
}, { deep : true })
const link = ref('')
const price_per = ref([] as any[])

const budget = ref('2000')
const prox = ref(0)
watch(budget, (newb, oldb) => {
    try {
        prox.value = Math.floor((parseInt(newb) / (price_per.value[0] as number)) * price_per.value[1] as number)
    } catch (e) {
        console.log(e);

    }
})
const set_bud = (e: any) => {
    budget.value = e.target.innerText
}

const stp = ref(0)
const prod = ref()
watch(prod, (newp, oldp) => {
    if (newp?.get_description.length == 0) lOpen.value = true
}, {
    deep: true
})

const lOpen = ref(false)
const cOpen = ref(false)
const has_payed = ref(false)
const yOpen = ref(false)

const mont = ref(0)
const to_next = () => {
    if (stp.value == 0) {
        if (!prod.value) return show_alert('', 'Veuillez choisir un produit avant de continuer')
        if (prod.value.get_description.length == 0) {
            lOpen.value = true;
            return;
        }
        stp.value++;

    } else if (stp.value == 1) {
        if (goal.value == '') return show_alert('', 'Veuillez choisir un objectif !');
        if (contacts.value.length == 0 && link.value == '') return show_alert('', (goal.value == 'event' ? 'Veuillez entrer le lien vers la page de paiement pour continuer!' : 'Veuillez choisir au moins une information à envoyer.'))
        stp.value++;
    } else {
        try {
            const price = parseInt(budget.value)

            if (price < 500) return show_alert('', 'Le budget ne doit pas être inferieur à 500')
            if(amount.value > price) create_compaign();
            else mont.value = (price - amount.value), yOpen.value = true, console.log(`price : ${budget.value}`);
        } catch (e) {
            return show_alert('', 'veuillez rentrer un prix correct.')
        }
    }
}

const amount = ref(0)
const get_price_per = async () => {
    const resp = await axios.get('api/get_price_per/', {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) price_per.value = resp.data['result'], amount.value = resp.data['other'];
}

get_price_per()



const create_compaign = async () => {
    const load = await showLoading('Loading...')
    const form = new FormData()
    form.append('prod_id', prod.value.id)
    form.append('goal', goal.value)
    form.append('contacts', JSON.stringify(contacts.value))
    form.append('link', link.value)
    form.append('budget', budget.value)

    const resp = await axios.post('api/create_campaign/', form, {
        headers: {
            Authorization: `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if (resp.data['done']) {
        router.push('/post/' + resp.data['result'] + '/')
    }
}

</script>
