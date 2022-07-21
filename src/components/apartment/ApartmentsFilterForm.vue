<template>
  <form class="form" @submit.prevent="handleSubmit">
    <CustomSelect :items="cities" v-model="city" class="form__select" />
    <CastomInput
      v-model="price"
      placeholder="Цена, от"
      error-message="Не должно быть пустым"
      :rules="rules"
    />
    <SubmitButton type="submit" class="form__submit">
      Подбор жилья
    </SubmitButton>
  </form>
</template>

<script>
import CustomSelect from "../shared/CustomSelect";
import CastomInput from "../shared/CastomInput";
import SubmitButton from "../shared/Button";
import { isRequired, charLimit } from "../../utils/validationRules";

export default {
  name: "ApartmentsFilterForm",
  components: {
    CustomSelect,
    CastomInput,
    SubmitButton,
  },
  data() {
    return {
      price: "",
      city: "",
    };
  },
  computed: {
    rules() {
      return [isRequired, charLimit(10)];
    },
    cities() {
      return [
        { value: "", label: "Город", selected: true },
        "Kyiv",
        "Odesa",
        "Poltava",
        "Kharkiv",
        "Dnipro",
        "Lviv",
        "Kherson",
        "Mariupol",
      ];
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("formSubmit", { city: this.city, price: this.price });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  &__select {
    margin-right: 30px;
  }
  &__submit {
    margin-left: auto;
  }
}
</style>
