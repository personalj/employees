<template>
  <div class="auth-wrap v-application">
    <h1 class="title">Логин</h1>
    <v-form class="auth-form">
      <v-text-field
        v-model="login"
        :error-messages="loginErrors"
        type="email"
        placeholder="Email"
        required
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        type="password"
        placeholder="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        autocomplete="on"
      ></v-text-field>
      <div class="btns d-flex align-center justify-space-between">
        <v-btn class="submit-btn" type="submit" @click.prevent="submit">
          Отправить
        </v-btn>
        <router-link to="/register" class="auth-btn">
          Регистрация
        </router-link>
      </div>
    </v-form>
  </div>
</template>
<script>
import {mapActions } from "vuex";
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
    ...mapActions(["logIn"]),
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
        await this.logIn(formData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    const {message} = this.$route.query

    switch (message) {
      case 'login':
        this.$toast.info('Для начала войдите в систему')
        break
      case 'logout':
        this.$toast.info('Вы успешно вышли из системы')
        break
      case 'success-register':
        this.$toast.info('Ввойдите в систему')
        break
    }
  },
};
</script>
