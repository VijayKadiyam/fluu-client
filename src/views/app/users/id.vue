<template>
  <div class="main-content">
    <breadcumb :page="'Update User'" :folder="'Users'" />

    <b-row>
      <b-col md="12">
        <b-card title="User">
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
            </b-row>
            <b-row>
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
            </b-row>
            <!-- <b-row>
              <b-col md="6">
                <a
                  :href="`${mediaUrl + form.selfie_image_path}`"
                  target="_blank"
                  >{{
                    mediaUrl + form.selfie_image_path
                      ? form.selfie_image_path
                      : ""
                  }}</a
                >
                <b-form-group label="Selfie">
                  <b-form-file
                    id="file-default"
                    name="selfie_image_path"
                    ref="selfie_image_path"
                    accept="image/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <a
                  :href="`${mediaUrl + form.gallery_image_path}`"
                  target="_blank"
                  >{{
                    mediaUrl + form.gallery_image_path
                      ? form.gallery_image_path
                      : ""
                  }}</a
                >
                <b-form-group label="Gallery">
                  <b-form-file
                    id="file-default1"
                    name="gallery_image_path"
                    ref="gallery_image_path"
                    accept="image/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row> -->
            <b-row>
              <b-col md="6">
                <a
                  :href="`${mediaUrl + form.voice_clip_path}`"
                  target="_blank"
                  >{{
                    mediaUrl + form.voice_clip_path ? form.voice_clip_path : ""
                  }}</a
                >

                <b-form-group label="Audio">
                  <b-form-file
                    id="file-default2"
                    name="voice_clip_path"
                    ref="voice_clip_path"
                    accept="audio/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Active">
                  <b-row>
                    <b-col md="8">
                      <span>IN ACTIVE</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.active"
                        /><span class="slider"></span>
                      </label>
                      <span>ACTIVE</span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="is Verified">
                  <b-row>
                    <b-col md="8">
                      <span>No </span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_verified"
                        /><span class="slider"></span>
                      </label>
                      <span>Yes</span>
                    </b-col>
                  </b-row>
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
          <hr />
          <h4>User Images</h4>
          <br />
          <b-row>
            <b-col md="4">
              <b-form-group label="Add Image">
                <b-form-file
                  id="file-default3"
                  name="image_path"
                  ref="image_path"
                  accept="image/*"
                ></b-form-file>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group label="Source">
                <select name="" id="" v-model="source">
                  <option value="">Select Source</option>
                  <option value="Gallery">Gallery</option>
                  <option value="Camera">Camera</option>
                  <option value="Profile">Profile</option>
                </select>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <br />
              <b-button @click="saveImage" variant="primary"> Save </b-button>
            </b-col>
          </b-row>

          <hr />
          <b-card>
            <vue-good-table
              :columns="imageColumns"
              :line-numbers="true"
              :search-options="{
                enabled: true,
                placeholder: 'Search this table',
              }"
              :pagination-options="{
                enabled: true,
                mode: 'records',
              }"
              styleClass="tableOne vgt-table"
              :rows="userImages"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <b-button
                    @click="deleteImage(props.row.id)"
                    variant="primary"
                  >
                    Delete
                  </b-button>
                </span>
                <span v-else-if="props.column.field == 'imagePath'">
                  <a
                    target="_blank"
                    :href="`${mediaUrl}${props.row.imagePath}`"
                  >
                    <img
                      :src="`${mediaUrl}${props.row.imagePath}`"
                      width="50"
                      height="50"
                    />
                  </a>
                </span>
              </template>
            </vue-good-table>
          </b-card>
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
      source: "",
      submitStatus: null,
      imageColumns: [
        {
          label: "Source",
          field: "source",
        },
        {
          label: "Image",
          field: "imagePath",
        },
        {
          label: "Actions",
          field: "action",
        },
      ],
      userImages: [],
    };
  },
  validations: {
    form: {
      first_name: {
        required,
      },
      // user_name: {
      //   required,
      // },
      email: {
        required,
        email,
      },
    },
  },
  mounted() {
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
      let selfie_image_path = this.$refs.selfie_image_path?.files[0];
      let gallery_image_path = this.$refs.gallery_image_path?.files[0];
      let voice_clip_path = this.$refs.voice_clip_path?.files[0];
      const userid = this.form.id;
      let formData = new FormData();
      formData.append("userid", userid);
      formData.append("selfie_image_path", selfie_image_path);
      formData.append("gallery_image_path", gallery_image_path);
      formData.append("voice_clip_path", voice_clip_path);
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
      this.userImages = [];
      this.form.user_images.forEach((userImage) => {
        this.userImages.push({
          id: userImage.id,
          source: userImage.source,
          imagePath: userImage.image_path,
        });
      });
      this.isLoading = false;
    },
    async saveImage() {
      let image_path = this.$refs.image_path?.files[0];
      const userid = this.form.id;
      let formData = new FormData();
      formData.append("userid", userid);
      formData.append("source", this.source);
      formData.append("image_path", image_path);
      await axios
        .post("upload_user_images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {})
        .catch(function () {
          console.log("FAILURE!!");
        });
      this.getData();
    },
    async deleteImage(imageId) {
      await axios.delete(`/user_images/${imageId}`);
      this.getData();
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
