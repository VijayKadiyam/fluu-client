<template>
  <div class="main-content">
    <breadcumb :page="'Version 5'" :folder="'Dashboard'" />

    <b-row>
      <b-col md="12" class="mb-30">
        <b-card class="h-100">
          <b-dropdown
            variant="primary"
            id="dropdown-1"
            text="Filter"
            class="mb-2 mr-2"
          >
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="Month" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="Business Unit" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="Division" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="Fleet Group" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="OwnerGroup" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="dropdown-1" text="Vessel Name" class="mb-2 mr-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item active>Active action</b-dropdown-item>
            <b-dropdown-item disabled>Disabled action</b-dropdown-item>
          </b-dropdown>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="8" class="mb-30">
        <b-card>
          <h4 class="heading display-4 text-primary">Dashboard For Sept2021</h4>
          <!-- <h4 class=" text-primary">-Thome Group</h4> -->
        </b-card>
      </b-col>
      <b-col md="4" class="mb-30">
        <b-card>
          <b-row>
            <b-col md="6">
              <b-button variant="primary ripple m-1"
                >Previous Qtr: 3Q21</b-button
              >
            </b-col>
            <b-col md="6">
              <b-button variant="primary ripple m-1"
                >Year-to-Date
                <br />
                (Jan21-Sep21)</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-button variant="primary ripple m-1"
                >Previous Year: 2021</b-button
              >
            </b-col>
            <b-col md="6">
              <b-button variant="primary ripple m-1"
                >Rolling 12 Months <br />(Sep20 - Aug21)</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <breadcumb :page="'Fleet Profile'" />
    <b-row>
      <b-col lg="12" md="12" sm="12">
        <b-card title="Vessels in management" class="mb-30">
          <b-row>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-Data-Upload"></i>
                <p class="text-muted mt-2 mb-2">
                  No of Vessels <br />
                  (as of 24vSep 21)
                </p>
                <p class="text-primary text-24 line-height-1 m-0">218</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-Add-User"></i>
                <p class="text-muted mt-2 mb-2">Taken Over <br />(Sep2021)</p>
                <p class="text-primary text-24 line-height-1 m-0">+1</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-Money-2"></i>
                <p class="text-muted mt-2 mb-2">Handed Over <br />(Sep2021)</p>
                <p class="text-primary text-24 line-height-1 m-0">-0</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon-big text-center mb-30">
                <i class="i-Money-2"></i>
                <p class="text-muted mt-2 mb-2">
                  Tank Division <br />(as of 24 Sep 2021)
                </p>
                <p class="line-height-1 text-title text-18 mt-2 mb-0">121</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon-big text-center mb-30">
                <i class="i-Gear"></i>
                <p class="text-muted mt-2 mb-2">
                  Bulk Division <br />(as of 24 Sep 2021)
                </p>
                <p class="line-height-1 text-title text-18 mt-2 mb-0">75</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon-big text-center mb-30">
                <i class="i-Bell"></i>
                <p class="text-muted mt-2 mb-2">
                  Offshore <br />(as of 24 Sep 2021)
                </p>
                <p class="line-height-1 text-title text-18 mt-2 mb-0">22</p>
              </b-card>
            </b-col>
            <b-col lg="12" md="6" sm="6">
              <b-card class="card-icon-big text-center mb-30">
                <i class="i-Bell"></i>
                <p class="text-muted mt-2 mb-2">Average Age (yrs)</p>
                <p class="line-height-1 text-title text-18 mt-2 mb-0">9.75</p>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <breadcumb :page="'Fleet Management'" />
    <b-row>
      <b-col lg="6" md="12" sm="12">
        <b-card title="Port State Control" class="mb-30">
          <b-row>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-File-Clipboard-File--Text"></i>
                <p class="text-muted mt-2 mb-2">
                  No of Detentios <br />
                  (Sep 21)
                </p>
                <p class="text-primary text-24 line-height-1 m-0">0</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-File-Copy-2"></i>
                <p class="text-muted mt-2 mb-2">
                  No. of Code 30 <br />(Sep2021)
                </p>
                <p class="text-primary text-24 line-height-1 m-0">0</p>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-File-Copy"></i>
                <p class="text-muted mt-2 mb-2">
                  No. of Code 17 <br />(Sep2021)
                </p>
                <p class="text-primary text-24 line-height-1 m-0">25</p>
              </b-card>
            </b-col>
            <b-col md="12" lg="12" sm="6">
              <b-card title="PSC Def Ratio : 1.48 (Sep2021)" class=" mb-30">
                <div id="basicArea-chart">
                  <apexchart
                    type="radialBar"
                    height="350"
                    :options="PSCDEfRatio.chartOptions"
                    :series="PSCDEfRatio.series"
                  />
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="6" md="12" sm="12">
        <b-card title="Safety" class="mb-30">
          <b-row>
            <b-col md="12" lg="8" sm="6">
              <b-card title="LTIF (Sep2021)" class=" mb-30">
                <div id="basicArea-chart">
                  <apexchart
                    type="radialBar"
                    height="350"
                    :options="LTIF.chartOptions"
                    :series="LTIF.series"
                  />
                </div>
              </b-card>
            </b-col>
            <b-col lg="4" md="6" sm="6">
              <b-card class="card-icon text-center mb-30">
                <i class="i-Medicine"></i>
                <p class="text-muted mt-2 mb-2">
                  No of Injuries <br />
                  (Sep2021)
                </p>
                <p class="text-primary text-24 line-height-1 m-0">218</p>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12" lg="8" sm="6">
              <b-card title="TRCF (Sep2021)" class=" mb-30">
                <div id="basicArea-chart">
                  <apexchart
                    type="radialBar"
                    height="350"
                    :options="TRCF.chartOptions"
                    :series="TRCF.series"
                  />
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" xl="2" md="6" sm="6">
        <b-card title="Incidents" class="card-icon text-center mb-0">
          <i class="i-Heart1"></i>
          <p class="text-muted mt-2 mb-2">
            No of Incidents
          </p>
          <p class="text-primary text-30 line-height-1 m-0">12</p>
        </b-card>
      </b-col>
      <b-col lg="6" xl="4" md="6" sm="6">
        <b-card title="Overdue Technical Deficiency" class="mb-30 o-hidden">
          <b-row>
            <b-col lg="6" xl="6" md="6" sm="6">
              <b-card class="card-icon text-center">
                <i class="i-Check"></i>
                <p class="text-muted mt-2 mb-2">
                  Critical TDL
                </p>
                <p class="text-primary text-30 line-height-1 m-0">12</p>
              </b-card>
            </b-col>
            <b-col lg="6" xl="6" md="6" sm="6">
              <b-card class="card-icon text-center">
                <i class="i-Check"></i>
                <p class="text-muted mt-2 mb-2">
                  Non Critical TDL
                </p>
                <p class="text-primary text-30 line-height-1 m-0">12</p>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="6" xl="2" md="6" sm="6">
        <b-card title="Sire" class="card-icon text-center mb-0">
          <i class="i-Heart1"></i>
          <p class="text-muted mt-2 mb-2">
            Obs / Ins:0.90
          </p>
          <p class="text-primary text-30 line-height-1 m-0">12</p>
        </b-card>
      </b-col>
      <b-col lg="6" xl="4" md="6" sm="6">
        <b-card title="Overdue Planned Maintenance" class="mb-30 o-hidden">
          <b-row>
            <b-col lg="6" xl="6" md="6" sm="6">
              <b-card class="card-icon text-center">
                <i class="i-Check"></i>
                <p class="text-muted mt-2 mb-2">
                  Critical:
                </p>
                <p class="text-primary text-30 line-height-1 m-0">12</p>
              </b-card>
            </b-col>
            <b-col lg="6" xl="6" md="6" sm="6">
              <b-card class="card-icon text-center">
                <i class="i-Check"></i>
                <p class="text-muted mt-2 mb-2">
                  Non Critical:
                </p>
                <p class="text-primary text-30 line-height-1 m-0">12</p>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { spark3, radialBar } from "@/data/apexChart";
import {
  splineAreaWidget,
  splineAreaWidgetTwo,
  splineAreaWidgetThree,
  splineAreaWidgetFour,
} from "@/data/widgetStatistics";
import { stackedPie } from "@/data/echarts";
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v5",
  },
  props: {
    title: {
      type: String,
      default: "Awesome Wizard",
    },
  },
  data() {
    return {
      selected: "x",
      options: [
        { value: "x", text: " select an option" },
        { value: "a", text: "January" },
        { value: "b", text: "February" },
      ],
      splineAreaWidget,
      splineAreaWidgetTwo,
      splineAreaWidgetThree,
      // semiCircleGauge,
      PSCDEfRatio,
      LTIF,
      TRCF,
      splineAreaWidgetFour,
      radialBar,
      stackedPie,
      spark3,
      values: [30, 20],
      max: 100,

      // list
      columns: [
        {
          label: "Thumbnail ",
          field: "img",
          width: "100px",
          tdClass: "gull-border-none text-left",
        },
        {
          label: "Title",
          field: "span",
          html: true,
          tdClass: "gull-border-none text-left",
        },
        {
          label: "Status",
          field: "status",
          html: true,
          tdClass: "text-left gull-border-none",
          thClass: "text-left",
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-mm-dd",
          dateOutputFormat: "mmm Do yy",
          tdClass: "text-left gull-border-none",
          thClass: "text-left",
        },
        {
          label: "Progress",
          field: "progressbar",
          html: true,
          tdClass: "text-left gull-border-none",
          thClass: "text-left",
        },
      ],
      rows: [
        {
          id: 1,
          img: require("@/assets/images/products/speaker-1.jpg"),
          status: '<span class="badge badge-danger">Cancel</span>',
          span: "Wireless Bluetooth V4.0 ",
          createdAt: "2011-10-28",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-success" role="progressbar" style="width: 25%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div>',
        },
        {
          id: 2,
          img: require("@/assets/images/products/speaker-2.jpg"),
          status: '<span class="badge badge-warning">Pending</span>',
          span: "Portable Speaker with HD Sound",
          createdAt: "2011-10-28",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-primary" role="progressbar" style="width: 50%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">50%</div></div>',
        },
        {
          id: 3,
          img: require("@/assets/images/products/headphone-2.jpg"),
          status: '<span class="badge badge-success">Success</span>',
          span: "Lightweight On-Ear",
          createdAt: "2011-10-30",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-danger" role="progressbar" style="width: 75%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">75%</div></div>',
        },
        {
          id: 4,
          img: require("@/assets/images/products/watch-1.jpg"),
          status: '<span class="badge badge-danger">Cancel</span>',
          span: "Automatic-self-wind mens ",
          createdAt: "2011-10-11",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-info" role="progressbar" style="width: 100%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">100%</div></div>',
        },
        {
          id: 5,
          img: require("@/assets/images/products/watch-1.jpg"),
          status: '<span class="badge badge-primary">Approved</span>',
          span: "Automatic-self-wind ",
          createdAt: "2011-10-21",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-warning" role="progressbar" style="width: 80%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">80%</div></div>',
        },
        {
          id: 6,
          img: require("@/assets/images/products/headphone-3.jpg"),
          status: '<span class="badge badge-info">Pending</span>',
          span: "On-Ear Headphones - Black",
          createdAt: "2011-10-28",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-success" role="progressbar" style="width: 25%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div></div>',
        },
        {
          id: 7,
          img: require("@/assets/images/products/headphone-2.jpg"),
          status: '<span class="badge badge-success">Pending</span>',
          span: "Lightweight On-Ear Headphones - Black",
          createdAt: "2011-10-30",
          progressbar:
            '<div class="progress progress--height mt-1" ><div class="progress-bar bg-danger" role="progressbar" style="width: 75%; " aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">75%</div></div>',
        },
      ],
    };
  },
  methods: {
    onComplete: function() {
      this.$swal({
        position: "top-end",
        type: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    },

    // for vue-good-table testing
    rowStyleClassFn(row) {
      return row.age > 18 ? "green" : "red";
    },
  },
};

// start::PSCDEfRatio
export const PSCDEfRatio = {
  series: [50],
  chartOptions: {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 15,
            fontSize: "22px",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  },
};
// start::LTIF
export const LTIF = {
  series: [0],
  chartOptions: {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 15,
            fontSize: "22px",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  },
};
// start::TRCF
export const TRCF = {
  series: [10],
  chartOptions: {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 15,
            fontSize: "22px",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  },
};
</script>
<style>
.gull-border-none {
  border-bottom: none !important;
}
table.tableOne.vgt-table {
  border: none;
}
table.vgt-table td {
  padding: 8px;
}
</style>
