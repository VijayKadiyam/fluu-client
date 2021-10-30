<template>
  <div class="main-content">
    <breadcumb :page="'Near Miss List'" :folder="'Near Misses'" />
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
            to="/app/near-misses/create"
            ><i class="i-Add text-white mr-2"> </i>Add Near Miss
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <div v-if="props.column.field == 'button'">
            <a :href="'/app/near-misses/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
            <!-- <a :href="'/app/near_misses/' + props.row.id +'/psc-inspections'">
              <i class="i-Add text-25 text-success mr-2"></i>
              </a
            > -->
          </div>
          <span v-if="props.column.field == 'number_reported' && props.row.number_reported">
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
      near_misses: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let near_misses = await axios.get(`near_misses`);
      this.near_misses = near_misses.data.data;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
