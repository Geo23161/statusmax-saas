<template>
    <ion-page >
        <ion-content :fullscreen="true" >
            <div class="body_all">
                <div class="header" >
                    <div style="display: flex; align-items: center;" >
                        <button style="font-size: 1.8rem; margin-right: .6rem; padding: .6rem;" >
                            <ion-icon :icon="arrowBack" />
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(82,113,255,255);
    padding: .6rem .6rem;
}

.body_all {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
    align-items: center;
}
</style>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from "@ionic/vue"
import { arrowBack } from "ionicons/icons";
</script>