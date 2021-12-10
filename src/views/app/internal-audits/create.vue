<template>
  <div class="main-content">
    <breadcumb :page="'Create Internal Audit'" :folder="'Internal Audits'" />
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
              <b-col md="6">
                <b-form-group label="Type Of Audit">
                  <b-form-select
                    v-model="form.audit_type_id"
                    :options="auditTypeItems"
                    id="inline-form-custom-select-pref1"
                  >
                  </b-form-select>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.audit_type_id.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6" v-if="DefineAuditType(form.audit_type_id)">
                <b-form-group label="Other Audit Type">
                  <b-form-input
                    class="mb-2 other"
                    label="Other Audit Type"
                    id="Other-type"
                    placeholder="Enter Other Audit Type "
                    v-model="form.other_audit_type"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group label="Start Date">
                  <b-form-datepicker
                    id="start_date"
                    v-model="form.start_date"
                    class="mb-2"
                    :max="max"
                    placeholder="Start Date"
                  ></b-form-datepicker>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.start_date.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Completion Date">
                  <b-form-datepicker
                    id="completion_date"
                    v-model="form.completion_date"
                    class="mb-2"
                    :max="max"
                    :min="form.start_date"
                    placeholder="Completion Date"
                  ></b-form-datepicker>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.completion_date.required"
                    >Field is required</b-alert
                  >
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
              <b-col md="6">
                <b-form-group label="Enter Location">
                  <b-form-select
                    v-model="form.location"
                    :options="LocationItems"
                    class="mb-2"
                    id="inline-form-custom-select-pref1"
                  >
                  </b-form-select>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.location.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6" v-if="form.location != 1">
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
              <b-col md="6" v-else>
                <b-row>
                  <b-col md="6">
                    <b-form-group label="From">
                      <b-form-input
                        class="mb-2"
                        label="from"
                        placeholder="Enter from"
                        v-model.trim="form.from"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="To">
                      <b-form-input
                        class="mb-2"
                        label="To"
                        placeholder="Enter To"
                        v-model.trim="form.to"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="No. Of Issued Deficiency">
                  <b-form-input
                    class="mb-2"
                    label="No. Of Issued Deficiency"
                    placeholder="Enter No. Of Issued Deficiency"
                    v-model.trim="$v.form.no_of_issued_deficiencies.$model"
                    @change="
                      Deficiency(parseInt(form.no_of_issued_deficiencies))
                    "
                  >
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
              <!-- <b-col md="4">
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
              </b-col> -->
              <b-col md="6">
                <b-form-group label="Report">
                  <b-form-file
                    id="file-default"
                    name="report"
                    ref="report"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- <b-row>
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
            </b-row> -->
              <div
                v-for="(deficiency_detail, dd) in deficiency_details"
                :key="`deficiency_detail${dd}`"
              >
                <b-row>
                  <b-col md="4">
                    <b-row>
                      <b-col md="1">
                        <span> {{ dd + 1 }} </span>
                      </b-col>
                      <b-col md="11">
                        <b-form-group label="Date Of Issued">
                          <b-form-datepicker
                            :id="`issued_date${dd}`"
                            v-model="deficiency_detail.issued_date"
                            class="mb-2"
                            :max="max"
                            placeholder="Date Of Issued"
                          ></b-form-datepicker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Serial No">
                      <b-form-input
                        class="mb-2"
                        label="Serial No"
                        placeholder="Enter Serial No"
                        v-model.trim="deficiency_detail.serial_no"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Reference No">
                      <b-form-input
                        class="mb-2"
                        label="Reference No"
                        placeholder="Enter Reference No"
                        v-model.trim="deficiency_detail.reference_no"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <b-row>
                      <b-col md="1"> </b-col>
                      <b-col md="11">
                        <b-form-group label="Nature of Deficiency">
                          <b-form-select
                            v-model="deficiency_detail.deficiency_nature"
                            :options="natureofDeficiencyItems"
                            id="inline-form-custom-select-pref1"
                          >
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Deficiency Details">
                      <b-form-input
                        class="mb-2"
                        label="Deficiency Details"
                        placeholder="Enter Deficiency Details"
                        v-model.trim="deficiency_detail.details"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Target Date">
                      <b-form-datepicker
                        :id="`target_date${dd}`"
                        v-model="deficiency_detail.target_date"
                        class="mb-2"
                        :min="deficiency_detail.issued_date"
                        placeholder="Target Date"
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <b-row>
                      <b-col md="1"> </b-col>
                      <b-col md="11">
                        <b-form-group label="Completion Date by Ship">
                          <b-form-datepicker
                            :id="`completion_date${dd}`"
                            v-model="deficiency_detail.completion_date"
                            class="mb-2"
                            :min="deficiency_detail.issued_date"
                            :max="max"
                            placeholder="Completion Date By Ship"
                          ></b-form-datepicker>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Verification Date by Office">
                      <b-form-datepicker
                        :id="`verification_date${dd}`"
                        v-model="deficiency_detail.verification_date"
                        class="mb-2"
                        :min="deficiency_detail.completion_date"
                        :max="max"
                        placeholder="Verification Date by Office"
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>
                  <b-col md="4">
                    <b-form-group label="Evidence">
                      <b-form-file
                        :id="`evidence${dd}`"
                        name="evidence"
                        ref="evidence"
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
    title: "Internal Audit | Create",
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // const minDate = new Date(today);
    const maxDate = new Date(today);
    return {
      form: {
        vessel_id: "",
        start_date: "",
        completion_date: "",
        audit_type_id: "",
        other_audit_type: "",
        location: "",
        country_id:"",
        port_id:"",
        from:"",
        to:"",
        no_of_issued_deficiencies: 0,
      },
      maxValue: 3,
      max: maxDate,
      deficiency_details: [],
      portItems: [],
      searchPort: "",
      selectedPort: [],

      auditTypeItems:[],
      // auditTypeItems: [
      //   { value: "", text: " select an option" },
      //   { value: "1", text: "ISM" },
      //   { value: "2", text: "ISPS" },
      //   { value: "3", text: "MLC" },
      //   { value: "4", text: "ISO" },
      //   { value: "5", text: "TMSA" },
      //   { value: "6", text: "Navigational" },
      //   { value: "7", text: "Cargo" },
      //   { value: "8", text: "Muuring" },
      //   { value: "9", text: "Bunkering" },
      //   { value: "10", text: "Other" },
      // ],
      
      natureofDeficiencyItems: [
        { value: "", text: " select an option" },
        { value: "1", text: "NC" },
        { value: "2", text: "OBS" },
      ],
      searchCountry: "",
      selectedCountry: [],
      countryItems: [],

      LocationItems: [
        { value: "", text: " select an option" },
        { value: "1", text: "At Seas" },
        { value: "2", text: "At Berth" },
        { value: "3", text: "At Anchorage" },
        { value: "4", text: "At Lay Up/Dry Dock" },
      ],
      submitStatus: null,
      vessel: {
        vessel_type: {},
      },
    };
  },
  validations: {
    form: {
      start_date: {
        required,
      },
      audit_type_id: {
        required,
      },
      completion_date: {
        required,
      },
      location: {
        required,
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
    DefineAuditType(audit_id){
    let status=false
    if(audit_id){
    let Audit = this.auditTypeItems.find((sp) => sp.id == audit_id);
      if(Audit.text=='OTHER'){
        status=true
      }else{
        this.form.other_audit_type=''
      }
        
    }
    return status     
    },
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
      let masters = await axios.get("internal_audits/masters");
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

      masters.auditTypes.forEach((auditType) => {
        this.auditTypeItems.push({
          id: auditType.id,
          value: auditType.id,
          text: auditType.description,
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

      this.form.internal_audit_deficiencies = this.deficiency_details;
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
          let internal_audit = await axios.post(
            `/vessels/${this.$route.params.vessel_id}/internal_audits`,
            this.form
          );
          this.internal_audit = internal_audit.data.data;
          await this.handleFileUpload();
          this.isLoading = false;
          this.submitStatus = "OK";
          this.$router.push(
            `/app/vessels/${this.$route.params.vessel_id}/internal-audits/`
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
      const internal_audit_id = this.internal_audit.id;
      let formData = new FormData();
      formData.append("internal_audit_id", internal_audit_id);
      formData.append("reportpath", reportpath);
      let evidence_count = 0;
      this.internal_audit.internal_audit_deficiencies.forEach((dd, index) => {
        let deficiency_id = dd.id;
        let d_id = "deficiency_id" + index;

        let evidencepath_A = this.$refs.evidence[index].files[0];
        let evidencepath_A_name = "evidencepath_A_" + index;
        // let evidencepath_B = this.$refs.evidence_b[index].files[0];
        // let evidencepath_B_name = "evidencepath_B_" + index;
        // let evidencepath_C = this.$refs.evidence_c[index].files[0];
        // let evidencepath_C_name = "evidencepath_C_" + index;
        // let evidencepath_D = this.$refs.evidence_d[index].files[0];
        // let evidencepath_D_name = "evidencepath_D_" + index;

        formData.append(d_id, deficiency_id);
        formData.append(evidencepath_A_name, evidencepath_A);
        // formData.append(evidencepath_B_name, evidencepath_B);
        // formData.append(evidencepath_C_name, evidencepath_C);
        // formData.append(evidencepath_D_name, evidencepath_D);
        evidence_count++;
      });
      formData.append("evidence_count", evidence_count);
      await axios
        .post("upload_internal_audit_report", formData, {
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
