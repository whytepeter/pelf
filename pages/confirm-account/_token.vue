<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-16 my-16">
      <v-col cols="12" sm="8" md="6">
        <v-card max-width="450" class="rounded-lg  px-md-4">
          <v-card-title class="primary--text font-weight-regular text-subtitle-1 text-md-h6">
            <div class="d-flex align-center">
              <v-icon color="primary" class="mx-2">
                fas fa-user-lock
              </v-icon>
              <span class="ml-md-1">
                Change Password
              </span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="py-4  "
              @submit.prevent="submit"
            >
              <v-row no-gutters>
                <v-col v-if="!verified" cols="12" class="py-0">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    dense
                    outlined
                    color="primary"
                    label="Password"
                    required
                    class="text-subtitle-2 font-weight-light rounded-0"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
                    @click:append="show = !show"
                  />
                </v-col>
                <v-col v-if="!verified" cols="12" class="py-0">
                  <v-text-field
                    v-model="confirmPassword"
                    :type="show1 ? 'text' : 'password'"
                    name="confirmPassword"
                    dense
                    outlined
                    color="primary"
                    label="Confirm Password"
                    required
                    class="text-subtitle-2 font-weight-light rounded-0"
                    :rules="[confirmPasswordRules, passwordConfirmationRule]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                  />
                </v-col>
                <v-col v-if="!verified" cols="12" class="py-0 d-flex align-center">
                  <v-spacer />
                  <v-btn
                    block
                    depressed
                    type="submit"
                    :loading="loading.password"
                    tile
                    color="primary"
                    class="text-capitalize rounded text-subtitle-2 font-weight-regular"
                  >
                    Change Password
                  </v-btn>
                </v-col>
                <v-col v-else cols="12" class="py-0 d-flex align-center">
                  <v-spacer />
                  <v-btn
                    block
                    text
                    tile
                    color="accent"
                    class="text-capitalize rounded text-subtitle-2 font-weight-regular"
                  >
                    Proceed to login
                  </v-btn>
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
    show1: false,

    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || 'Password is required'
    ]
  }),
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert',
      verified: 'authentication/getVerified'
    }),
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    }
  },
  methods: {
    ...mapActions({ resetPassword: 'authentication/passwordReset' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          token: this.$route.params.token,
          password: this.password,
          confirm_password: this.confirmPassword
        }

        console.log(payload)
        this.resetPassword(payload)
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
