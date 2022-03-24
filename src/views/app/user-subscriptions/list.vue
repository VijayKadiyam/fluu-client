<template>
  <div class="main-content">
    <breadcumb :page="'User Subscription List'" :folder="'User Subscriptions'" />
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
        :rows="user_subscriptions"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-subscriptions/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Subscription
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/user-subscriptions/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Subscription Details"
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
    title: "User Subscription Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "User Name",
          field: "user.first_name",
        },
        {
          label:"Date",
          field:"date",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      user_subscriptions: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let user_subscriptions = await axios.get(`user_subscriptions`);
      this.user_subscriptions = user_subscriptions.data.data;
      console.log(this.user_subscriptions);
      // this.count = user_subscriptions.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
