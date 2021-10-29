<template>
  <div class="main-content">
    <breadcumb :page="'Update User Program'" :folder="'User Programs'" />

    <b-row class="justify-content-md-center">
      <b-col md="9">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-form-group label="User">
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
            <b-form-group label="Program">
              <vue-tags-input
                v-model="searchProgram"
                :tags="selectedProgram"
                :max-tags="1"
                class="tag-custom text-15 mb-2"
                :autocomplete-items="filteredProgramItems"
                :add-only-from-autocomplete="true"
                @tags-changed="(newTags) => (selectedProgram = newTags)"
                placeholder="Type Program Name"
              />
            </b-form-group>

            <b-form-group label="Enrollment Date">
              <b-form-datepicker
                id="enrollment_date"
                v-model.trim="$v.form.enrollment_date.$model"
                class="mb-2"
              ></b-form-datepicker>
              <b-alert
                show
                variant="danger"
                class="error mt-1"
                v-if="!$v.form.enrollment_date.required"
                >Field is required</b-alert
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
import axios from "axios";
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "User Program | Update",
  },
  data() {
    return {
      form: {
        enrollment_date: "",
      },
      submitStatus: null,
      //   auto complete
      searchUser: "",
      selectedUser: [],
      userItems: [],

      searchProgram: "",
      selectedProgram: [],
      programItems: [],
    };
  },
  computed: {
    filteredUserItems() {
      return this.userItems.filter((u) => {
        return (
          u.text.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1
        );
      });
    },
    filteredProgramItems() {
      return this.programItems.filter((p) => {
        return (
          p.text.toLowerCase().indexOf(this.searchProgram.toLowerCase()) !== -1
        );
      });
    },
  },
  validations: {
    form: {
      enrollment_date: {
        required,
      },
    },
  },
  mounted() {
    this.form.site_id = this.site.id;
    this.getMasters();
    this.getData();
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("user_programs/masters");
      masters = masters.data;
      masters.programs.forEach((program) => {
        this.programItems.push({
          id: program.id,
          text: program.program_name,
        });
      });

      masters.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.user_name,
        });
      });
      this.isLoading = false;
    },
    async getData() {
      this.isLoading = true;
      let form = await axios.get(`/user_programs/${this.$route.params.id}`);
      this.form = form.data.data;
      this.selectedUser.push({
        id: this.form.user.id,
        text: this.form.user.user_name,
      });
      this.selectedProgram.push({
        id: this.form.program.id,
        text: this.form.program.program_name,
      });
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");
      this.form.user_id = this.selectedUser[0].id;
      this.form.program_id = this.selectedProgram[0].id;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          console.log(this.form);
          await axios.patch(
            `/user_programs/${this.$route.params.id}`,
            this.form
          );
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
            this.$router.push("/app/user-programs/");
          // }, 1000);
        } catch (e) {
          this.isLoading = false;
        }
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
  },
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
