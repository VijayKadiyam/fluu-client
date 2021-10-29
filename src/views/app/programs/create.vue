<template>
  <div class="main-content">
    <breadcumb :page="'Create Program'" :folder="'Programs'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-form-group label="Program Name">
              <b-form-input
                class="mb-2"
                label="Program Name"
                placeholder="Enter Program Name"
                v-model.trim="$v.form.program_name.$model"
              >
              </b-form-input>
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.program_name.required"
                >Field is required</b-alert
              >
            </b-form-group>

            <b-form-group label="Program Description">
              <b-form-textarea
                id="textarea"
                v-model="form.program_description"
                placeholder="Program Description"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Instructor">
              <b-form-input
                class="mb-2"
                label="Instructor"
                placeholder="Enter Instructor"
                v-model.trim="form.instructor"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Hours">
              <b-form-input
                class="mb-2"
                label="Hours"
                placeholder="Enter Hours"
                v-model="form.hours"
              >
              </b-form-input>
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Create Program",
  },
  data() {
    return {
      form: {
        program_name: "",
        program_description: "",
        instructor: "",
        hours: "",
      },

      submitStatus: null,
    };
  },
  validations: {
    form: {
      program_name: {
        required,
        minLength: minLength(4),
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
          this.submitStatus = "PENDING";
          // console.log(this.form);
          await axios.post("/programs", this.form);
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
            this.$router.push("/app/programs/");
          // }, 1000);
        } catch (e) {
          this.isLoading = false;
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
