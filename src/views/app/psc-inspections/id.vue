<template>
  <div class="main-content">
    <breadcumb :page="'Update PSC Inspection'" :folder="'PSC Inspections'" />
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
                    @change="Deficiency(parseInt(form.no_of_deficiencies))"
                    v-model.trim="$v.form.no_of_deficiencies.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_deficiencies.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_deficiencies.numeric"
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
            <div v-if="form.is_deficiency_closed == 1">
              <b-row
                v-for="(deficiency_detail, dd) in deficiency_details"
                :key="`deficiency_detail${dd}`"
              >
                <b-col md="4">
                  <b-form-group label="Date Of Closure">
                    <b-form-datepicker
                      :id="`date_of_closure${dd}`"
                      v-model="deficiency_detail.date_of_closure"
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
                      v-model.trim="deficiency_detail.details"
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
            </div>
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
import { required, numeric } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "PSC Inspection | Update",
  },
  data() {
    return {
      form: {
        vessel_id: "",
        date: "",
        no_of_deficiencies: 0,
        is_detained: 0,
        is_deficiency_closed: 0,
      },
      deficiency_details: [
        {
          date_of_closure: "",
          details: "",
        },
      ],
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
      no_of_deficiencies: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.form.vessel_id = this.$route.params.vessel_id;
    this.form.site_id = this.site.id;
    this.getData();
    this.getMasters();
  },

  methods: {
    Deficiency(number) {
      let current_len = this.deficiency_details.length;
      console.log(current_len);
      console.log(number);
      if (current_len < number) {
        // Add
        for (let b = current_len; b < number; b++) {
          this.$set(this.deficiency_details, b, {
            id: b,
          });
        }
      } else {
        // Remove
        console.log("remove");
        for (let b = current_len; b >= number; b--) {
          this.deficiency_details.splice(b);
        }
      }

      console.log(this.deficiency_details);
    },
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
      let form = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/psc_inspections/${this.$route.params.id}`
      );
      this.form = form.data.data;
      this.port = this.form.port;
      this.country = this.form.country;
      this.deficiency_details = this.form.psc_inspection_deficiencies;
      this.selectedPort.push({
        id: this.port.id,
        text: this.port.description,
      });

      this.selectedCountry.push({
        id: this.country.id,
        text: this.country.description,
      });

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      this.isLoading = false;
    },
    //   validate form
    async submit() {
      console.log("submit!");
this.form.psc_inspection_deficiencies = this.deficiency_details;
if (this.selectedPort[0]) {
        this.form.port_id = this.selectedPort[0].id;
      }
      if (this.selectedCountry[0]) {
        this.form.country_id = this.selectedCountry[0].id;
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          console.log(this.form);
          await axios.post(
            `/vessels/${this.$route.params.vessel_id}/psc_inspections/${this.$route.params.id}`,
            this.form
          );
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
          this.$router.push(
            `/app/vessels/${this.$route.params.vessel_id}/psc-inspections/`
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
    deficiency_count() {
      let deficiency_count = parseInt(this.form.no_of_deficiencies);
      return deficiency_count;
    },
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
