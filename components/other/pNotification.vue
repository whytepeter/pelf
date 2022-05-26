<template>
  <div>
    <v-btn
      fab
      text
      size="20"
      class=""
      @click="toggle(true)"
    >
      <v-badge
        light
        :content="2"
        :value="2"
        color="error"
        bordered
        overlap
      >
        <v-icon>
          fas fa-bell
        </v-icon>
      </v-badge>
    </v-btn>
    <p-view-notifications :drawer="drawer" :toggle="toggle" />
  </div>
</template>

<script>
import pViewNotifications from './pViewNotifications.vue'
export default {
  components: { pViewNotifications },
  data: () => ({
    drawer: false
  }),

  methods: {
    toggle (state) {
      this.drawer = state
    }
  }

}
</script>

<style>

</style>
