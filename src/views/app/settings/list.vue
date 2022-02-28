<template>
  <div class="main-content">
    <breadcumb :page="'Settings'" :folder="'Settings'" />

    <b-row>
      <b-col md="12">
        <b-card title="Settings">
          <b-row>
            <b-col md="12">
              <b-button
                style="float: right; margin-top: -45px"
                @click="$router.back()"
                variant="primary"
                ><i class="i-Arrow-Back-3"></i>
                Back
              </b-button>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Logo Image">
                <b-form-file
                  id="logoImage"
                  name="logoImage"
                  ref="logoImage"
                  accept="image/*"
                ></b-form-file>
                <a target="_blank" :href="`${mediaUrl}${form.logo_path}`">
                  {{ form.logo_path }}
                </a>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Banner 1">
                <b-form-input
                  class="mb-2"
                  label="Title"
                  placeholder="Title"
                  v-model="form.banner_1_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label=".">
                <b-form-input
                  class="mb-2"
                  label="Description"
                  placeholder="Description"
                  v-model="form.banner_1_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Add Image">
                <b-form-file
                  id="bannerImage1"
                  name="bannerImage1"
                  ref="bannerImage1"
                  accept="image/*"
                ></b-form-file>
                <a target="_blank" :href="`${mediaUrl}${form.banner_path_1}`">
                  {{ form.banner_path_1 }}
                </a>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Banner 2">
                <b-form-input
                  class="mb-2"
                  label="Title"
                  placeholder="Title"
                  v-model="form.banner_2_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label=".">
                <b-form-input
                  class="mb-2"
                  label="Description"
                  placeholder="Description"
                  v-model="form.banner_2_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Add Image">
                <b-form-file
                  id="bannerImage2"
                  name="bannerImage2"
                  ref="bannerImage2"
                  accept="image/*"
                ></b-form-file>
                <a target="_blank" :href="`${mediaUrl}${form.banner_path_2}`">
                  {{ form.banner_path_2 }}
                </a>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Banner 3">
                <b-form-input
                  class="mb-2"
                  label="Title"
                  placeholder="Title"
                  v-model="form.banner_3_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label=".">
                <b-form-input
                  class="mb-2"
                  label="Description"
                  placeholder="Description"
                  v-model="form.banner_3_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Add Image">
                <b-form-file
                  id="bannerImage3"
                  name="bannerImage3"
                  ref="bannerImage3"
                  accept="image/*"
                ></b-form-file>
                <a target="_blank" :href="`${mediaUrl}${form.banner_path_3}`">
                  {{ form.banner_path_3 }}
                </a>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Intro Page Create Button Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.intro_p_create_b"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Intro Page Already Signin Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.intro_p_already_t"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Intro Page Signin Button Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.intro_p_signin_b"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Sign In By Phone Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.signinbyphone_b"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Terms Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.terms_t"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Privacy Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.privacy_t"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Sign In By Phone Title">
                <b-form-input
                  class="mb-2"
                  v-model="form.siginphone_p_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Sign In By Phone Description">
                <b-form-input
                  class="mb-2"
                  v-model="form.siginphone_p_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="OTP Page Title">
                <b-form-input
                  class="mb-2"
                  v-model="form.otp_p_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Gender Page Title">
                <b-form-input
                  class="mb-2"
                  v-model="form.gender_p_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Woman Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.woman_text"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Man Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.man_text"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Other Text">
                <b-form-input
                  class="mb-2"
                  v-model="form.other_text"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Gallery Page Title">
                <b-form-input
                  class="mb-2"
                  v-model="form.gallery_p_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Gallery Page Description">
                <b-form-input
                  class="mb-2"
                  v-model="form.gallery_p_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="4">
              <b-form-group label="Selfie Page Title">
                <b-form-input
                  class="mb-2"
                  v-model="form.selfie_p_title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Selfie Page Description">
                <b-form-input
                  class="mb-2"
                  v-model="form.selfie_p_description"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary" @click="updateSettings">
            Update
          </b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        banner_path_1: "",
        banner_1_title: "",
        banner_1_description: "",
        banner_path_2: "",
        banner_2_title: "",
        banner_2_description: "",
        banner_path_3: "",
        banner_3_title: "",
        banner_3_description: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async updateSettings() {
      try {
        this.isLoading = true;
        await axios.patch(`/settings/1`, this.form);
        await this.handleFileUpload();
        alert("Updated successfully");
      } catch (e) {
        this.isLoading = false;
      }
    },
    async getData() {
      this.isLoading = true;
      let form = await axios.get("/settings/1");
      this.form = form.data.data;
      console.log(this.form);
      this.isLoading = false;
    },
    async handleFileUpload() {
      let banner_path_1 = this.$refs.bannerImage1?.files[0];
      let banner_path_2 = this.$refs.bannerImage2?.files[0];
      let banner_path_3 = this.$refs.bannerImage3?.files[0];
      let logo_path = this.$refs.logoImage?.files[0];
      let formData = new FormData();
      formData.append("settingid", 1);
      formData.append("banner_path_1", banner_path_1);
      formData.append("banner_path_2", banner_path_2);
      formData.append("banner_path_3", banner_path_3);
      formData.append("logo_path", logo_path);
      await axios
        .post("upload_setting_banners", formData, {
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
