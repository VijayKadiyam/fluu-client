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
          <span v-if="props.column.field == 'port'">
            {{ props.row.port.description }}
          </span>
          <span v-if="props.column.field == 'country'">
            {{ props.row.country.description }}
          </span>
          <span v-if="props.column.field == 'deficiency'">
            {{ props.row.deficiency.description }}
          </span>
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
    title: "PSC Inspection",
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
          label: "Deficiency",
          field: "deficiency",
        },
        {
          label: "Detained Status",
          field: "is_detained",
        },
        {
          label: "Deficiency Closed Status",
          field: "is_deficiency_closed",
        },
        {
          label: "Date Of Closure",
          field: "date_of_closure",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      psc_inspections: [
        {
          id:1,
          vessel_id: 1,
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
          port_id: 1,
          port: {
            id: 1,
            site_id: 1,
            value_id: 1,
            value: {
              id: 1,
              site_id: 1,
              name: "PORT",
            },
            description: "China Port",
            code: "China Port",
          },
          country_id: 1,
          country: {
            id: 1,
            site_id: 1,
            value_id: 1,
            value: {
              id: 1,
              site_id: 1,
              name: "COUNTRY",
            },
            description: "China",
            code: "China",
          },
          deficiency_id: 1,
          deficiency: {
            id: 1,
            site_id: 1,
            value_id: 1,
            value: {
              id: 1,
              site_id: 1,
              name: "DEFICIENCY",
            },
            description: "Deficiency 1",
            code: "Deficiency 1",
          },
          is_detained: "0",
          date: "15/10/1997",
          reportpath: "",
          is_deficiency_closed: "0",
          date_of_closure: "",
          evidencepath: "",
        },
      ],
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
      let psc_inspections = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/psc_inspections`
      );
      this.psc_inspections = psc_inspections.data.data;

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      // this.count = psc_inspections.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
