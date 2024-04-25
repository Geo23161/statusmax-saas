<template>
    <ion-modal :is-open="isOpen" >
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="clos()">
                    <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title> Informations sur le produit </ion-title>
        </ion-toolbar>
        <ion-content>
            <div v-if="idx == -1" style="padding: .7rem 1rem; font-family: 'Poppins'; width: 100%; height: 100%;">
                <div style="padding-top: 3rem; font-size: 1.3rem; text-align: center; font-weight: bold; ">
                    Repondez aux questions sur votre produit
                </div>
                <div style="text-align: center; font-size: .9rem; padding-top: .2rem;  ">
                    Veuillez fournir toutes les informations nécéssaire afin que l'IA puisse maîtriser votre produit.
                </div>
                <div style="padding: 4.3rem 0rem; display: flex; justify-content: space-around;">
                    <img :src="'../../imgs/ai.svg'" style="width: 75vw;" />
                </div>
                <div style="width: 100%; padding: .6rem 0rem; ">
                    <ion-button @click="get_quest_mod()" expand="block">
                        Commencer
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button>
                </div>
            </div>
            <div v-for="(quest, id) in ai_quest" :key="quest.title" :class="{
                hide : idx != id
            }" style="padding: .7rem 1rem; font-family: 'Poppins'; width: 100%; height: 100%;">
                <div style="padding-top: 3rem; font-size: 1.3rem; text-align: center; font-weight: bold; ">
                    {{ quest.question }}
                </div>
                <div style="text-align: center; font-size: .9rem; padding-top: .2rem;  ">
                    {{ quest.title }}
                </div>
                <div v-if="quest.typ == 'text'" style="padding: 4rem 0rem; display: flex; justify-content: space-around;">
                    <div @input="e => set_text(e,quest.question)" class="rinput" data-placeholder="ecrivez ici..." style="width: 100%; padding: .8rem; border-radius: 10px; background-color: rgb(238, 238, 238); color: rgb(46, 46, 46); min-height: 8rem; width: 100%; " contenteditable >
                        
                    </div>
                </div>
                <div v-else style="padding: 4rem 0rem; display: flex; justify-content: space-around;">
                    <div v-for="ch in quest.choices" :key="ch" style="padding: .5rem .5rem ;" >
                        <ion-checkbox :checked="this_quest(quest.question).answers == ch" @click.stop="this_quest(quest.question).answers = ch"  label-placement="end">{{ ch }}</ion-checkbox>
                    </div>
                </div>
                <div style="width: 100%; padding: .6rem 0rem; ">
                    <ion-button @click="set_actual()" expand="block">
                        Continue
                        <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-modal>
</template>

<style scoped >
*:focus {
    outline: none;
}

.rinput:empty::before {
    content: attr(data-placeholder);
    color: rgba(29, 29, 29, 0.616);
}

.hide {
    display: none;
}
</style>

<script setup lang="ts">
interface AIQuest {
    title : string,
    question : string,
    answers : string,
    typ : string,
    choices? : string[]
}

import { access_tok, showLoading, show_alert } from "@/global/utils";
import { IonModal, IonContent, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonCheckbox } from "@ionic/vue"
import axios from "axios";
import { arrowBack, arrowForward } from "ionicons/icons"
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    isOpen : Boolean,
    id : Number
})

const emit = defineEmits(['close', 'done'])

const clos = () => {
    emit('close')
}

const make_done = (prod : any) => {
    emit('done', prod)
}

const idx = ref(-1)
const cur_quest = computed(() => {
    return (ai_quest.value as AIQuest[])[idx.value]
})
const ai_quest = ref<AIQuest[]>([
    {
        title : 'Nom du produit',
        question : 'Quel est le nom du produit',
        typ : 'text',
        answers : ''
    }
])

const set_actual = async () => {
    if(idx.value == -1 ) return idx.value = 0;

    if(cur_quest.value.answers == '') return show_alert('', 'Veuillez répondre avant de passer au suivant.')

    else {
        if (idx.value == ai_quest.value.length - 1) set_quest();
        else idx.value++;
    }
}
const router = useRouter()


const set_quest = async () => {
    const load = await showLoading('Loading...')

    const resp = await axios.post('api/set_quest/' + props.id + '/', {
        quests : JSON.stringify(ai_quest.value)
    }, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, load)}`
        }
    })
    if(resp.data['done']) {
        load.dismiss()
        make_done(resp.data['result'])
    }
 
}

const set_text = (e : any, title : string) => {
    for(const quest of ai_quest.value) if(quest.question == title) quest.answers = e.target.innerText;
}

const get_quest_mod = async () => {
    const load = await showLoading('Loading...')
    const resp = await axios.get('api/get_quest_mod/' + props.id + '/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, undefined)}`
        }
    }) 
    if(resp.data['done']) {
        ai_quest.value = resp.data['result']
        set_actual()
        load.dismiss()

    }
}

const this_quest = (title :string) => ai_quest.value.filter(e => e.question == title)[0]

</script>
