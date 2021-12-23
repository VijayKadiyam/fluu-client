<template>
  <div class="main-content">
    <breadcumb :page="'Create User Notification'" :folder="'User notifications'" />

    <b-row>
      <b-col md="12">
        <b-card title="User notification">
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
                <b-form-group label="Select Notification">
                  <vue-tags-input
                    v-model="searchNotification"
                    :tags="selectedNotification"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredNotificationItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="
                      (newTags) => (selectedNotification = newTags)
                    "
                    placeholder="Type Notification Name"
                  />
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
    title: "User Create",
  },
  data() {
    return {
      form: {
        user_id: "",
        notification_id: "",
        is_active: 1,
      },
      searchUser: "",
      selectedUser: [],
      userItems: [],
      searchNotification: "",
      selectedNotification: [],
      userNotificationItems: [],
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
    this.form.site_id = this.site.id;
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
          if (this.selectedNotification[0]) {
            this.form.notification_id = this.selectedNotification[0].id;
          }
          this.current_user = await axios.post(
            "/user_notifications",
            this.form
          );
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/user-notifications");
        // }, 1000);
      }
    },
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("user_notifications/masters");
      masters = masters.data;
      masters.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.first_name,
        });
      });
      masters.notifications.forEach((notification) => {
        this.userNotificationItems.push({
          id: notification.id,
          text: notification.description,
        });
      });
      this.isLoading = false;
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Please fill the form correctly.", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    makeToastTwo(variant = null) {
      // this.save();
      this.$bvToast.toast("Successfully Submitted", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    inputSubmit() {
      // this.save();
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
    filteredNotificationItems() {
      return this.userNotificationItems.filter((c) => {
        return (
          c.text
            .toLowerCase()
            .indexOf(this.searchNotification.toLowerCase()) !== -1
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
