<template>
  <div class="main-content">
    <breadcumb :page="'Create FSC Inspection'" :folder="'FSC Inspections'" />
    <!-- Vessel Details card -->
    <b-card class="mb-4">
      <div class="content">
        <b-row>
          <b-col md="12">
            <b-button
              @click="$router.back()"
              class="pull-right"
              style="margin-top:-5px"
              variant="primary"
              ><i class="i-Arrow-Back-3"></i> BACK</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Serial No</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.serial_no }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Vessel Name</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.name }}
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
                    :max="max"
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
                <b-form-group label="No. Of Issued Deficiency">
                  <b-form-input
                    class="mb-2"
                    label="No. Of Issued Deficiency"
                    placeholder="Enter No. Of Issued Deficiency"
                    v-model.trim="$v.form.no_of_issued_deficiencies.$model"
                  >
                    <!-- @change="Deficiency(parseInt(form.no_of_closed_deficiencies))" -->
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_issued_deficiencies.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_issued_deficiencies.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="No. Of Closed Deficiency">
                  <b-form-input
                    class="mb-2"
                    label="No. Of Deficiency"
                    placeholder="Enter No. Of Deficiency"
                    @change="
                      Deficiency(parseInt(form.no_of_closed_deficiencies))
                    "
                    v-model.trim="$v.form.no_of_closed_deficiencies.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_closed_deficiencies.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.no_of_closed_deficiencies.numeric"
                    >Only Numeric Value</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Report">
                  <b-form-file
                    id="file-default"
                    name="report"
                    ref="report"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
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
              <b-col
                md="6"
                v-if="
                  form.no_of_issued_deficiencies ==
                    form.no_of_closed_deficiencies
                "
              >
                <b-form-group label="Are All Deficienies Closed">
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
            <div>
              <!-- v-if="
                form.is_deficiency_closed == 1 &&
                  form.no_of_issued_deficiencies ==
                    form.no_of_closed_deficiencies
              " -->
              <div
                v-for="(deficiency_detail, dd) in deficiency_details"
                :key="`deficiency_detail${dd}`"
              >
                <b-row>
                  <b-col md="6">
                    <b-row>
                      <b-col md="1">
                        <span> {{ dd + 1 }} </span>
                      </b-col>
                      <b-col md="11">
                        <b-form-group label="Date Of Closure">
                          <b-form-datepicker
                            :id="`date_of_closure${dd}`"
                            v-model="deficiency_detail.date_of_closure"
                            class="mb-2"
                            :max="max"
                            placeholder="Date Of Closure"
                          ></b-form-datepicker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Remarks">
                      <b-form-input
                        class="mb-2"
                        label="Remarks"
                        placeholder="Enter Remarks"
                        v-model.trim="deficiency_detail.details"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="3">
                    <b-row>
                      <b-col md="2"> </b-col>
                      <b-col md="10">
                        <b-form-group label="Evidence 1">
                          <b-form-file
                            :id="`evidence_a${dd}`"
                            name="evidence_a"
                            ref="evidence_a"
                          ></b-form-file>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="3">
                    <b-form-group label="Evidence 2">
                      <b-form-file
                        :id="`evidence_b${dd}`"
                        name="evidence_b"
                        ref="evidence_b"
                      ></b-form-file>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group label="Evidence 3">
                      <b-form-file
                        :id="`evidence_c${dd}`"
                        name="evidence_c"
                        ref="evidence_c"
                      ></b-form-file>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group label="Evidence 4">
                      <b-form-file
                        :id="`evidence_d${dd}`"
                        name="evidence_d"
                        ref="evidence_d"
                      ></b-form-file>
                    </b-form-group>
                  </b-col>
                </b-row>
                <br />
                <div class="divider">
                  <span></span>
                </div>
                <br />
              </div>
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
import { numeric, required } from "vuelidate/lib/validators";
// import { numeric, required, maxValue } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "FSC Inspection | Create",
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // const minDate = new Date(today);
    const maxDate = new Date(today);
    return {
      form: {
        vessel_id: "",
        date: "",
        no_of_closed_deficiencies: 0,
        // no_of_closed_deficiencies: {
        //  maxValue: maxValue(this.maxValue)
        // },
        is_detained: 0,
        is_deficiency_closed: 0,
        no_of_issued_deficiencies: 0,
        // deficiency_details:{},
      },
      maxValue: 3,
      max: maxDate,
      deficiency_details: [],
      // deficiency_count:0,
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
      no_of_closed_deficiencies: {
        required,
        numeric,
      },
      no_of_issued_deficiencies: {
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
    Deficiency(number) {
      let current_len = this.deficiency_details.length;
      if (current_len < number) {
        // Add
        console.log("add");
        for (let b = current_len; b < number; b++) {
          this.$set(this.deficiency_details, b, {
            D_id: b,
          });
        }
      } else {
        // Remove
        console.log("remove");
        for (let b = current_len; b >= number; b--) {
          this.deficiency_details.splice(b);
        }
      }
    },
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("fsc_inspections/masters");
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

      this.form.fsc_inspection_deficiencies = this.deficiency_details;
      if (this.selectedPort[0]) {
        this.form.port_id = this.selectedPort[0].id;
      }
      if (this.selectedCountry[0]) {
        this.form.country_id = this.selectedCountry[0].id;
      }
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          // console.log(this.form);
          let fsc_inspection = await axios.post(
            `/vessels/${this.$route.params.vessel_id}/fsc_inspections`,
            this.form
          );
          this.fsc_inspection = fsc_inspection.data.data;
          await this.handleFileUpload();
          this.isLoading = false;
          this.submitStatus = "OK";
          this.$router.push(
            `/app/vessels/${this.$route.params.vessel_id}/fsc-inspections/`
          );
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
    async handleFileUpload() {
      let reportpath = this.$refs.report.files[0];
      const fsc_inspection_id = this.fsc_inspection.id;
      let formData = new FormData();
      formData.append("fsc_inspection_id", fsc_inspection_id);
      formData.append("reportpath", reportpath);
      let evidence_count = 0;
      this.fsc_inspection.fsc_inspection_deficiencies.forEach((dd, index) => {
        let deficiency_id = dd.id;
        let d_id = "deficiency_id" + index;

        let evidencepath_A = this.$refs.evidence_a[index].files[0];
        let evidencepath_A_name = "evidencepath_A_" + index;
        let evidencepath_B = this.$refs.evidence_b[index].files[0];
        let evidencepath_B_name = "evidencepath_B_" + index;
        let evidencepath_C = this.$refs.evidence_c[index].files[0];
        let evidencepath_C_name = "evidencepath_C_" + index;
        let evidencepath_D = this.$refs.evidence_d[index].files[0];
        let evidencepath_D_name = "evidencepath_D_" + index;

        formData.append(d_id, deficiency_id);
        formData.append(evidencepath_A_name, evidencepath_A);
        formData.append(evidencepath_B_name, evidencepath_B);
        formData.append(evidencepath_C_name, evidencepath_C);
        formData.append(evidencepath_D_name, evidencepath_D);
        evidence_count++;
      });
      formData.append("evidence_count", evidence_count);
      await axios
        .post("upload_fsc_inspection_report", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    },
    inputSubmit() {
      console.log("submitted");
    },
  },
  computed: {
    deficiency_count() {
      let deficiency_count = parseInt(this.form.no_of_closed_deficiencies);
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
