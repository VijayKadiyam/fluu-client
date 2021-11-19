<template>
  <div class="main-content">
    <breadcumb :page="'Viq Chapter List'" :folder="'Viq Chapters'" />
    <!-- <div class="wrapper"> -->
    <b-card>
      <vue-good-table
        :columns="columns"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records'
        }"
        styleClass="tableOne vgt-table"
        :rows="viqChapters"
      >
        <div slot="table-actions" class="mb-3">
          <b-button variant="primary" class="btn-rounded d-none d-sm-block"  to="/app/viq-chapters/create"
            ><i class="i-Add text-white mr-2"> </i>Add Viq Chapter
          </b-button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'button'">
            <router-link :to="'/app/viq-chapters/' + props.row.id">
              <i class="i-Eraser-2 text-25 text-success mr-2"></i>
              {{ props.row.button }}</router-link
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
    title: "ViqChaptersList"
  },
  data() {
    return {
      // foods: ["apple", "orrange"],
      columns: [
        {
          label: "Serial Number",
          field: "serial_no"
        },
        {
          label: "Chapter",
          field: "chapter_name"
        },
        {
          label: "Action",
          field: "button",
          html: true,
          tdClass: "text-right",
          thClass: "text-right"
        }
      ],
      viqChapters:[],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(page = 1) {
      this.isLoading = true;
      let viqChapters = await axios.get(
        `/viq_chapters?page=${page}&rowsPerPage=${this.rowsPerPage}&search=all`
      );
      this.viqChapters = viqChapters.data.data;
      this.count = viqChapters.data.count;
      this.serialNoStarting = (page - 1) * this.rowsPerPage;
      this.isLoading = false;
    },
  }
};
</script>
<style >
</style>
