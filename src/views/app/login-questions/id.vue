<template>
  <div class="main-content">
    <breadcumb :page="'Create Login Question'" :folder="'Login Questions'" />

    <b-row>
      <b-col md="12">
        <b-card title="Login Question">
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
                <b-form-group label="Description">
                  <b-form-input
                    class="mb-2"
                    label="Description"
                    placeholder="Enter Description"
                    v-model.trim="$v.form.description.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.description.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Is Active">
                      <b-form-checkbox-group
                        v-model="form.is_active"
                        id="checkboxes-4"
                        :aria-describedby="ariaDescribedby"
                      >
                        <b-form-checkbox value="1">Is Active</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Is MCQ">
                      <b-form-checkbox-group
                        v-model="form.is_mcq"
                        id="checkboxes-4"
                        :aria-describedby="ariaDescribedby"
                      >
                        <b-form-checkbox value="1">Is MCQ</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Sub Description">
                  <b-form-input
                    class="mb-2"
                    label="Sub Description"
                    placeholder="Enter Sub Description"
                    v-model="form.sub_description"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Is Text">
                      <b-form-checkbox-group
                        v-model="form.is_text"
                        id="checkboxes-4"
                        :aria-describedby="ariaDescribedby"
                      >
                        <b-form-checkbox value="1">Is Text</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Is Voice">
                      <b-form-checkbox-group
                        v-model="form.is_voice"
                        id="checkboxes-4"
                        :aria-describedby="ariaDescribedby"
                      >
                        <b-form-checkbox value="1">Is Voice</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Is Video">
                      <b-form-checkbox-group
                        v-model="form.is_video"
                        id="checkboxes-4"
                        :aria-describedby="ariaDescribedby"
                      >
                        <b-form-checkbox value="1">Is Video</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Option 1">
                  <b-form-input
                    class="mb-2"
                    label="Option 1"
                    placeholder="Enter Option 1"
                    v-model="form.option_1"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Option 2">
                  <b-form-input
                    class="mb-2"
                    label="Option 2"
                    placeholder="Enter Option 2"
                    v-model="form.option_2"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Option 3">
                  <b-form-input
                    class="mb-2"
                    label="Option 3"
                    placeholder="Enter Option 3"
                    v-model="form.option_3"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Option 4">
                  <b-form-input
                    class="mb-4"
                    label="Option 4"
                    placeholder="Enter Option 4"
                    v-model="form.option_4"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Option Image Path 1">
                  <a href="">{{ form.image_option_1 }}</a>
                  <b-form-file
                    name="option_imagepath1"
                    ref="file1"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Option Image Path 2">
                   <a target="_blank" :href="`${mediaUrl}${form.image_option_2}`">{{ form.image_option_2 }}</a>
                  <b-form-file
                    name="option_imagepath2"
                    ref="file2"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Option Image Path 3">
                  <a target="_blank" :href="`${mediaUrl}${form.image_option_3}`">{{ form.image_option_3 }}</a>
                  <b-form-file
                    name="option_imagepath3"
                    ref="file3"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Option Image Path 4">
                  <a target="_blank" :href="`${mediaUrl}${form.image_option_3}`">{{ form.image_option_3 }}</a>
                  <b-form-file
                    name="option_imagepath4"
                    ref="file4"
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
        description: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        is_active: "",
        is_mcq: "",
        sub_description: "",
        is_text: "",
        is_voice: "",
        is_video: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    form: {
      description: {
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
          await axios.patch(
            `/login_questions/${this.$route.params.id}`,
            this.form
          );
          this.handleFileUpload();
          this.isLoading = false;
          this.$router.push("/app/login-questions");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/login-questions/");
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
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/login_questions/${this.$route.params.id}`);
      this.form = form.data.data;

      // console.log(this.form.id);
      this.isLoading = false;
    },
    async handleFileUpload() {
      let attachment1 = this.$refs.file1?.files[0];
      let attachment2 = this.$refs.file2?.files[0];
      let attachment3 = this.$refs.file3?.files[0];
      let attachment4 = this.$refs.file4?.files[0];
      const login_question_id = this.$route.params.id;
      let formData = new FormData();
      formData.append("login_question_id", login_question_id);
      formData.append("image_option_1", attachment1);
      formData.append("image_option_2", attachment2);
      formData.append("image_option_3", attachment3);
      formData.append("image_option_4", attachment4);
      await axios
        .post("upload_login_questions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
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
