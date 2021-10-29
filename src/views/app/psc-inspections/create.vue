<template>
  <div class="main-content">
    <breadcumb :page="'Create PSC Inspection'" :folder="'PSC Inspections'" />
    <!-- Vessel Details card -->
    <b-card class="mb-4">
      <div class="content">
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Vessel Name</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.vessel_name }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Serial No</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.serial_no }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">IMO No</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.imo_no }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Type</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.vessel_type.description }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- /Vessel Details card -->
    <b-row>
      <b-col md="12">
        <b-card>
          <b-form @submit.prevent="submit">
            <b-row>
              <b-col md="6">
                <b-form-group label="Port">
                  <vue-tags-input
                    v-model="searchPort"
                    :tags="selectedPort"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredPortItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedPort = newTags)"
                    placeholder="Type Port"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Country">
                  <vue-tags-input
                    v-model="searchCountry"
                    :tags="selectedCountry"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredCountryItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedCountry = newTags)"
                    placeholder="Type Country"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Deficiency">
                  <vue-tags-input
                    v-model="searchDeficiency"
                    :tags="selectedDeficiency"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredDeficiencyItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedDeficiency = newTags)"
                    placeholder="Type Deficiency"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Is Detained">
                  <b-row>
                    <b-col md="8">
                      <span>Yes</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_detained"
                        /><span class="slider"></span>
                      </label>
                      <span>No</span>
                    </b-col>
                  </b-row>
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
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.date.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Report">
                  <b-form-file
                    id="file-default"
                    name="report"
                    ref="file"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Is Deficiency Closed">
                  <b-row>
                    <b-col md="8">
                      <span>Yes</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_deficiency_closed"
                        /><span class="slider"></span>
                      </label>
                      <span>No</span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col md="6" v-if="form.is_deficiency_closed == 0">
                <b-form-group label="Date Of Closure">
                  <b-form-datepicker
                    id="date"
                    v-model="form.date_of_closure"
                    class="mb-2"
                    placeholder="Date Of Closure"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Evidence">
                  <b-form-file
                    id="file-default"
                    name="report"
                    ref="file"
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
    title: "PSC Inspection | Create",
  },
  data() {
    return {
      form: {
        vessel_id: "",
        date: "",
        is_detained: "",
        is_deficiency_closed: "",
        date_of_closure: "",
      },
      searchPort: "",
      selectedPort: [],
      PortItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],
      searchDeficiency: "",
      selectedDeficiency: [],
      DeficiencyItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

      searchCountry: "",
      selectedCountry: [],
      countryItems: [
        {
          text: "China",
        },
        {
          text: "Japan",
        },
        {
          text: "India",
        },
        {
          text: "Hongkong",
        },
        {
          text: "Siveria",
        },
        {
          text: "Dubai",
        },
        {
          text: "Russia",
        },
      ],

      submitStatus: null,
      vessel: {
        id: "1",
        serial_no: "123",
        vessel_name: "Vessel 1",
        imo_no: "6781230",
        built_date: "05-08-1865",
        dwt: "120000",
        remark: "Remarks",
        management_in_date: "05-04-1965",
        management_out_date: "25-08-1997",
        deck_officier: "25",
        engine_officier: "85",
        deck_rating: "",
        engine_rating: "",
        galley_rating: "",
        vessel_type_id: "1",
        vessel_type: {
          id: 1,
          description: "Oil Tanker",
        },
        built_place_id: 1,
        built_place: {
          id: 1,
          name: "India",
        },
      },
    };
  },
  validations: {
    form: {
      date: {
        required,
      },
    },
  },
  mounted() {
    // this.form.program_id = this.$route.params.program_id;
    // this.form.site_id = this.site.id;
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
  computed: {
    filteredPortItems() {
      return this.PortItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchPort.toLowerCase()) !== -1
        );
      });
    },
    filteredCountryItems() {
      return this.countryItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchCountry.toLowerCase()) !== -1
        );
      });
    },
    filteredDeficiencyItems() {
      return this.DeficiencyItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchDeficiency.toLowerCase()) !==
          -1
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
