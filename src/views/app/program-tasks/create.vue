<template>
  <div class="main-content">
    <breadcumb :page="'Create Program Task'" :folder="'Program Tasks'" />
    <!-- Program Details card -->
    <b-card class="mb-4">
      <div class="content">
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Program Name</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ program.program_name }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Program Description</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ program.program_description }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Instructor</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ program.instructor }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Hours</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ program.hours }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- /Program Details card -->
    <b-row>
      <b-col md="12">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col md="6">
                <b-form-group label="Serial Number">
                  <b-form-input
                    class="mb-2"
                    label="Serial Number"
                    placeholder="Enter Serial Number"
                    v-model.trim="$v.form.serial_no.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.serial_no.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.serial_no.numeric"
                    >Numeric Values Only</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Task">
                  <b-form-input
                    class="mb-2"
                    label="Task"
                    placeholder="Enter Task"
                    v-model.trim="$v.form.task.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.task.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Objective">
                  <b-form-input
                    class="mb-2"
                    label="Objective"
                    placeholder="Enter Objective"
                    v-model.trim="$v.form.objective.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.objective.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Material">
                  <b-form-input
                    class="mb-2"
                    label="Material"
                    placeholder="Enter Material"
                    v-model.trim="$v.form.material.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.material.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Process">
                  <b-form-input
                    class="mb-2"
                    label="Process"
                    placeholder="Enter Process"
                    v-model.trim="$v.form.process.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.process.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="No Of Contracts">
                  <b-form-input
                    class="mb-2"
                    label="No Of Contracts"
                    placeholder="Enter No Of Contracts"
                    v-model.trim="$v.form.no_of_contracts.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_contracts.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_contracts.numeric"
                    >Numeric Values Only</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Time Required">
                  <b-form-input
                    class="mb-2"
                    label="Time Required"
                    placeholder="Enter Time Required"
                    v-model.trim="$v.form.time_required.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.time_required.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.time_required.numeric"
                    >Numeric Values Only</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Total Marks">
                  <b-form-input
                    class="mb-2"
                    label="Total Marks"
                    placeholder="Enter Total Marks"
                    v-model.trim="$v.form.total_marks.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.total_marks.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.total_marks.numeric"
                    >Numeric Values Only</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Passing Marks">
                  <b-form-input
                    class="mb-2"
                    label="Passing Marks"
                    v-model.trim="$v.form.passing_marks.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.passing_marks.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.passing_marks.numeric"
                    >Numeric Values Only</b-alert
                  >
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
  numeric,
  required,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Program Task | Create",
  },
  data() {
    return {
      form: {
        program_id: "",
        serial_no: "",
        task: "",
        objective: "",
        material: "",
        process: "",
        no_of_contracts: "",
        time_required: "",
        total_marks: "",
        passing_marks: "",
      },
      submitStatus: null,
      program: [],
    };
  },
  validations: {
    form: {
      serial_no: {
        required,
        numeric,
      },
      task: {
        required,
      },
      objective: {
        required,
      },
      material: {
        required,
      },
      process: {
        required,
      },
      no_of_contracts: {
        required,
        numeric,
      },
      time_required: {
        required,
        numeric,
      },
      total_marks: {
        required,
        numeric,
      },
      passing_marks: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.form.program_id = this.$route.params.program_id;
    this.form.site_id = this.site.id;
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let program = await axios.get(
        `/programs/${this.$route.params.program_id}`
      );
      this.program = program.data.data;
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          console.log(this.form);
          await axios.post(
            `/programs/${this.$route.params.program_id}/program_tasks`,
            this.form
          );
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
            this.$router.push(
              `/app/programs/${this.$route.params.program_id}/program-tasks/`
            );
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
