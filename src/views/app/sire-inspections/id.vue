<template>
  <div class="main-content">
    <breadcumb :page="'Update SIRE Inspection'" :folder="'SIRE Inspections'" />
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
                <b-form-group label="Type Of Inspection">
                  <b-form-select
                    v-model="form.inspection_type"
                    :options="inspectionTypeItems"
                    id="inline-form-custom-select-pref1"
                  >
                  </b-form-select>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.inspection_type.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Others" v-if="form.inspection_type == 3">
                  <b-form-input
                    class="mb-2 other"
                    label="Others"
                    id="Other-type"
                    placeholder="Enter Others"
                    v-model="form.other_type"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Oil Major">
                  <vue-tags-input
                    v-model="searchOilMajor"
                    :tags="selectedOilMajor"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredOilMajorItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="(newTags) => (selectedOilMajor = newTags)"
                    placeholder="Type Oil Major"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Date Of Inspection">
                  <b-form-datepicker
                    id="date_of_inspection"
                    v-model="form.date_of_inspection"
                    class="mb-2"
                    placeholder="Date Of Inspection"
                  ></b-form-datepicker>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.date_of_inspection.required"
                    >Field is required</b-alert
                  >
                </b-form-group>
              </b-col>
            </b-row>
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
                <b-form-group label="Address">
                  <b-form-input
                    class="mb-2"
                    label="Address"
                    placeholder="More Details"
                    v-model.trim="form.address"
                  >
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Name Of Inspector">
                  <vue-tags-input
                    v-model="searchInspectionName"
                    :tags="selectedInspectionName"
                    :max-tags="1"
                    class="tag-custom text-15 mb-2"
                    :autocomplete-items="filteredInspectionNameItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="
                      (newTags) => (selectedInspectionName = newTags)
                    "
                    placeholder="Type Name Of Inspector"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Total Observation">
                  <b-form-input
                    class="mb-2"
                    label="Total Observation"
                    placeholder="Enter Total Observation"
                    v-model.trim="$v.form.total_observations.$model"
                  >
                  </b-form-input>
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.total_observations.required"
                    >Field is required</b-alert
                  >
                  <b-alert
                    show
                    variant="danger"
                    class="error mt-1"
                    v-if="!$v.form.total_observations.numeric"
                    >Numeric Values Only</b-alert
                  >
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Attachment">
                  <b-form-file
                    id="file-default"
                    name="attachment"
                    ref="file"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <!-- start::alignment -->
                <b-card
                  class="card mb-30"
                  header="VIQ Chapter "
                  header-bg-variant="transparent "
                >
                  <b-tabs content-class="mt-3" align="center">
                    <b-tab
                      v-for="(viqChapter, at) in viqChapters"
                      :key="`viqChapter${at}`"
                      :title="`Chapter ${viqChapter.id}`"
                      active
                    >
                      <vue-good-table
                        :columns="columns"
                        :line-numbers="true"
                        :search-options="{
                          enabled: false,
                          placeholder: 'Search this table',
                        }"
                        :pagination-options="{
                          enabled: true,
                          mode: 'records',
                        }"
                        styleClass="tableOne vgt-table"
                        :rows="viqChapterDetails1"
                      >
                        <div
                          slot="table-actions-bottom"
                          class="mb-1 mr-2 mt-3 pull-right"
                        >
                          <b-button
                            variant="primary"
                            class="btn-rounded d-none d-sm-block"
                            @click="addEmptyVIQChapter(viqChapter.id)"
                            ><i class="i-Add text-white mr-2"></i>Add Row
                          </b-button>
                        </div>

                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'sr_no'">
                            <b-button
                              variant="primary"
                              class="btn-rounded d-none d-sm-block"
                              @click="
                                deleteVIQChapter(
                                  viqChapter.id,
                                  props.row.originalIndex
                                )
                              "
                              >X
                            </b-button>
                          </span>
                          <span v-if="props.column.field == 'serial_no'">
                            <b-form-input
                              class="mb-2"
                              label="Serial No"
                              v-model="props.row.serial_no"
                              placeholder="Enter Serial No"
                            >
                            </b-form-input>
                          </span>
                          <span v-if="props.column.field == 'details'">
                            <b-form-input
                              class="mb-2"
                              label="Details"
                              v-model="props.row.details"
                              placeholder="Enter Details"
                            >
                            </b-form-input>
                          </span>
                        </template>
                      </vue-good-table>
                    </b-tab>
                  </b-tabs>
                </b-card>
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
    title: "SIRE Inspection | Create",
  },
  data() {
    return {
      form: {
        vessel_id: 2,
        inspection_type: "1",
        date_of_inspection: "",
        inspector: "",
        oil_major: "",
        total_observations: "",
        other_type: "",
        address: "",
      },
      searchOilMajor: "",
      selectedOilMajor: [],
      OilMajorItems: [
        { id: "1", text: "Oil" },
        { id: "2", text: "Major" },
      ],

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

      searchCountry: "",
      selectedCountry: [],

      searchInspectionName: "",
      selectedInspectionName: [],
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

      inspectionTypeItems: [
        { value: "", text: " select an option" },
        { value: "1", text: "SIRE" },
        { value: "2", text: "CDI" },
        { value: "3", text: "Other" },
      ],
      viqChapters: [
        {
          id: 1,
          description: "Chapter1",
        },
        {
          id: 2,
          description: "Chapter2",
        },
        {
          id: 3,
          description: "Chapter3",
        },
        {
          id: 4,
          description: "Chapter4",
        },
        {
          id: 5,
          description: "Chapter5",
        },
      ],
      viqChapterDetails1: [
        {
          id: 1,
          serial_no: "23",
          details: "details",
        },
      ],
      columns: [
        {
          label: "Sr No",
          field: "sr_no",
        },
        {
          label: "Serial No",
          field: "serial_no",
        },
        {
          label: "Details",
          field: "details",
        },
      ],
    };
  },
  validations: {
    form: {
      inspection_type: {
        required,
      },
      date_of_inspection: {
        required,
      },
      inspector: {
        required,
      },
      oil_major: {
        required,
      },
      total_observations: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    // this.form.program_id = this.$route.params.program_id;
    // this.form.site_id = this.site.id;
    this.getData();
    this.viqChapters.forEach((chapter) => {
      let name = "viqChapterDetails" + chapter.id;
      this[name] = [];
    });
  },
  computed: {
    filteredOilMajorItems() {
      return this.OilMajorItems.filter((c) => {
        return (
          c.text.toLowerCase().indexOf(this.searchOilMajor.toLowerCase()) !== -1
        );
      });
    },
    filteredInspectionNameItems() {
      return this.countryItems.filter((c) => {
        return (
          c.text
            .toLowerCase()
            .indexOf(this.searchInspectionName.toLowerCase()) !== -1
        );
      });
    },
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
  },
  methods: {
    async getData() {
      this.isLoading = true;
      // let form = await axios.get(
      //   `/vessels/${this.$route.params.vessel_id}/sire_inspections/${this.$route.params.id}`
      // );
      // this.form = form.data.data;
      // this.program = form.data.data.program;
      this.isLoading = false;
    },
    addEmptyVIQChapter(Chapter) {
      let name = "viqChapterDetails" + Chapter;
      console.log(this[name]);
      this[name].push({
        serial_no: "",
        sire_inspection_id: Chapter,
        details: "",
        is_active: 1,
      });
    },
    deleteVIQChapter(Chapter, row) {
      let name = "viqChapterDetails" + Chapter;
      this[name].splice(row, 1);
      console.log(this[name]);
    },
    //   validate form
    async submit() {
      console.log("submit!");

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          // console.log(this.form);
          await axios.patch(
            `/programs/${this.$route.params.program_id}/program_tasks/${this.$route.params.id}`,
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
