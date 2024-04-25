<template>
    <ion-modal :is-open="isOpen">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="clos()">
                    <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-title>Choisissez le produit</ion-title>
        </ion-toolbar>
        <ion-content>
            <div style="padding: .7rem 1rem; font-family: 'Poppins';  ">
                <div v-if="old_prods.length" style="font-size: 1.1rem ; padding-top: 1rem; font-weight: bold;">
                    Parmi les produits déjà ajoutés
                </div>
                <div style="display: flex; align-items: center; padding-top: 1rem; overflow-x: scroll;  ">
                    <div v-for="prod in old_prods" :key="prod.id" style="width: 70vw; margin-right: .8rem; min-width: 70vw;  ">
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
                        <div @click="make_done(prod)" class="ion-activatable ripple-parent"
                            style="text-align: center; padding: .6rem; font-size: .9rem; border-radius: 15px; width: 100%; background-color: rgba(0, 0, 255, 0.144); color: rgba(0, 0, 255); ">
                            <ion-ripple-effect></ion-ripple-effect>
                            Choisir
                        </div>
                    </div>
                </div>  
                <div style="font-size: 1.1rem ; padding-top: 1.6rem; font-weight: bold;">
                    Ajouter un nouveau produit
                </div>
                <div style="padding: 0.2rem .5rem ;">

                    <div class="d_sp">
                        <div style="padding-bottom: .3rem;">
                            Nom du produit
                        </div>
                        <input v-model="prod_name" class="my_inp" placeholder="ecrivez..." />
                    </div>

                    <div class="d_sp">
                        <div style="padding-bottom: .3rem;">
                            Type de produit
                        </div>
                        <select class="my_inp" placeholder="Selectionnez" v-model="prod_typ" >
                            <option value="physique" > Physique
                            </option>
                            <option value="numerique" > Numerique ou Service
                            </option>
                        </select> 
                    </div>

                    <div class="d_sp">
                        <div style="padding-bottom: .3rem;">
                            Images du produits
                        </div>
                        <div @click="click_id('img_i')" class="ion-activatable ripple-parent"
                            style="display: flex; justify-content: space-between; padding: .6rem; align-items: center; background-color: rgb(238, 238, 238); color: rgb(46, 46, 46);">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div>
                                {{ prod_images.length ? `${ prod_images.length } image${(prod_images.length > 1) ? 's' : ''}` : 'Aucune image' }}
                            </div>
                            <div>
                                <ion-icon :icon="cloudUpload"
                                    style="font-size: 1.5rem; position: relative; top: .1rem; " />
                            </div>
                        </div>
                    </div>

                    <div class="d_sp">
                        <div style="padding-bottom: .3rem;">
                            Videos du produits
                        </div>
                        <div @click="click_id('vid_i')" class="ion-activatable ripple-parent"
                            style="display: flex; justify-content: space-between; padding: .6rem; align-items: center; background-color: rgb(238, 238, 238); color: rgb(46, 46, 46);">
                            <ion-ripple-effect></ion-ripple-effect>
                            <div>
                                {{ prod_videos.length ? `${ prod_videos.length } video${(prod_videos.length > 1) ? 's' : ''}` : 'Aucune video' }}
                            </div>
                            <div>
                                <ion-icon :icon="cloudUpload"
                                    style="font-size: 1.5rem; position: relative; top: .1rem; " />
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%; padding: .6rem 0rem; ">
                        <ion-button @click="create_prod_()" expand="block">
                            Ajouter
                            <ion-icon slot="end" :icon="arrowForward"></ion-icon>
                        </ion-button>
                    </div>
                </div>
            </div>
            <div v-show="false" >
                <input type="file" multiple id="img_i" accept="image/*" @change="e => add_files(e, 'img')"  />
                <input type="file" multiple id="vid_i" accept="image/*" @change="e => add_files(e, 'vid')" />
            </div>
        </ion-content>
    </ion-modal>
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
    background-color: rgba(0, 0, 255, 0.144);
}
</style>

<script lang="ts" setup>
import { IonModal, IonContent, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonIcon, IonRippleEffect } from "@ionic/vue"
import { arrowBack, arrowForward, cloudUpload, images } from "ionicons/icons"
import axios from "axios"
import { access_tok, showLoading, show_alert, extract_frames } from "@/global/utils";
import { useRouter } from "vue-router";
import { ref, watch } from "vue"

const props = defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close', 'done'])

const clos = () => {
    emit('close')
}

const make_done = (prod : any) => {
    emit('done', prod)
}

const old_prods = ref([] as any[])
const router = useRouter()
const prod_name = ref('')
const prod_images = ref<Blob[]>([])
const prod_videos = ref<Blob[]>([])
const prod_typ = ref('physique')

const get_products = async () => {
    const resp = await axios.get('api/get_products/', {
        headers : {
            Authorization : `Bearer ${await access_tok(router, undefined)}`
        }
    })
    if(resp.data['done']) {
        old_prods.value = resp.data['result']
    }
}

const add_files = (e: any, typ : string) => {
    if (typ == 'img') prod_images.value = [] as Blob[]
    else {
        prod_videos.value = [] as Blob[]
        previews.value= [] as Blob[]
    } 
    for(const f of e.target.files) ( typ == 'img' ? prod_images.value : prod_videos.value).push(f)
}

get_products()

const click_id = (id : string) => {
    document.getElementById(id)?.click()
}

const global_load = ref()

const create_prod_ = async () => {
    global_load.value = await showLoading("Loading...")
    if (prod_videos.value.length) {
    	for(const file of prod_videos.value) {
		extract_frames(file, b => previews.value.push(b as Blob), 10)
	    }
    } else create_prod();
}

const previews = ref<Blob[]>([])
watch(previews, (newp, oldp) => {
    if(newp.length == prod_videos.value.length) create_prod()
}, {
    deep : true
})


const create_prod = async () => {
    if (prod_name.value == ''){
    	global_load.value?.dismiss();
        return show_alert('', 'Veuillez indiquer le nom de votre produit ou service.');
    }
    if(!prod_images.value.length){ 
    	global_load.value?.dismiss();
    	return show_alert('', 'Vous devez ajouter au moins une image');
    }

    const form = new FormData()
    form.append('name', prod_name.value)
    form.append('typ', prod_typ.value)
    form.append('img_length', `${prod_images.value.length}`)
    form.append('vid_length', `${prod_videos.value.length}`)
    for(let i = 0; i < prod_images.value.length; i++) form.append('img' + i, prod_images.value[i])
    for(let i = 0; i < prod_videos.value.length; i++) form.append('vid' + i, prod_videos.value[i])
    for(let i = 0; i < previews.value.length; i++) form.append('prev' + i, previews.value[i])

    try {
    	const resp = await axios.post('api/create_prod/', form, {
        headers : {
            Authorization : `Bearer ${await access_tok(router, global_load.value)}`,
            "Content-Type": "multipart/form-data"
        }
    })
    if(resp.data['done']) {
        
        make_done(resp.data['result'])
    }
    } catch(e) {
    	show_alert('','Une erreur est survenue, veuillez reessayer');
    }
    global_load.value?.dismiss()

}

</script>
