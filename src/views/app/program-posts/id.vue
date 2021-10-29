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
                v-model.trim="$v.name.$model"
              >
              </b-form-input>

              <b-alert
                show
                variant="danger"
                class="error col-md-6 mt-1"
                v-if="!$v.name.minLength"
                >Name must have at least
                {{ $v.name.$params.minLength.min }} letters.</b-alert
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
import {email,numeric, between,required, sameAs, minLength,maxLength } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Form Component"
  },
  data() {
    return {
      name: "",
      phone: "",
      email:"",
      submitStatus: null,
      peopleAdd: [
        {
          multipleName: "Johnn"
        },
        {
          multipleName: ""
        }
      ]
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      email,
      required,
      minLength: minLength(4)
    },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(12),
    },

    // add input
    // peopleAdd: {
    //   required,
    //   minLength: minLength(3),
    //   $each: {
    //     multipleName: {
    //       required,
    //       minLength: minLength(5)
    //     }
    //   }
    // },
    // validationsGroup:['peopleAdd.multipleName']
  },

  methods: {
    //   validate form
    submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 1000);
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
    }
  }
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
