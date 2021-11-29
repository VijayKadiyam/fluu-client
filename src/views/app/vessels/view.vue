<template>
  <div class="main-content">
    <breadcumb :page="'View Vessels Details'" :folder="'Vessels'" />
    <b-card class="mb-4" title="Vessel Details">
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
              >Management</b-button
            >
          </b-card-header>
          <b-collapse id="management" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                ><b-row>
                  <b-col md="6">
                    <p class="text-muted mt-2 mb-0">Management IN Date</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.management_in_date }}
                    </p>
                  </b-col>
                  <b-col md="6">
                    <p class="text-muted mt-2 mb-0">Management OUT Date</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.management_out_date }}
                    </p>
                  </b-col>
                </b-row></b-card-text
              >
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
              >Officers / Rating</b-button
            >
          </b-card-header>
          <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Deck Officers</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.no_of_deck_officers }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Engine Officers</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.no_of_engine_officers }}
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Deck Rating</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.no_of_deck_rating }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Engine Rating</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.no_of_engine_rating }}
                    </p>
                  </b-col>
                  <b-col md="4">
                    <p class="text-muted mt-2 mb-0">Galley Rating</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      {{ vessel.no_of_galley_rating }}
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
              v-b-toggle.nationality
              variant="transparent"
              >Nationality</b-button
            >
          </b-card-header>
          <b-collapse id="nationality" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <b-row>
                  <b-col md="6">
                    <p class="text-muted mt-2 mb-0">Officers Nationalities</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      <span
                        v-for="off_n in selectedOfficerNationality"
                        :key="`of${off_n}`"
                      >
                        {{ off_n.text }},
                      </span>
                    </p>
                  </b-col>
                  <b-col md="6">
                    <p class="text-muted mt-2 mb-0">Ratings Nationalities</p>
                    <p class="text-primary text-24 line-height-1 mb-2">
                      <span
                        v-for="off_n in selectedRatingNationality"
                        :key="`of${off_n}`"
                      >
                        {{ off_n.text }},
                      </span>
                    </p>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-card>

    <!-- <b-card class="mb-4" title="Vessel Details">
      <div class="content">
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
            <p class="text-muted mt-2 mb-0">Summer Dwt</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.dwt }}&nbsp;<b-badge variant="light"
                >in Metric Tons</b-badge
              >
            </p>
          </b-col>
          <b-col md="4">
            <p class="text-muted mt-2 mb-0">Remark</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.remarks }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-card class="mb-4" title="Management Details">
      <div class="content">
        <b-row>
          <b-col md="6">
            <p class="text-muted mt-2 mb-0">Management IN Date</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.management_in_date }}
            </p>
          </b-col>
          <b-col md="6">
            <p class="text-muted mt-2 mb-0">Management OUT Date</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.management_out_date }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-card class="mb-4" title="No Of Officer">
      <div class="content">
        <b-row>
          <b-col md="6">
            <p class="text-muted mt-2 mb-0">Deck Officers</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.no_of_deck_officers }}
            </p>
          </b-col>
          <b-col md="6">
            <p class="text-muted mt-2 mb-0">Engine Officers</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.no_of_engine_officers }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-card> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "View Vessel Details",
  },
  data() {
    return {
      vessel: {},
      countryItems: [],

      searchOfficierNationality: "",
      selectedOfficerNationality: [],

      searchRatingNationality: "",
      selectedRatingNationality: [],

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
      let vessel = await axios.get(`/vessels/${this.$route.params.id}`);
      this.vessel = vessel.data.data;
      this.officer_nationalities = this.vessel.officer_nationalities;
      this.rating_nationalities = this.vessel.rating_nationalities;
      this.officer_nationalities.forEach((selected) => {
        let officer = this.countryItems.find((sp) => sp.id == selected);
        this.selectedOfficerNationality.push(officer);
      });
      this.rating_nationalities.forEach((selected) => {
        let rating = this.countryItems.find((sp) => sp.id == selected);
        this.selectedRatingNationality.push(rating);
      });
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
