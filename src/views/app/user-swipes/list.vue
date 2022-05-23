<template>
  <div class="main-content">
    <breadcumb :page="'User Swipe List'" :folder="'User Swipes'" />
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
        :rows="user_swipes"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-swipes/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Swipe
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/user-swipes/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Swipe Details"
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
    title: "User Swipe Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "User Name",
          field: "user.first_name",
        },
        {
          label: "Date",
          field: "date",
        },
        {
          label: "No of S wipes",
          field: "no_of_swipes",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      user_swipes: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let user_swipes = await axios.get(`user_swipes`);
      this.user_swipes = user_swipes.data.data;
      console.log(this.user_swipes);
      // this.count = users.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
