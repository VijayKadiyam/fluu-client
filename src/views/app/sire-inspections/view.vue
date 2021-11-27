<template>
  <div class="main-content">
    <breadcumb :page="'Update SIRE Inspection'" :folder="'SIRE Inspections'" />
    <!-- Vessel Details card -->
    <b-card class="mb-4">
      <div class="content">
        <h4>Vessel</h4>
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
    <!-- Vessel Destails end -->
    <!-- Sire Inspection -->
    <b-card class="mb-4">
      <h4>Sire Inpection</h4>
      <div class="content">
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Type Of Inspection</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              <span v-if="form.inspection_type == 1">SIRE</span>
              <span v-if="form.inspection_type == 2">CDI</span>
              <span v-if="form.inspection_type == 3">{{
                form.inspection_type_detail
              }}</span>
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Type Oil Major</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.oil_major.description }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Date Of Inspection</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.date_of_inspection }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Port</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.port.description }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Country</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.country.description }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Address</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.address }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Name Of Inspector</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.inspector.user_name }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Total Observation</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ form.total_observations }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <p class="text-muted mt-2 mb-0">Attachment</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              <a
                :href="`${mediaUrl}${form.attachment}`"
                target="_blank"
                style="color: blue"
              >
                Click to see : {{ form.attachment }}
              </a>
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- Sire Inspection end -->
    <!-- Sire Inspection Details  -->
    <b-card class="mb-4">
      <h4>Sire Inpection Details</h4>
      <div class="content">
        <b-row
          v-for="(sireInspectionDetail, at) in form.sire_inspection_details"
          :key="`sireInspectionDetail${at}`"
        >
          <b-col md="4">
            <p class="text-muted mt-2 mb-0">VIQ Chapter Name</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ sireInspectionDetail.viq_chapter.chapter_name }}
            </p>
          </b-col>
          <b-col md="4">
            <p class="text-muted mt-2 mb-0">VIQ No</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ sireInspectionDetail.viq_no }}
            </p>
          </b-col>
          <b-col md="4">
            <p class="text-muted mt-2 mb-0">Observation</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ sireInspectionDetail.observation }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- Sire Inspection details ens -->
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
      viqChapterDetail: {
        viq_no: "",
        observation: "",
      },
      sireDetails: [],
      searchOilMajor: "",
      selectedOilMajor: [],
      OilMajorItems: [],

      searchPort: "",
      selectedPort: [],
      PortItems: [],

      searchCountry: "",
      selectedCountry: [],
      countryItems: [],

      searchInspectionName: "",
      selectedInspectionName: [],
      InspectorNameItems: [],

      submitStatus: null,
      vessel: [],

      inspectionTypeItems: [
        { value: "", text: " select an option" },
        { value: "1", text: "SIRE" },
        { value: "2", text: "CDI" },
        { value: "3", text: "Other" },
      ],

      viqChapters: [],
      viqChapterDetails: [],
      viqChapterDetailArrays: [],
      columns: [
        {
          label: "Sr No",
          field: "sr_no",
        },
        {
          label: "VIQ No",
          field: "viq_no",
        },
        {
          label: "Observation",
          field: "observation",
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
      total_observations: {
        required,
        numeric,
      },
    },
  },
  mounted() {
    this.form.vessel_id = this.$route.params.vessel_id;
    this.form.site_id = this.site.id;
    this.getMasters();
    this.getData();
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
      return this.InspectorNameItems.filter((c) => {
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
      let form = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/sire_inspections/${this.$route.params.id}`
      );
      this.form = form.data.data;
      console.log(this.form);
      this.port = this.form.port;
      this.country = this.form.country;
      this.oil_major = this.form.oil_major;
      this.inspector = this.form.inspector;

      this.sireDetails = this.form.sire_inspection_details;

      this.selectedPort.push({
        id: this.port.id,
        text: this.port.description,
      });

      this.selectedCountry.push({
        id: this.country.id,
        text: this.country.description,
      });
      this.selectedOilMajor.push({
        id: this.oil_major.id,
        text: this.oil_major.description,
      });
      this.selectedInspectionName.push({
        id: this.inspector.id,
        text: this.inspector.user_name,
      });

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      // console.log(this.vessel);
      // this.program = form.data.data.program;
      this.isLoading = false;
    },
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("sire_inspections/masters");
      masters = masters.data;
      this.masters = masters;

      masters.ports.forEach((port) => {
        this.PortItems.push({
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

      masters.oilMajors.forEach((oilMajor) => {
        this.OilMajorItems.push({
          id: oilMajor.id,
          text: oilMajor.description,
        });
      });

      masters.users.forEach((user) => {
        this.InspectorNameItems.push({
          id: user.id,
          text: user.user_name,
        });
      });

      masters.viqChapters.forEach((viqChapter) => {
        this.viqChapters.push({
          id: viqChapter.id,
          description: viqChapter.chapter_name,
        });
      });

      this.viqChapters.forEach((viq) => {
        let viqChapterDetails = "viqChapterDetails" + viq.id;
        this[viqChapterDetails] = [];
        this[viqChapterDetails].push({
          id: viq.id,
          viq_chapter_id: viq.id,
        });

        this.viqChapterDetailArrays.push(this[viqChapterDetails]);
      });
      // console.log(this.viqChapterDetailArrays);
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
      if (this.selectedPort[0]) {
        this.form.port_id = this.selectedPort[0].id;
      }
      if (this.selectedCountry[0]) {
        this.form.country_id = this.selectedCountry[0].id;
      }
      if (this.selectedOilMajor[0]) {
        this.form.oil_major_id = this.selectedOilMajor[0].id;
      }
      if (this.selectedInspectionName[0]) {
        this.form.inspector_id = this.selectedInspectionName[0].id;
      }
      this.form.sire_inspection_details = this.sire_inspection_details;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        try {
          this.isLoading = true;
          this.submitStatus = "PENDING";
          this.sire_inspection_details = [];
          this.viqChapterDetailArrays.forEach((Chp) => {
            Chp.forEach((details) => {
              this.sire_inspection_details.push(details);
            });
          });
          // console.log(this.sire_inspection_details);
          this.form.sire_inspection_details = this.sire_inspection_details;
          // console.log(this.form);
          let sire_inspection = await axios.post(
            `/vessels/${this.$route.params.vessel_id}/sire_inspections/${this.$route.params.id}`,
            this.form
          );
          this.sire_inspection = sire_inspection.data.data;
          await this.handleFileUpload();
          this.isLoading = false;
          this.submitStatus = "OK";

          // setTimeout(() => {
          this.$router.push(
            `/app/vessels/${this.$route.params.vessel_id}/sire-inspections/`
          );
          // }, 1000);
        } catch (e) {
          this.isLoading = false;
        }
      }
    },
    async handleFileUpload() {
      let attachment = this.$refs.attachment.files[0];
      const sire_inspection_id = this.sire_inspection.id;
      let formData = new FormData();
      formData.append("sire_inspection_id", sire_inspection_id);
      formData.append("attachment", attachment);
      await axios
        .post("upload_sire_inspection_attachment", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
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
