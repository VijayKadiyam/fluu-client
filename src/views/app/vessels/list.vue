<template>
  <div class="main-content">
    <breadcumb :page="'Vessel List'" :folder="'Vessels'" />
    <!-- <div class="wrapper"> -->
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
        :rows="vessels"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/vessels/create"
            ><i class="i-Add text-white mr-2"> </i>Add Vessel
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'button'">
            <a :href="'/app/vessels/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
            <!-- <a :href="'/app/vessels/' + props.row.id +'/psc-inspections'">
              <i class="i-Add text-25 text-success mr-2"></i>
              </a
            > -->
            <b-dropdown
              variant="primary"
              id="dropdown-1"
              text="Inspections"
              class="mb-2"
            >
              <b-dropdown-item
                :href="'/app/vessels/' + props.row.id + '/psc-inspections'"
              >
                PSC Inspection
              </b-dropdown-item>
              <b-dropdown-item
                :href="'/app/vessels/' + props.row.id + '/sire-inspections'"
                >SIRE / CDI Inspection
              </b-dropdown-item>
              <b-dropdown-item>Third Action</b-dropdown-item>
            </b-dropdown>
          </div>
          <span v-if="props.column.field == 'serial_no'">
            {{ props.row.serial_no || "" }}
          </span>
          <span v-if="props.column.field == 'name'">
            {{ props.row.name || "" }}
          </span>
          <span v-if="props.column.field == 'imo_no'">
            {{ props.row.imo_no || "" }}
          </span>
          <span v-if="props.column.field == 'built_date'">
            {{ props.row.built_date }}
          </span>
          <span v-if="props.column.field == 'vessel_type'">
            {{ props.row.vessel_type.description || "" }}
          </span>
          <span v-if="props.column.field == 'place_of_built'">
            {{ props.row.place_of_built.description || "" }}
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
    title: "Vessel Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "Serial No",
          field: "serial_no",
        },
        {
          label: "Vessel Name",
          field: "name",
        },
        {
          label: "IMO Number",
          field: "imo_no",
        },
        {
          label: "Vessel Type",
          field: "vessel_type",
        },
        {
          label: "Date Of Built",
          field: "built_date",
        },
        {
          label: "Place Of Built",
          field: "place_of_built",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      vessels: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let vessels = await axios.get(`vessels`);
      this.vessels = vessels.data.data;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
