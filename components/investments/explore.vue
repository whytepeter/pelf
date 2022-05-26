<template>
  <v-row no-gutters class="ma-0 py-6">
    <v-col cols="12" sm="6" md="4">
      <p-investment-card class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <p-investment-card class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <p-investment-card class="mx-auto mx-sm-0" />
    </v-col>
  </v-row>
</template>

<script>
import pInvestmentCard from './pInvestmentCard.vue'
export default {
  components: { pInvestmentCard }

}
</script>

<style>

</style>
