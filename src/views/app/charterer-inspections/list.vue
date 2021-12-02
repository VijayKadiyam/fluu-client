<template>
  <div class="main-content">
    <breadcumb
      :page="'Charterer Inspection List'"
      :folder="'Charterer Inspections'"
    />
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
    <b-card>
      <vue-good-table
        :columns="columns"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
        }"
        styleClass="tableOne vgt-table"
        :rows="charterer_inspections"
      >
        <div slot="table-actions" class="mb-3">
          <b-row>
            <b-button
              @click="$router.back()"
              variant="primary"
              class="btn-rounded d-none d-sm-block mr-2"
              ><i class="i-Arrow-Back-3"></i> BACK</b-button
            >
            <b-button
              variant="primary"
              class="btn-rounded d-none d-sm-block"
              :to="
                '/app/vessels/' + vessel.id + '/charterer-inspections/create'
              "
              ><i class="i-Add-User text-white mr-2"> </i>Add Charterer
              Inspection
            </b-button>
          </b-row>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'" class="row">
            <b-col md="6">
              <router-link
                v-b-tooltip.hover
                title="View Charterer Inspcteion"
                :to="
                  '/app/vessels/' +
                    props.row.vessel_id +
                    '/charterer-inspections/view/' +
                    props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block"
              >
                <i class="i-Eye text-white mr-2"> </i>View
                {{ props.row.button }}</router-link
              >
            </b-col>
            <b-col md="6">
              <router-link
                v-b-tooltip.hover
                title="Edit Charterer Inspcteion"
                :to="
                  '/app/vessels/' +
                    props.row.vessel_id +
                    '/charterer-inspections/' +
                    props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block"
              >
                <i class="i-Eraser-2 text-white mr-2"> </i>Edit
                {{ props.row.button }}</router-link
              >
            </b-col>
            <!-- <a href="">
              <i class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.button }}</a
            > -->
          </span>
          <span v-if="props.column.field == 'port'">
            {{ props.row.port.description }}
          </span>
          <span v-if="props.column.field == 'country'">
            {{ props.row.country.description }}
          </span>
          <!-- <span v-if="props.column.field == 'is_detained'">
            {{ props.row.is_detained == 1 ? "Yes" : "No" }}
          </span> -->
          <span v-if="props.column.field == 'is_deficiency_closed'">
            {{ props.row.is_deficiency_closed == 1 ? "Yes" : "No" }}
          </span>
          <span v-if="props.column.field == 'no_of_issued_deficiencies'">
            {{ props.row.no_of_issued_deficiencies }}
          </span>
          <span v-if="props.column.field == 'no_of_closed_deficiencies'">
            {{ props.row.no_of_closed_deficiencies }}
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Charterer Inspection List",
  },
  data() {
    return {
      columns: [
        {
          label: "Port",
          field: "port",
        },
        {
          label: "Country",
          field: "country",
        },
        // {
        //   label: "Detained Status",
        //   field: "is_detained",
        // },
        {
          label: "No Of Issued Deficiency",
          field: "no_of_issued_deficiencies",
        },
        {
          label: "No Of Closed Deficiency",
          field: "no_of_closed_deficiencies",
        },
        {
          label: "Deficiency Closed Status",
          field: "is_deficiency_closed",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      charterer_inspections: [],
      vessel: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let charterer_inspections = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/charterer_inspections`
      );
      this.charterer_inspections = charterer_inspections.data.data;

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
