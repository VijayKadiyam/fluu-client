<template>
  <div class="main-content">
    <breadcumb :page="'SIRE Inspection List'" :folder="'SIRE Inspections'" />
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
        :rows="sire_inspections"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            v-b-tooltip.hover
            title="Add Sire Inspcteion"
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            :to="'/app/vessels/' + vessel.id + '/sire-inspections/create'"
            ><i class="i-Add-User text-white mr-2"> </i>Add SIRE / CDI
            Inspection
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'" class="row">
            <div class="col-md-6">
              <a
                v-b-tooltip.hover
                title="View Sire Inspcteion"
                :href="
                  '/app/vessels/' +
                  props.row.vessel_id +
                  '/sire-inspections-view/' +
                  props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block"
              >
                <i class="i-Eye text-white mr-2"> </i>Info
                {{ props.row.button }}</a
              >
            </div>
            <div class="com-md-6">
              <a
                v-b-tooltip.hover
                title="Edit Sire Inspcteion"
                :href="
                  '/app/vessels/' +
                  props.row.vessel_id +
                  '/sire-inspections/' +
                  props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block"
              >
                <i class="i-Eraser-2 text-white mr-2"> </i>Edit
                {{ props.row.button }}</a
              >
            </div>
            <!-- <a href="">
              <i class="i-Close-Window text-25 text-danger"></i>
              {{ props.row.button }}</a
            > -->
          </span>
          <span v-if="props.column.field == 'inspection_type'">
            <span v-if="props.row.inspection_type == 1">SIRE</span>
            <span v-if="props.row.inspection_type == 2">CDI</span>
            <span v-if="props.row.inspection_type == 3">{{
              props.row.inspection_type_detail
            }}</span>
          </span>
          <!-- <span v-if="props.column.field == 'oil_major'">
            {{ props.row.oil_major.description }}
          </span> -->
          <span v-if="props.column.field == 'inspector'">
            {{ props.row.inspector.user_name }}
          </span>
          <span v-if="props.column.field == 'date_of_inspection'">
            {{ props.row.date_of_inspection }}
          </span>
          <span v-if="props.column.field == 'country'">
            {{ props.row.country.description }}
          </span>
          <span v-if="props.column.field == 'port'">
            {{ props.row.port.description }}
          </span>
          <span v-if="props.column.field == 'total_observations'">
            {{ props.row.total_observations }}
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
    title: "SIRE Inspection",
  },
  data() {
    return {
      columns: [
        {
          label: "Inspection Type",
          field: "inspection_type",
        },
        // {
        //   label: "Oil Major",
        //   field: "oil_major",
        // },
        {
          label: "Date of Inspection",
          field: "date_of_inspection",
        },
        {
          label: "Country",
          field: "country",
        },
        {
          label: "Port",
          field: "port",
        },
        {
          label: "Inspector Name",
          field: "inspector",
        },
        {
          label: "Total Observations",
          field: "total_observations",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      sire_inspections: [],
      vessel: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let sire_inspections = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/sire_inspections`
      );
      this.sire_inspections = sire_inspections.data.data;

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      // console.log(this.vessel);
      // this.count = sire_inspections.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
