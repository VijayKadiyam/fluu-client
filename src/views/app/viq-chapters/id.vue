<template>
  <div class="main-content">
    <breadcumb :page="'Update VIQ Chapter'" :folder="'VIQ Chapters'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card title="VIQ Chapter">
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
import {
  required,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Update Viq Chapter",
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/viq_chapters/${this.$route.params.id}`);
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
        await axios.patch(`/viq_chapters/${this.$route.params.id}`, this.form);
          this.submitStatus = "OK";
        // setTimeout(() => {
        this.$router.push("/app/viq-chapters/");
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
