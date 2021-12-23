<template>
  <div class="main-content">
    <breadcumb :page="'Create User Story'" :folder="'User Stories'" />

    <b-row>
      <b-col md="12">
        <b-card title="User Story">
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
                <b-form-group label="Select User">
                  <vue-tags-input
                    v-model="searchUser"
                    :tags="selectedUser"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredUserItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedUser = newTags)"
                    placeholder="Type User Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Date">
                  <b-form-datepicker
                    id="date"
                    v-model="form.date"
                    class="mb-2"
                    placeholder="Date"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Image">
                  <b-form-file
                    id="file-default"
                    name="image_path"
                    ref="image_path"
                    accept="image/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Video">
                  <b-form-file
                    id="file-default1"
                    name="video_path"
                    ref="video_path"
                    accept="video/*"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Active">
                  <b-row>
                    <b-col md="8">
                      <span>InActive</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_active"
                        /><span class="slider"></span>
                      </label>
                      <span>Active</span>
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
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import {
  // email,
  // numeric,
  // between,
  // required,
  // sameAs,
  // minLength,
  // maxLength,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Story Update",
  },
  data() {
    return {
      form: {
        user_id: "",
        date: "",
        image_path: "",
        video_path: "",
        is_active: 1,
      },
       searchUser: "",
      selectedUser: [],
      userItems: [],
      submitStatus: null,
    };
  },
  validations: {
    form: {
      // first_name: {
      //   required,
      // },
      // user_name: {
      //   required,
      // },
      // email: {
      //   required,
      //   email,
      // },
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
    this.form.site_id = this.site.id
    this.getData();
    this.getMasters();

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
          if (this.selectedUser[0]) {
            this.form.user_id = this.selectedUser[0].id;
          }
          await axios.patch(`/user_stories/${this.$route.params.id}`, this.form);
          await this.handleFileUpload();

          this.isLoading = false;
          this.$router.push("/app/user-stories");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
          this.submitStatus = "OK";
          this.$router.push("/app/user-stories/");
        // }, 1000);
      }
    },
    async getMasters() {
      this.isLoading = true;
       
      let masters = await axios.get("user_stories/masters");
      masters = masters.data;
      masters.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.first_name,
        });
      });
      
      this.isLoading = false;
    },
    async handleFileUpload() {
      let image_path = this.$refs.image_path?.files[0];
      let video_path = this.$refs.video_path?.files[0];
      const userid = this.form.id;
      let formData = new FormData();
      formData.append("userid", userid);
      formData.append("image_path", image_path);
      formData.append("video_path", video_path);
      await axios
        .post("upload_user_story", formData, {
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
      let form = await axios.get(`/user_stories/${this.$route.params.id}`);
      this.form = form.data.data[0];
      this.users = this.form.user;
      this.selectedUser.push({
        id: this.users.id,
        text: this.users.first_name,
      });
      this.isLoading = false;
    },
  },
  computed: {
    filteredUserItems() {
      return this.userItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1
        );
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
