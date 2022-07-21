<template>
  <AuthContainer class="login">
    <MainTitle class="login__title">Логин</MainTitle>
    <Form ref="form" class="login__form" @submit.prevent="handleSubmit">
      <CustomInput
        v-model="formData.email"
        placeholder="Email"
        autocomplete="email"
        name="email"
        :rules="emailRules"
        class="login__input qwe"
      />
      <CustomInput
        v-model="formData.password"
        placeholder="Password"
        autocomplete="current-password"
        type="password"
        name="password"
        :rules="passwordlRules"
        class="login__input"
      />
      <Button type="submit" class="login__btn" :loading="loading">Вход</Button>
    </Form>
  </AuthContainer>
</template>

<script>
import Form from "../../shared/form";
import CustomInput from "../../shared/CastomInput";
import Button from "../../shared/Button";
import AuthContainer from "../../auth/AuthContainer";
import MainTitle from "../../shared/MainTitle";
import {
  emailValidation,
  passwordValidation,
  isRequired,
} from "../../../utils/validationRules";
import { mapActions } from "vuex";

export default {
  name: "TheLogin",
  components: { Form, CustomInput, Button, AuthContainer, MainTitle },
  data() {
    return {
      loading: false,
      formData: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        emailValidation,
        passwordValidation,
        isRequired,
      };
    },
    emailRules() {
      return [this.rules.isRequired, this.rules.emailValidation];
    },
    passwordlRules() {
      return [this.rules.isRequired];
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleSubmit() {
      const { form } = this.$refs;
      const isFormValid = form.validate();
      if (isFormValid) {
        try {
          this.loading = true;
          // await this.$store.dispatch("auth/login", this.formData);
          await this.login(this.formData);
          this.$router.push({ name: "homepage" });
          form.reset();
        } catch (error) {
          this.$notify({
            type: "error",
            title: "Произошла ошибка",
            text: error.message,
          });
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__form {
    display: block;
    flex-direction: column;
  }
  &__title {
    text-align: center;
  }
  // не работают стили. РАЗОБРАТЬСЯ!!!
  &__input {
    margin-bottom: 20px;
    width: 100%;
  }
  &__btn {
    margin-top: 15px;
    width: 100%;
  }
}
</style>
