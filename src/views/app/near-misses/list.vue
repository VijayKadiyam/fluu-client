<template>
  <div class="main-content">
    <breadcumb :page="'Near Miss List'" :folder="'Near Misses'" />
    <!-- Vessel Details card -->
    <b-card class="mb-4">
      <div class="content">
        <b-row>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Serial No</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.serial_no }}
            </p>
          </b-col>
          <b-col md="3">
            <p class="text-muted mt-2 mb-0">Vessel Name</p>
            <p class="text-primary text-24 line-height-1 mb-2">
              {{ vessel.name }}
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
        :rows="near_misses"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            :to="'/app/vessels/' + vessel.id + '/near-misses/create'"
            ><i class="i-Add text-white mr-2"> </i>Add Near Miss
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <b-row>
              <router-link
                :to="
                  '/app/vessels/' +
                    props.row.vessel_id +
                    '/near-misses/view/' +
                    props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block mb-2 mr-2 "
                v-b-tooltip.hover
                title="View Near Miss"
              >
                <i class="i-Eye"></i> VIEW
              </router-link>
              <router-link
                :to="
                  '/app/vessels/' +
                    props.row.vessel_id +
                    '/near-misses/' +
                    props.row.id
                "
                class="btn btn-primary btn-rounded d-none d-sm-block mb-2 mr-2 "
                v-b-tooltip.hover
                title="Edit Near Miss"
              >
                <i class="i-Eraser-2"></i> EDIT
              </router-link>
            </b-row>
          </span>
          <span
            v-if="
              props.column.field == 'number_reported' &&
                props.row.number_reported
            "
          >
            {{ props.row.number_reported || "" }}
          </span>
          <span v-if="props.column.field == 'location' && props.row.location">
            {{ props.row.location.description || "" }}
          </span>
          <span v-if="props.column.field == 'category' && props.row.category">
            {{ props.row.category.description || "" }}
          </span>
          <span v-if="props.column.field == 'activity' && props.row.activity">
            {{ props.row.activity.description || "" }}
          </span>
          <span
            v-if="props.column.field == 'basic_cause' && props.row.basic_cause"
          >
            {{ props.row.basic_cause.description || "" }}
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
    title: "Near Miss Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "Number Reported",
          field: "number_reported",
        },
        {
          label: "Location",
          field: "location",
        },
        {
          label: "Category",
          field: "category",
        },
        {
          label: "Activity",
          field: "activity",
        },
        {
          label: "Basic Cause",
          field: "basic_cause",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      vessel: {},
      near_misses: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let near_misses = await axios.get(
        `/vessels/${this.$route.params.vessel_id}/near_misses`
      );
      this.near_misses = near_misses.data.data;

      let vessel = await axios.get(`/vessels/${this.$route.params.vessel_id}`);
      this.vessel = vessel.data.data;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
