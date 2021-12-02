<template>
  <div class="main-content">
    <breadcumb :page="'Create Viq Chapter'" :folder="'VIQ Chapters'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card title="VIQ Chapter">
          <b-row>
            <b-col md="12">
              <b-button
                style="float: right; margin-top: -45px"
                @click="$router.back()"
                variant="primary"
                ><i class="i-Arrow-Back-3"></i> Back</b-button
              >
            </b-col>
          </b-row>
          <b-form @submit.prevent="submit">
            <b-form-group label="Serial Number">
              <b-form-input
                class="mb-2"
                label="Serial Number"
                placeholder="Enter Serial Number"
                v-model.trim="$v.form.serial_no.$model"
              >
              </b-form-input>

              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.serial_no.required"
                >Field is required</b-alert
              >
            </b-form-group>
            <b-form-group label="Chapter Name">
              <b-form-input
                class="mb-2"
                label="Chapter Name"
                placeholder="Chapter Name"
                v-model.trim="$v.form.chapter_name.$model"
              >
              </b-form-input>
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.chapter_name.required"
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
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Create Site",
  },
  data() {
    return {
      form: {
        serial_no: "",
        chapter_name: "",
      },
      isLoading: false,
      submitStatus: null,
    };
  },
  validations: {
    form: {
      serial_no: {
        required,
      },
      chapter_name: {
        required,
      },
    },
  },

  methods: {
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          await axios.post("/viq_chapters", this.form);
          this.isLoading = false;
          this.$router.push("/app/viq-chapters/");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/viq-chapters/");
        // }, 1000);
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
