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
          <router-link to="/app/vessels/create">
            <b-button variant="primary" class="btn-rounded d-none d-sm-block"
              ><i class="i-Add text-white mr-2"> </i>Add Vessel
            </b-button>
          </router-link>
        </div>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'button'">
            <b-row>
              <router-link
                :to="'/app/vessels/view/' + props.row.id"
                class="btn btn-primary d-none d-sm-block mb-2 mr-2 "
                v-b-tooltip.hover title="View Vessel Details"
              >
                <i class="i-Eye"></i> VIEW
              </router-link>
              <router-link
                :to="'/app/vessels/' + props.row.id"
                class="btn btn-primary d-none d-sm-block mb-2 mr-2 "
                v-b-tooltip.hover title="Edit Vessel Details"
              >
                <i class="i-Eraser-2"></i> EDIT
              </router-link>
              <b-dropdown
                variant="primary"
                id="dropdown-1"
                text="Inspections"
                v-b-tooltip.hover title="List of Inspection Type"
                class="mb-2"
              >
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/psc-inspections'"
                  >
                    PSC Inspection
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/fsc-inspections'"
                  >
                    FSC Inspection
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/terminal-inspections'"
                  >
                    Terminal Inspection
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/charterer-inspections'"
                  >
                    Charterers Inspection
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/internal-audits'"
                  >
                    Internal Audit
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/psc-inspections'"
                  >
                    External Audit
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/near-misses'"
                  >
                    Near Miss / Non Confirmance
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/psc-inspections'"
                  >
                    Best Practices
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/psc-inspections'"
                  >
                    Incident / Accident
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link
                    :to="'/app/vessels/' + props.row.id + '/sire-inspections'"
                  >
                    SIRE / CDI Inspection
                  </router-link>
                </b-dropdown-item>
              </b-dropdown>
            </b-row>
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
