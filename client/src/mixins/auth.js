export default {
  computed: {
    loginErrors() {
      const errors = [];
      if (!this.$v.login.$dirty) return errors;
      !this.$v.login.maxLength && errors.push("Не больше 20 символов");
      !this.$v.login.minLength && errors.push("Не меньше 6 символов");
      !this.$v.login.required && errors.push("Введите email");
      !this.$v.login.email && errors.push("Введите корректный email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push("Не больше 20 символов");
      !this.$v.password.minLength && errors.push("Не меньше 6 символов");
      !this.$v.password.required && errors.push("Введите пароль");
      return errors;
    },
  },
};