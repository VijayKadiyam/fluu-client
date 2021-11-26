<template>
  <div class="main-content">
    <breadcumb :page="'Update User'" :folder="'Users'" />
    <b-row>
      <b-col md="12">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col md="6">
                <b-form-group label="First Name">
                  <b-form-input
                    class="mb-2"
                    label="First Name"
                    placeholder="Enter First Name"
                    v-model.trim="$v.form.first_name.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.first_name.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="User Name">
                  <b-form-input
                    class="mb-2"
                    label="User Name"
                    placeholder="Enter User Name"
                    v-model.trim="$v.form.user_name.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.user_name.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Middle Name">
                  <b-form-input
                    class="mb-2"
                    label="Middle Name"
                    placeholder="Enter Middle Name"
                    v-model="form.middle_name"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Last Name">
                  <b-form-input
                    class="mb-2"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    v-model="form.last_name"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Gender">
                  <b-row>
                    <b-col md="8">
                      <span>Male</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.gender"
                        /><span class="slider"></span>
                      </label>
                      <span>Female</span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Date Of Birth">
                  <b-form-datepicker
                    id="dob"
                    v-model="form.dob"
                    class="mb-2"
                    placeholder="Date Of Birth"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
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
              </b-col>
              <b-col md="6">
                <b-form-group label="Image">
                  <b-form-file
                    id="file-default"
                    name="imagepath"
                    ref="file"
                    accept="image/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>

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
  // numeric,
  // between,
  required,
  // sameAs,
  // minLength,
  // maxLength,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Update",
  },
  data() {
    return {
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        user_name: "",
        dob: "",
        gender: "",
        password: "",
        email: "",
        active: 1,
        role_id: 4,
      },
      submitStatus: null,
    };
  },
  validations: {
    form: {
      first_name: {
        required,
      },
      user_name: {
        required,
      },
      email: {
        required,
        email,
      },
    },

    // add input
    // peopleAdd: {
    //   required,
    //   minLength: minLength(3),
    //   $each: {
    //     multipleFirst Name: {
    //       required,
    //       minLength: minLength(5)
    //     }
    //   }
    // },
    // validationsGroup:['peopleAdd.multipleFirst Name']
  },
  mounted() {
    // this.form.site_id = this.site.id
    this.getData();
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
          this.isLoading = true;
          await axios.patch(`/users/${this.$route.params.id}`, this.form);
          await this.handleFileUpload();

          this.isLoading = false;
          this.$router.push("/app/users");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
          this.submitStatus = "OK";
          this.$router.push("/app/users/");
        // }, 1000);
      }
    },
    async handleFileUpload() {
      let attachment = this.$refs.file?.files[0];
      const userid = this.form.id;
      let formData = new FormData();
      formData.append("userid", userid);
      formData.append("imagepath", attachment);
      await axios
        .post("upload_user_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
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
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/users/${this.$route.params.id}`);
      this.form = form.data.data;
      this.isLoading = false;
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
