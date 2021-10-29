<template>
  <div class="main-content">
    <breadcumb
      :page="'Create User Program Post'"
      :folder="'User Program Posts'"
    />
    <!-- User & Program Details card -->
    <b-row>
      <b-col md="6">
        <b-card class="mb-4">
          <div class="content">
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">User Name</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-24 line-height-1 mb-2">
                  {{ userdata.user_name }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">First Name</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-24 line-height-1 mb-2">
                  {{ userdata.first_name }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Email</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-24 line-height-1 mb-2">
                  {{ userdata.email }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Phone</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-24 line-height-1 mb-2">
                  {{ userdata.phone }}
                </p>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
      <b-col md="6">
        <b-card class="mb-4">
          <div class="content">
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Program Name</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-20 line-height-1 mb-0">
                  {{ programdata.program_name }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Program Description</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-20 line-height-1 mb-0">
                  {{ programdata.program_description }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Instructor</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-20 line-height-1 mb-0">
                  {{ programdata.instructor }}
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="3">
                <p class="text-muted mt-2 mb-0">Hours</p>
              </b-col>
              <b-col md="9">
                <p class="text-primary text-20 line-height-1 mb-0">
                  {{ programdata.hours }}
                </p>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <!-- /User & Program Details card -->
    <b-row class="justify-content-md-center">
      <b-col md="12">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col md="6">
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
              </b-col>
              <b-col md="6">
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
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Program Post">
                  <vue-tags-input
                    v-model="searchProgramPost"
                    :tags="selectedProgramPost"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredProgramPostItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedProgramPost = newTags)"
                    placeholder="Type Program Post Name"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Promotion Date">
                  <b-form-datepicker
                    id="promotion_date"
                    v-model="$v.form.promotion_date.$model"
                    class="mb-2"
                  ></b-form-datepicker>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.promotion_date.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Remarks">
                  <b-form-textarea
                    id="textarea"
                    v-model="form.remarks"
                    placeholder="Remarks"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
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
    title: "Create User Program Post",
  },
  data() {
    return {
      form: {
        promotion_date: "",
      },
      submitStatus: null,
      //   auto complete
      searchUser: "",
      selectedUser: [],
      userItems: [],

      searchProgram: "",
      selectedProgram: [],
      programItems: [],

      searchProgramPost: "",
      selectedProgramPost: [],
      program_postItems: [],

      userdata: {},
      programdata: {},
    };
  },
  watch: {
    selectedUser: "searchSelectedUser",
    selectedProgram: "searchSelectedProgram",
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
    filteredProgramPostItems() {
      return this.program_postItems.filter((a) => {
        return (
          a.text.toLowerCase().indexOf(this.searchProgramPost.toLowerCase()) !==
          -1
        );
      });
    },
  },
  validations: {
    form: {
      promotion_date: {
        required,
      },
    },
  },

  mounted() {
    this.form.site_id = this.site.id;
    this.getMasters();
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("user_program_posts/masters");
      masters = masters.data;
      this.users = masters.users;
      this.programs = masters.programs;
      this.program_posts = masters.program_posts;
      // User
      this.users.forEach((user) => {
        this.userItems.push({
          id: user.id,
          text: user.user_name,
        });
      });

      // Programs
      this.programs.forEach((program) => {
        this.programItems.push({
          id: program.id,
          text: program.program_name,
        });
      });
      this.isLoading = false;
    },
    async searchSelectedUser() {
      if (this.selectedUser.length > 0) {
        this.user_id = this.selectedUser[0].id;
        this.userdata = this.users.find((sp) => sp.id == this.user_id);
      } else {
        this.userdata = "";
      }
    },
    async searchSelectedProgram() {
      if (this.selectedProgram.length > 0) {
        this.program_id = this.selectedProgram[0].id;
        this.programdata = this.programs.find((sp) => sp.id == this.program_id);
        let program_posts = await axios.get(
          `/programs/${this.program_id}/program_posts`
        );
        this.program_posts = program_posts.data.data;
        this.program_posts.forEach((programpost) => {
          this.program_postItems.push({
            id: programpost.id,
            text: programpost.post.description,
          });
        });
      } else {
        // console.log('clean all');
        this.programdata = "";
        this.program_posts = [];
        this.program_postItems = [];
        this.selectedProgramPost=[];
      }
    },
    //   validate form
    async submit() {
      console.log("submit!");
      this.form.user_id = this.selectedUser[0].id;
      this.form.program_id = this.selectedProgram[0].id;
      this.form.program_post_id = this.selectedProgramPost[0].id;
      // this.form.program_post_id = 1;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          // console.log(this.form);
          await axios.post("/user_program_posts", this.form);
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
            this.$router.push("/app/user-program-posts/");
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
