<template>
  <div class="main-content">
    <breadcumb
      :page="'Create User Login Question'"
      :folder="'User Login Questions'"
    />

    <b-row>
      <b-col md="12">
        <b-card title="User Login Question">
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
                <b-form-group label="Select User Login Question">
                  <vue-tags-input
                    v-model="searchUserLoginQuestion"
                    :tags="selectedUserLoginQuestion"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredUserLoginQuestionItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="
                      (newTags) => (selectedUserLoginQuestion = newTags)
                    "
                    placeholder="Type User Login Question"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Answer">
                  <b-form-input
                    class="mb-2"
                    label="Answer"
                    placeholder="Enter Answer"
                    v-model="form.answer"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Selected Option">
                  <b-form-input
                    class="mb-2"
                    label="Selected Option"
                    placeholder="Enter Selected Option"
                    v-model="form.selected_option"
                  >
                  </b-form-input>
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
// import {
//   email,
//   // numeric,
//   // between,
//   required,
//   // sameAs,
//   // minLength,
//   // maxLength,
// } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Login Question Update",
  },
  data() {
    return {
      form: {
        user_id: "",
        login_question_id: "",
        answer: "",
        selected_option: "",
      },
      submitStatus: null,
      searchUser: "",
      selectedUser: [],
      userItems: [],
      searchUserLoginQuestion: "",
      selectedUserLoginQuestion: [],
      userLoginQuestionItems: [],
    };
  },
  validations: {
    //   form: {
    //     first_name: {
    //       required,
    //     },
    //     // user_name: {
    //     //   required,
    //     // },
    //     email: {
    //       required,
    //       email,
    //     },
  },

  //   // add input
  //   // peopleAdd: {
  //   //   required,
  //   //   minLength: minLength(3),
  //   //   $each: {
  //   //     multipleFirst Name: {
  //   //       required,
  //   //       minLength: minLength(5)
  //   //     }
  //   //   }
  //   // },
  //   // validationsGroup:['peopleAdd.multipleFirst Name']
  // },
  mounted() {
    // this.form.site_id = this.site.id
    this.getData();
    this.getMasters();
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("user_login_questions/masters");
      masters = masters.data;
      masters.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.first_name,
        });
      });
      // console.log(this.userItems);
      masters.login_questions.forEach((ulq) => {
        this.userLoginQuestionItems.push({
          id: ulq.id,
          text: ulq.description,
        });
      });
      this.isLoading = false;
    },
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
          if (this.selectedUserLoginQuestion[0]) {
            this.form.login_question_id = this.selectedUserLoginQuestion[0].id;
          }
          await axios.patch(
            `/user_login_questions/${this.$route.params.id}`,
            this.form
          );

          this.isLoading = false;
          this.$router.push("/app/user-login-questions");
        } catch (e) {
          this.isLoading = false;
        }
        this.submitStatus = "PENDING";
        // setTimeout(() => {
        this.submitStatus = "OK";
        this.$router.push("/app/user-login-questions/");
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
      let form = await axios.get(
        `/user_login_questions/${this.$route.params.id}`
      );
      this.form = form.data.data[0];
      this.users = this.form.user;
      this.login_question = this.form.login_question;
      console.log(this.login_question);
      this.selectedUser.push({
        id: this.users.id,
        text: this.users.first_name,
      });
      this.selectedUserLoginQuestion.push({
        id: this.login_question.id,
        text: this.login_question.description,
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
    filteredUserLoginQuestionItems() {
      return this.userLoginQuestionItems.filter((c) => {
        return (
          c.text
            .toLowerCase()
            .indexOf(this.searchUserLoginQuestion.toLowerCase()) !== -1
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
