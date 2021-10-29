<template>
  <div class="main-content">
    <breadcumb :page="'Update Value'" :folder="'Values'" />

    <b-row class="justify-content-md-center"> 
      <b-col md="6">
        <b-card>
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
                class="error col-md-6 mt-1"
                v-if="!$v.form.name.minLength"
                >Name must have at least
                {{ $v.form.name.$params.minLength.min }} letters.</b-alert
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
import {required, minLength} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Value | Update"
  },
  data() {
    return {
     form:{
        name: "",
     },
      submitStatus: null,
      
    };
  },
  validations: {
    form:{
      name: {
      required,
      minLength: minLength(4)
    },
    }
  },
mounted() {
    this.getData()
  },
  methods: {
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        try {
        this.isLoading = true
        await axios.patch(`/values/${this.$route.params.id}`, this.form)
        this.isLoading = false
        this.$router.push('/app/values')
      } catch(e) {
        this.isLoading = false
      }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
          this.$router.push("/app/values/");
          this.submitStatus = "OK";
        // }, 1000);
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Please fill the form correctly.", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    makeToastTwo(variant = null) {
      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },

    inputSubmit() {
      console.log("submitted");
    },
    async getData() {
      this.isLoading = true
      let form = await axios.get(`/values/${this.$route.params.id}`)
      this.form = form.data.data
      this.isLoading = false
    },
  }
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
