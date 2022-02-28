<template>
  <div class="main-content">
    <breadcumb
      :page="'Update Selfie Photo Sample'"
      :folder="'Selfie Photo Samples'"
    />

    <b-row>
      <b-col md="12">
        <b-card title="Selfie Photo Sample">
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
            <b-row>
              <b-col md="6">
                <b-form-group label="Title">
                  <b-form-input
                    class="mb-2"
                    label="Title"
                    placeholder="Enter Title"
                    v-model.trim="$v.form.title.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.title.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Image">
                  <b-form-file
                    id="file-default"
                    name="image_path"
                    ref="image_path"
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
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Update",
  },
  data() {
    return {
      form: {
        title: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    form: {
      title: {
        required,
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
          this.SelfiePhotoSample = await axios.patch(
            `/selfie_photo_samples/${this.$route.params.id}`,
            this.form
          );
          await this.handleFileUpload();

          this.isLoading = false;
          this.$router.push("/app/selfie-photo-samples");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/selfie-photo-samples/");
        // }, 1000);
      }
    },
    async handleFileUpload() {
      let image_path = this.$refs.image_path.files[0];
      const selfie_photo_sample_id = this.SelfiePhotoSample.data.data.id;
      let formData = new FormData();
      formData.append("selfie_photo_sample_id", selfie_photo_sample_id);
      formData.append("image_path", image_path);
      await axios
        .post("upload_selfie_photo_samples", formData, {
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
      let form = await axios.get(
        `/selfie_photo_samples/${this.$route.params.id}`
      );
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
