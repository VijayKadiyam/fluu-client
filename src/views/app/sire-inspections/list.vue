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
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            :to="'/app/vessels/' + vessel.id + '/sire-inspections/create'"
            ><i class="i-Add-User text-white mr-2"> </i>Add SIRE / CDI
            Inspection
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <a
              :href="
                '/app/vessels/' +
                props.row.vessel_id +
                '/sire-inspections/' +
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
          <span v-if="props.column.field == 'inspection_type'">
              {{ props.row.inspection_type }}
          </span>
          <span v-if="props.column.field == 'oil_major'">
              {{ props.row.oil_major.description }}
          </span>
          <span v-if="props.column.field == 'inspector'">
              {{ props.row.inspector.user_name }}
          </span>
          <span v-if="props.column.field == 'date_of_inspection'">
              {{ props.row.date_of_inspection }}
          </span>
          <span v-if="props.column.field == 'place_of_inspection'">
              {{ props.row.place_of_inspection }}
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
        {
          label: "Oil Major",
          field: "oil_major",
        },
        {
          label: "Date of Inspection",
          field: "date_of_inspection",
        },
        {
          label: "Place of Inspection",
          field: "place_of_inspection",
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
      // this.count = sire_inspections.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
