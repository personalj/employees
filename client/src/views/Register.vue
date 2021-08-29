<template>
  <div class="auth-wrap v-application">
    <h1 class="title">Регистрация</h1>
    <v-form class="auth-form">
      <v-text-field
        v-model="login"
        :error-messages="loginErrors"
        placeholder="Email"
        type="email"
        required
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        placeholder="Email"
        type="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        autocomplete="on"
      ></v-text-field>
      <div class="btns d-flex align-center justify-space-between">
        <v-btn class="submit-btn" type="submit" @click.prevent="submit">
          Отправить
        </v-btn>
        <router-link to="/login" class="auth-btn">
          Логин
        </router-link>
      </div>
    </v-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import auth from "@/mixins/auth";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin, auth],

  validations: {
    login: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(50),
      email: email,
    },
    password: { required, minLength: minLength(6), maxLength: maxLength(50) },
  },

  data: () => ({
    login: "",
    password: "",
  }),

  methods: {
    ...mapActions(["register"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const formData = {
          login: this.login,
          password: this.password,
        };
        await this.register(formData);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
