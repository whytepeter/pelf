<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-16 my-5">
      <v-col cols="12">
        <v-img height="70" contain src="/logo/brass&books.png" class="" />
      </v-col>
      <v-col cols="12" class="mx-auto d-flex justify-center">
        <keep-alive>
          <component :is="passwordForm" :update="update" :set-form="setForm" />
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Otp from '~/components/password/otp.vue'
import Password from '~/components/password/password.vue'
import Start from '~/components/password/start.vue'

export default {
  components: { Start, Password, Otp },
  layout: 'welcome',
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      passwordForm: 'authentication/getPasswordForm'
    })
  },

  methods: {
    ...mapMutations({ setState: 'authentication/setState', setPassword: 'authentication/setPassword' }),
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    update (type, value) {
      this.setPassword({ type, value })
    },
    setForm (value) {
      this.setState({ type: 'passwordForm', value })
    }
  }

}
</script>

<style>

</style>
