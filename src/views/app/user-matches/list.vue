<template>
  <div class="main-content">
    <breadcumb :page="'User Match List'" :folder="'User matches'" />
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
        :rows="user_matches"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-matches/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Match
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/user-matches/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User matche Details"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
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
    title: "User Match Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "User Name",
          field: "user.first_name",
        },
        {
          label: "Matched Name",
          field: "matched_user.first_name",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      user_matches: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let user_matches = await axios.get(`user_matches`);
      this.user_matches = user_matches.data.data;
      console.log(this.user_matches);
      // this.count = user_matches.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
