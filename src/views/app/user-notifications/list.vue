<template>
  <div class="main-content">
    <breadcumb :page="'User Notification List'" :folder="'User Notifications'" />
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
        :rows="users"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-notifications/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Notification
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link
              :to="'/app/user-notifications/' + props.row.id"
              class="btn btn-primary d-none d-sm-block mb-2 mr-2"
              v-b-tooltip.hover
              title="Edit User Notification Details"
            >
              <i class="i-Eraser-2"></i> EDIT
            </router-link>
          </span>
          <span v-else-if="props.column.field == 'is_active'">
            {{ props.row.is_active == 1 ? "Active" : "InActive" }}
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
    title: "User Notification Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "First Name",
          field: "user.first_name",
        },
        {
          label: "Last Name",
          field: "user.last_name",
        },
        {
          label: "Middle Name",
          field: "user.middle_name",
        },
        {
          label: "Notifocation",
          field: "notifications.description",
        },
        {
          label: "Active",
          field: "is_active",
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
      users: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.isLoading = true;
      let users = await axios.get(`user_notifications`);
      this.users = users.data.data;
      // this.count = users.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
