<template>
  <div class="main-content">
    <breadcumb :page="'List'" :folder="'User Programs'" />
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
        :rows="user_programs"
      >
        <div slot="table-actions" class="mb-3">
          <b-button
            variant="primary"
            class="btn-rounded d-none d-sm-block"
            to="/app/user-programs/create"
            ><i class="i-Add text-white mr-2"> </i>Add User Program
          </b-button>
        </div>
        <div slot="table-actions" class="mb-3"></div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <a :href="'/app/user-programs/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
          </span>
          <span v-if="props.column.field == 'user'">
            {{ props.row.user.user_name || "" }}
          </span>
          <span v-if="props.column.field == 'program'">
            {{ props.row.program.program_name || "" }}
          </span>
          <span v-else-if="props.column.field == 'enrollment_date'">
            {{ props.row.enrollment_date }}
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
    title: "User Program List",
  },
  data() {
    return {
      columns: [
        {
          label: "User Name",
          field: "user",
        },
        {
          label: "Program Name",
          field: "program",
        },
        {
          label: "Enrollment Date",
          field: "enrollment_date",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "yyyy/MM/dd",
        },
        {
          label: "Action",
          field: "button",
        },
      ],
      user_programs: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let user_programs = await axios.get(`/user_programs`);
      this.user_programs = user_programs.data.data;
      this.count = user_programs.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
