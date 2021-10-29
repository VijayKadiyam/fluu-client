<template>
  <div class="main-content">
    <breadcumb :page="'Update Site'" :folder="'Sites'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card title="Validate Form">
          <b-form @submit.prevent="submit">
            <b-form-group label="Name">
              <b-form-input
                class="mb-2"
                label="Name"
                placeholder="Enter Name"
                v-model.trim="$v.form.name.$model"
              >
              </b-form-input>

              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.name.required"
                >Field is required</b-alert
              >
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input
                class="mb-2"
                label="Email"
                placeholder="email address"
                v-model.trim="$v.form.email.$model"
              >
              </b-form-input>

              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.email.email"
              >
                {{ $v.form.email.$model }} is invalid.</b-alert
              >
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.email.required"
                >Field is required</b-alert
              >
            </b-form-group>

            <b-form-group label="Phone">
              <b-form-input
                class="mb-2"
                label="Phone"
                v-model.trim="$v.form.phone.$model"
              >
              </b-form-input>

              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.phone.minLength || !$v.form.phone.maxLength"
                >Must be between {{ $v.form.phone.$params.minLength.min }} and
                {{ $v.form.phone.$params.maxLength.max }}</b-alert
              >
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.phone.numeric"
                >Numeric Values Only.</b-alert
              >
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.phone.required"
                >Field is required</b-alert
              >
            </b-form-group>

            <b-button
              type="submit"
              variant="primary"
              :disabled="submitStatus === 'PENDING'"
              >Submit</b-button
            >

            <p v-once class="typo__p" v-if="submitStatus === 'OK'">
              {{ makeToastTwo("success") }}
            </p>
            <p v-once class="typo__p" v-if="submitStatus === 'ERROR'">
              {{ makeToast("danger") }}
            </p>
            <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
              <div class="spinner sm spinner-primary mt-3"></div>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import {
  email,
  numeric,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Update Site",
  },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        email: "",
      },
      isLoading: false,
      submitStatus: null,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        email,
        required,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(12),
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/sites/${this.$route.params.id}`);
      this.form = form.data.data;
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.submitStatus = "PENDING";
        this.isLoading = true;
        await axios.patch(`/sites/${this.$route.params.id}`, this.form);
          this.submitStatus = "OK";
        // setTimeout(() => {
        this.$router.push("/app/sites/");
        // }, 1000);
        this.isLoading = false;
        
      } catch (e) {
        this.isLoading = false;
        this.submitStatus = "ERROR";
      }
        
        
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Please fill the form correctly.", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    makeToastTwo(variant = null) {
      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    inputSubmit() {
      console.log("submitted");
    },
  },
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
