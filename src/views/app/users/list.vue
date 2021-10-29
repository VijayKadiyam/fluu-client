<template>
  <div class="main-content">
    <breadcumb :page="'User List'" :folder="'Users'" />
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
            to="/app/users/create"
            ><i class="i-Add text-white mr-2"> </i>Add User
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props" >
         
          <span v-if="props.column.field == 'button'" >
            <a :href="'/app/users/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
          </span>
          <span v-else-if="props.column.field == 'gender'">
            {{ props.row.gender == 0 ? "Male" : "Female" }}
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
    title: "User Lits",
  },
  data() {
    return {
      columns: [
        {
          label: "First Name",
          field: "first_name",
        },
        {
          label: "User Name",
          field: "user_name",
        },
        {
          label: "Gender",
          field: "gender",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Middle Name",
          field: "middle_name",
        },
        {
          label: "Date Of Birth",
          field: "dob",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "dd-MM-yyyy",
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
      let users = await axios.get(`users`);
      this.users = users.data.data;
      // this.count = users.data.count;
      // this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
