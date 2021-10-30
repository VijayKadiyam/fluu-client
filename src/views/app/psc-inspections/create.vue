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
              {{ vessel.name }}
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
              <b-col md="4">
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
              <b-col md="4">
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
              <b-col md="4">
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
              <b-col md="4">
                <b-form-group label="No. Of Deficiency">
                  <b-form-input
                    class="mb-2"
                    label="No. Of Deficiency"
                    placeholder="Enter No. Of Deficiency"
                    v-model.trim="$v.form.no_of_deficiency.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_deficiency.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_deficiency.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Is Detained">
                  <b-row>
                    <b-col md="8">
                      <span>No</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_detained"
                        /><span class="slider"></span>
                      </label>
                      <span>Yes</span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col md="4">
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
                <b-form-group label="Is Deficieny Closed">
                  <b-row>
                    <b-col md="8">
                      <span>No</span>
                      <label class="switch switch-success mr-3 ml-3">
                        <input
                          type="checkbox"
                          checked="checkbox"
                          v-model="form.is_deficiency_closed"
                        /><span class="slider"></span>
                      </label>
                      <span>Yes</span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="form.is_deficiency_closed == 1">
              <b-col md="4">
                <b-form-group label="Date Of Closure">
                  <b-form-datepicker
                    id="date"
                    v-model="form.date_of_closure"
                    class="mb-2"
                    placeholder="Date Of Closure"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Details">
                  <b-form-input
                    class="mb-2"
                    label="Details"
                    placeholder="Enter Details"
                    v-model.trim="form.details"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="4">
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
import { numeric, required } from "vuelidate/lib/validators";
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
        no_of_deficiency: "",
        is_detained: 0,
        is_deficiency_closed: 0,
        date_of_closure: "",
      },
      portItems: [],
      searchPort: "",
      selectedPort: [],

      searchCountry: "",
      selectedCountry: [],
      countryItems: [],

      submitStatus: null,
      vessel: {},
    };
  },
  validations: {
    form: {
      date: {
        required,
      },
      no_of_deficiency: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.form.vessel_id = this.vessel.id;
    this.form.site_id = this.site.id;
    this.getMasters();
    this.getData();
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("psc_inspections/masters");
      masters = masters.data;
      masters.ports.forEach((port) => {
        this.portItems.push({
          id: port.id,
          text: port.description,
        });
      });

      masters.countries.forEach((country) => {
        this.countryItems.push({
          id: country.id,
          text: country.description,
        });
      });
      this.isLoading = false;
    },
    async getData() {
      this.isLoading = true;
      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
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
      return this.portItems.filter((c) => {
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
  },
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
