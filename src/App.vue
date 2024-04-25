<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
.ripple-parent {
  position: relative;
  overflow: hidden;
}

div {
  font-family: 'Poppins' ;
}

</style>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
