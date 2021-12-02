<template>
  <div class="main-content">
    <breadcumb
      :page="'View Terminal Inspection Details'"
      :folder="'Terminal Inspection'"
    />
    <b-card class="mb-4" title="Terminal Inspection Details">
      <b-row>
        <b-col md="12">
          <b-button
            @click="$router.back()"
            class="mb-2 pull-right"
            style="margin-top:-48px"
            variant="primary"
            ><i class="i-Arrow-Back-3"></i> BACK</b-button
          >
        </b-col>
      </b-row>
      <div role="tablist">
        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              class="card-title mb-0"
              block
              href="#"
              v-b-toggle.vessel_details
              variant="transparent"
              >Vessel Details</b-button
            >
          </b-card-header>
          <b-collapse
            id="vessel_details"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Serial No</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.serial_no }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Vessel Name</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.name }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">IMO No</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.imo_no }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Type</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.vessel_type.description }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Date of Built</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.built_date }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Place Of Built</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.place_of_built.description }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Summer Dwt (M/T)</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.dwt }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Remark</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.remarks }}
                    </p>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              class="card-title mb-0"
              block
              href="#"
              v-b-toggle.management
              variant="transparent"
              >Terminal Inspection</b-button
            >
          </b-card-header>
          <b-collapse id="management" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                ><b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Date</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.date }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Port</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.port.description }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Country</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.country.description }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">No Of Issued Deficienies</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.no_of_issued_deficiencies }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">No Of Closed Deficienies</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.no_of_closed_deficiencies }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Report</p>
                    <p class="text-primary text-18 line-height-1 mb-2">
                      <a
                        :href="`${mediaUrl}${terminal_inspection.reportpath}`"
                        target="_blank"
                        style="color: blue"
                      >
                        Click to see : {{ terminal_inspection.reportpath }}
                      </a>
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Additional Comments</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ terminal_inspection.additional_comments }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">
                      Are All Deficienies Closed
                    </p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{
                        terminal_inspection.is_deficiency_closed == 0
                          ? "NO"
                          : "YES"
                      }}
                    </p>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-card no-body class="ul-card__border-radius">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              class="card-title mb-0"
              block
              href="#"
              v-b-toggle.accordion-3
              variant="transparent"
              >Terminal Inspection Details</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <div class="ul-widget__body">
                  <div id="__g-widget-s7-tab1-content">
                    <div class="ul-widget-s7n">
                      <div
                        class="ul-widget-s7__items mb-30"
                        v-for="(
                          deficiency_detail, dd
                        ) in terminal_inspection.terminal_inspection_deficiencies"
                        :key="`deficiency_detail${dd}`"
                      >
                        <span class="ul-widget-s7__item-time ul-middle">{{
                          dd + 1
                        }}</span>
                        <div class="ul-widget-s7__item-circle">
                          <p class="ul-vertical-line bg-primary"></p>
                        </div>
                        <div class="ul-widget-s7__item-text">
                          <div class="row">
                            <div class="col-md-6">
                              <p class="text-muted mt-2 mb-0">
                                Date of Closure
                              </p>
                              <p
                                class="text-primary text-24 line-height-1 mb-2"
                              >
                                {{ deficiency_detail.date_of_closure }}
                              </p>
                            </div>
                            <div class="col-md-6">
                              <div class="ul-widget-s7__item-text">
                                <p class="text-muted mt-2 mb-0">Remarks</p>
                                <p
                                  class="
                                    text-primary text-24
                                    line-height-1
                                    mb-2
                                  "
                                >
                                  {{ deficiency_detail.details }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <p class="text-muted mt-2 mb-0">Evidence 1</p>
                              <p
                                class="text-primary text-18 line-height-1 mb-2"
                              >
                                <a
                                  :href="`${mediaUrl}${deficiency_detail.evidencepath1}`"
                                  target="_blank"
                                  style="color: blue"
                                >
                                  Click to see :
                                  {{ deficiency_detail.evidencepath1 }}
                                </a>
                              </p>
                            </div>
                            <div class="col-md-3">
                              <p class="text-muted mt-2 mb-0">Evidence 2</p>
                              <p
                                class="text-primary text-18 line-height-1 mb-2"
                              >
                                <a
                                  :href="`${mediaUrl}${deficiency_detail.evidencepath2}`"
                                  target="_blank"
                                  style="color: blue"
                                >
                                  Click to see :
                                  {{ deficiency_detail.evidencepath2 }}
                                </a>
                              </p>
                            </div>
                            <div class="col-md-3">
                              <p class="text-muted mt-2 mb-0">Evidence 3</p>
                              <p
                                class="text-primary text-18 line-height-1 mb-2"
                              >
                                <a
                                  :href="`${mediaUrl}${deficiency_detail.evidencepath3}`"
                                  target="_blank"
                                  style="color: blue"
                                >
                                  Click to see :
                                  {{ deficiency_detail.evidencepath3 }}
                                </a>
                              </p>
                            </div>
                            <div class="col-md-3">
                              <p class="text-muted mt-2 mb-0">Evidence 4</p>
                              <p
                                class="text-primary text-18 line-height-1 mb-2"
                              >
                                <a
                                  :href="`${mediaUrl}${deficiency_detail.evidencepath4}`"
                                  target="_blank"
                                  style="color: blue"
                                >
                                  Click to see :
                                  {{ deficiency_detail.evidencepath4 }}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "View Terminal Inspection Details",
  },
  data() {
    return {
      vessel: {},
      countryItems: [],

      submitStatus: null,
    };
  },
  mounted() {
    this.getMasters();
    this.getData();

    this.vessel.site_id = this.site.id;
  },
  methods: {
    async getMasters() {
      this.isLoading = true;
      let masters = await axios.get("vessels/masters");
      masters = masters.data;

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
      let terminal_inspection = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/terminal_inspections/${this.$route.params.id}`
      );
      this.terminal_inspection = terminal_inspection.data.data;
      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      this.isLoading = false;
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
