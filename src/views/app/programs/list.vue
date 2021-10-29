<template>
  <div class="main-content">
    <breadcumb :page="'Programs | List'" :folder="'Programs'" />
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
        :rows="programs"
      >
      <div slot="table-actions" class="mb-3">
          <b-button variant="primary" class="btn-rounded d-none d-sm-block"  to="/app/programs/create"
            ><i class="i-Add text-white mr-2"> </i>Add Program
          </b-button>
        </div>
        <div slot="table-actions" class="mb-3">
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <a :href="'/app/programs/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</a
            >
            <a :href="'/app/programs/' + props.row.id +'/program-tasks'">
              <i class="i-Add text-25 text-success mr-2"></i>
              </a
            >
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
    title: "Program List",
  },
  data() {
    return {
      columns: [
        {
          label: "Program Name",
          field: "program_name",
        },
        {
          label: "Program Description",
          field: "program_description",
        },
        {
          label: "Instructor",
          field: "instructor",
        },
        {
          label: "Hours",
          field: "hours",
        },
        {
          label: "Action",
          field: "button",
        },
      ],
      programs: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let programs = await axios.get(
        `/programs`
      );
      this.programs = programs.data.data;
      this.count = programs.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  }
};
</script>
<style >
</style>