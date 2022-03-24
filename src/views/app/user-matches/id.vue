<template>
  <div class="main-content">
    <breadcumb :page="'Create User Match'" :folder="'User Matches'" />

    <b-row>
      <b-col md="12">
        <b-card title="User Match">
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
                <b-form-group label="Select Matched User">
                  <vue-tags-input
                    v-model="searchMatchedUser"
                    :tags="selectedMatchedUser"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredMatchedUserItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedMatchedUser = newTags)"
                    placeholder="Type Matched User Name"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
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
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Match Update",
  },
  data() {
    return {
      form: {
        user_id: "",
        matched_user_id: "",
        date:""
      },
      submitStatus: null,
      searchUser: "",
      selectedUser: [],
      searchMatchedUser: "",
      selectedMatchedUser: [],
      userItems: [],
    };
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

        try {
          this.isLoading = true;
          if (this.selectedUser[0]) {
            this.form.user_id = this.selectedUser[0].id;
          }
          if (this.selectedMatchedUser[0]) {
            this.form.matched_user_id = this.selectedMatchedUser[0].id;
          }
          await axios.patch(`/user_matches/${this.$route.params.id}`, this.form);

          this.isLoading = false;
          this.$router.push("/app/user-matches");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
          this.submitStatus = "OK";
          this.$router.push("/app/user-matches/");
        // }, 1000);
    },
    async getMasters() {
      this.isLoading = true;
       
      let masters = await axios.get("user_matches/masters");
      masters = masters.data;
      masters.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.first_name,
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
      let form = await axios.get(`/user_matches/${this.$route.params.id}`);
      this.form = form.data.data;
      this.matched_user = this.form.matched_user;
      this.selectedUser.push({
        id: this.form.user.id,
        text: this.form.user.first_name,
      });
      this.selectedMatchedUser.push({
        id: this.matched_user.id,
        text: this.matched_user.first_name,
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
    filteredMatchedUserItems() {
      return this.userItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchMatchedUser.toLowerCase()) !== -1
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
