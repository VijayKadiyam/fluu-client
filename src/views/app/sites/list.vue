<template>
  <div class="main-content">
    <breadcumb :page="'Site List'" :folder="'Sites'" />
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
        :rows="sites"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/sites/create"
            ><i class="i-Add text-white mr-2"> </i>Add Site
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/sites/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit Site Details"
              style="float: right; width: 30%"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'name'">
            <div class="ul-widget-app__profile-pic">
              <img alt="" />
              {{ props.row.name }}
            </div>
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
    title: "Sites List",
  },
  data() {
    return {
      foods: ["apple", "orrange"],
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Phone",
          field: "phone",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      sites: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let sites = await axios.get(
        `/sites?page=${page}&rowsPerPage=${this.rowsPerPage}&search=all`
      );
      this.sites = sites.data.data;
      this.count = sites.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
