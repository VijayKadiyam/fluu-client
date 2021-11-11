<template>
  <div class="main-content">
    <breadcumb :page="'PSC Inspection List'" :folder="'PSC Inspections'" />
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
        :rows="psc_inspections"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            :to="'/app/vessels/' + vessel.id + '/psc-inspections/create'"
            ><i class="i-Add-User text-white mr-2"> </i>Add PSC Inspection
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <a
              :href="
                '/app/vessels/' +
                  props.row.vessel_id +
                  '/psc-inspections/' +
                  props.row.id
              "
            >
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
            <!-- <a href="">
              <i class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.button }}</a
            > -->
          </span>
          <!-- <span v-if="props.column.field == 'port'">
            {{ props.row.port.description }}
          </span>
          <span v-if="props.column.field == 'country'">
            {{ props.row.country.description }}
          </span> -->
          <span v-if="props.column.field == 'is_detained'">
            {{ props.row.is_detained == 0 ? "Yes" : "No" }}
          </span>
          <span v-if="props.column.field == 'is_deficiency_closed'">
            {{ props.row.is_deficiency_closed == 0 ? "Yes" : "No" }}
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
    title: "PSC Inspection List",
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
        {
          label: "Detained Status",
          field: "is_detained",
        },
        {
          label: "No Of Deficieny",
          field: "country",
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
      psc_inspections: [],
      vessel: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let psc_inspections = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/psc_inspections`
      );
      this.psc_inspections = psc_inspections.data.data;

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
