<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-16 my-5">
      <v-col cols="12">
        <v-img height="70" contain src="/logo/brass&books.png" class="" />
      </v-col>
      <v-col cols="12" class="mx-auto d-flex justify-center">
        <v-card flat max-width="450" class="rounded-lg px-md-4 py-2">
          <v-card-title class=" flex-column justify-center font-weight-light text-subtitle-1 text-md-h6 my-2">
            <div class="font-weight-medium primary--text text-h5">
              Welcome back
            </div>
            <div class="text-subtitle-1 mt-1 text1--text font-weight-light">
              Login to your pelf account
            </div>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="submit"
            >
              <v-row no-gutters>
                <v-col cols="12" class="py-0 mb-n1">
                  <v-text-field
                    v-model="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    dense
                    outlined
                    color="primary"
                    label="Phone Number"
                    :rules="phoneNumberRules"
                    class="text-subtitle-2 font-weight-light rounded-md"
                  />
                </v-col>
                <v-col cols="12" class="py-0 mb-n1">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    dense
                    outlined
                    color="primary"
                    label="Password"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    class="text-subtitle-2 font-weight-light rounded-md"
                    @click:append="show = !show"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="py-0 mb-2 text-center"
                >
                  <div>
                    <nuxt-link to="/password/reset" tag="a" class="font-weight-bold">
                      Forgot Password
                    </nuxt-link>
                  </div>
                </v-col>
                <v-col cols="12" class="py-2">
                  <v-btn
                    type="submit"
                    :loading="loading.login"
                    depressed
                    block
                    color="secondary"
                    class="text-subtitle-2 font-weight-normal"
                  >
                    Login
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-2  text-center"
                >
                  <div>
                    New to Pelf?
                    <nuxt-link to="/register" tag="a" class="font-weight-bold">
                      Sign Up
                    </nuxt-link>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-1 text-center"
                >
                  <div>
                    By signing up, you agree to our
                    <nuxt-link to="/login" tag="a" class="font-weight-bold">
                      Terms
                    </nuxt-link>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="pa-0">
        <alert />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import alert from '~/components/other/pAlert.vue'

export default {
  components: { alert },
  layout: 'welcome',

  data: () => ({
    valid: true,
    show: false,
    phoneNumber: '',
    phoneNumberRules: [v => !!v || 'Phone Number is required'],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ]
  }),

  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert'
    })
  },

  methods: {
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.loginUser({
          phoneNumber: this.phoneNumber,
          password: this.password
        })
      }
    },

    clear () {
      this.reset()
      this.resetValidation()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }

}
</script>

<style>

</style>
