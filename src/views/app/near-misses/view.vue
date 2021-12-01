<template>
  <div class="main-content">
    <breadcumb :page="'View Near Miss Details'" :folder="'Near Miss'" />
    <b-card class="mb-4" title="Near Miss Details">
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
              >Near Miss</b-button
            >
          </b-card-header>
          <b-collapse id="management" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                ><b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Number Reported</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ near_misses.number_reported }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Location</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ near_misses.location.description }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Category</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ near_misses.category.description }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Activity</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ near_misses.activity.description }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Basic Causes</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ near_misses.basic_cause.description }}
                    </p>
                  </b-col>
                </b-row>
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
    title: "View Near Miss Details",
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
      let near_misses = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/near_misses/${this.$route.params.id}`
      );
      this.near_misses = near_misses.data.data;
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
