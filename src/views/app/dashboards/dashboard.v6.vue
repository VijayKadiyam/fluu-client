<template>
  <div class="main-content">
    <breadcumb :page="'Version 6'" :folder="'Dashboard'" />
    <b-row>
      <b-col md="12" class="mb-30">
        <b-card>
          <h4 class="heading display-4 text-primary">
            Near Miss Q1 - Q2 CY2021
          </h4>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" lg="6" sm="6">
        <b-card title="Near Miss Category" class=" mb-30">
          <div id="basicArea-chart">
            <apexchart
              type="donut"
              width="100%"
              :options="NearMissCategory.chartOptions"
              :series="NearMissCategory.series"
            />
          </div>
        </b-card>
      </b-col>
      <b-col md="6" lg="6" sm="6">
        <b-card title="Near Miss Activity" class=" mb-30">
          <div id="basicArea-chart">
            <apexchart
              type="donut"
              width="100%"
              :options="NearMissActivity.chartOptions"
              :series="NearMissActivity.series"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" lg="12">
        <b-card title="Near Miss - Top 6 Basic Causes" class=" mb-30">
          <div id="basicArea-chart" style="min-height: 365px">
            <apexchart
              type="bar"
              height="350"
              :options="TopBasicCauses.chartOptions"
              :series="TopBasicCauses.chartOptions.series"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" lg="12" xl="12" class=" mb-30">
        <b-card
          title="Break description of few Near Misses "
          class="text-left "
        >
          <h4>A. Maintenance</h4>
          <b-list-group title="Maintenance">
            <b-list-group-item
              >While doing overhauling of fire & bilge pump and tightening the
              bolts by an open spanner, one crew member lost his balance while
              the open spanner slipped. The team member working with him
              prevented him from slipping and injuring
              himself.</b-list-group-item
            >
            <b-list-group-item
              >One crew member entered the provision room for inspection after
              informing the Galley staff and Duty Engineer. While coming out of
              the Meat room he unable to open the room door due to which he
              sounded the alarm. Nearby working galley personal thought, the
              same was a fire alarm and did not respond to locked crew
              member</b-list-group-item
            >
            <b-list-group-item
              >Wilden pump was being rigged in engine room for cleaning, while
              connecting air hose suddenly nazzle came out under pressure and
              hose nearly missed the crew.</b-list-group-item
            >
            <b-list-group-item
              >Crew member was transferring bilge water from E/R bilges through
              Bilge pump. The bilge pump was started without line up which
              thereby caused the relief valve to lift and subsequently the pump
              was stopped.
            </b-list-group-item>
            <b-list-group-item
              >Rainwater got accumulated in the funnel deck due to choked
              scupper. During heavy weather condition water started pouring
              inside through the trucking's leading to the boiler burner tray
              where all electrical generator. Personals were told to vacate the
              space at once.</b-list-group-item
            >
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="mb-30">
        <b-card>
          <h5 class="heading display-5 text-primary">
            Unsafe Acts/Conditions (Stop Cards) Q1 - Q2 CY2021
          </h5>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" md="12">
        <b-card
          title="Categorization - Unsafe Acts & Conditions"
          class=" mb-30"
        >
          <div class="chart-wrapper" style="height: 600px">
            <v-chart
              :options="CategorizationUnsafeAct"
              :autoresize="true"
            ></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <breadcumb :page="'Focus areas based on External Audit observations'" />
    <h5 class="heading text-primary">
      A. PPE - Common & repetitive unsafe Acts & Conditions
    </h5>
    <b-row>
      <b-col lg="6" md="12">
        <b-card title="Top 5 - Activities With PPE Issues" class=" mb-30">
          <div class="chart-wrapper" style="height: 500px">
            <v-chart
              :options="ActivitiesWithPPEIssues"
              :autoresize="true"
            ></v-chart>
          </div>
        </b-card>
      </b-col>
      <b-col lg="6" xl="6" class="mb-30">
        <b-card>
          <div role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  href="#"
                  v-b-toggle.accordion-1
                  variant="primary"
                  >Painting</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-1"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <div class="ul-faq__list-detailst">
                      <!-- <div class="card-title">List of Table</div> -->
                      <div class="ul-widget-s6__items">
                        <div class="ul-widget-s6__item">
                          <span class="ul-widget-s6__badge">
                            <p class="badge-dot-primary ul-widget6__dot"></p>
                          </span>
                          <span class="ul-widget-s6__text">
                            During preparation, Handling paint & thinner without
                            proper gloves & Chemical googles
                          </span>
                        </div>
                        <div class="ul-widget-s6__item">
                          <span class="ul-widget-s6__badge">
                            <p class="badge-dot-success ul-widget6__dot"></p>
                          </span>
                          <span class="ul-widget-s6__text">
                            During painting, not wearing Chemical goggles
                          </span>
                        </div>
                      </div>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  href="#"
                  v-b-toggle.accordion-2
                  variant="primary"
                  >Chemical Handling</b-button
                >
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>
                    <div class="ul-faq__list-detailst">
                      <!-- <div class="card-title">List of Table</div> -->
                      <div class="ul-widget-s6__items">
                        <div class="ul-widget-s6__item">
                          <span class="ul-widget-s6__badge">
                            <p class="badge-dot-primary ul-widget6__dot"></p>
                          </span>
                          <span class="ul-widget-s6__text">
                            Stripping polish inside accommodation without
                            wearing gloves, Chemical googles and safety shoes.
                          </span>
                        </div>
                        <div class="ul-widget-s6__item">
                          <span class="ul-widget-s6__badge">
                            <p class="badge-dot-success ul-widget6__dot"></p>
                          </span>
                          <span class="ul-widget-s6__text">
                            Handling boiler Chemicals without Chemical googles
                          </span>
                        </div>
                      </div>
                    </div>
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { basicLine } from "@/data/echarts";
import { echart4, echart5 } from "@/data/dashboard2";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v6",
  },

  data: () => ({
    selected: "x",
    echart4,
    echart5,
    basicLine,
    NearMissCategory,
    NearMissActivity,
    TopBasicCauses,
    CategorizationUnsafeAct,
    ActivitiesWithPPEIssues,
  }),
  methods: {},
};

// start::NearMissCategory
export const NearMissCategory = {
  series: [44, 55, 41, 17, 10],
  chartOptions: {
    legend: {
      position: "bottom",
    },
    labels: [
      "Navigation",
      "Injury",
      "Equipment Failure",
      "Asset Damage",
      "Environment",
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    // legend: {
    //   formatter: function (val, opts) {
    //     return val + " - " + opts.w.globals.series[opts.seriesIndex]
    //   }
    // },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
// // start::NearMissActivity
// export const NearMissActivity = {
//   series: [44, 55, 41, 17, 10],
//   chartOptions: {
//     legend: {
//       position: "bottom",
//     },
//     labels: [
//       "Walkingg on Same Level",
//       "Injury",
//       "Equipment Failure",
//       "Asset Damage",
//       "Environment",
//     ],
//     dataLabels: {
//       enabled: false,
//     },
//     fill: {
//       type: "gradient",
//     },
//     // legend: {
//     //   formatter: function (val, opts) {
//     //     return val + " - " + opts.w.globals.series[opts.seriesIndex]
//     //   }
//     // },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//   },
// };

// start::NearMissActivity
export const NearMissActivity = {
  series: [3, 16, 2, 1, 2, 5, 1, 1],

  chartOptions: {
    legend: {
      position: "bottom",
    },
    labels: [
      "Walkingg on Same Level",
      "Maintenance",
      "Drill & Exercise",
      "Garbage Handling",
      "Manual Handling",
      "Mirroring",
      "Navigation",
      "Staring",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
// start::TopBasicCauses
export const TopBasicCauses = {
  chartOptions: {
    chart: {
      height: 350,
      type: "bar",
    },
    labels: [
      "Lack of Situational awareness/risk perception, risk awareness",
      "In adequate Work/Process Planning/ Programming",
      "In adequate Practice",
      "In adequate inspection/repair/maintenance",
      "In adequate implementation of Policies/Procedures/Practice",
      "In adequate Preventive Cleaning/resurfacing",
    ],
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#546E7A",
      "#26a69a",
      "#D10CE8",
    ],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: [9, 6, 5, 4, 2, 2],
      },
    ],
    xaxis: {
      categories: [
        "Lack of Situational awareness/risk perception, risk awareness",
        "In adequate Work/Process Planning/ Programming",
        "In adequate Practice",
        "In adequate inspection/repair/maintenance",
        "In adequate implementation of Policies/Procedures/Practice",
        "In adequate Preventive Cleaning/resurfacing",
      ],
      labels: {
        style: {
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#546E7A",
            "#26a69a",
            "#D10CE8",
          ],
          fontSize: "14px",
        },
      },
    },
  },
};
// start::CategorizationUnsafeAct
export const CategorizationUnsafeAct = {
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  color: ["#c13018", "#f36e12", "#ebcb37", "#a1b968", "#0d94bc", "#135bba"],
  tooltip: {
    show: false,
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  xAxis: [
    {
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],

  series: [
    {
      name: "Sessions",
      type: "pie",
      radius: ["80%", "50%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      hoverOffset: 5,
      label: {
        normal: {
          show: false,
          position: "center",
          textStyle: {
            fontSize: "13",
            fontWeight: "normal",
          },
          formatter: "{a}",
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "15",
            fontWeight: "bold",
          },
          formatter: "{b} \n{c} ({d}%)",
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        { value: 170, name: "PPE" },
        { value: 79, name: "Tools & Equipment " },
        { value: 62, name: "Working conditions" },
        { value: 236, name: "Procedures" },
        { value: 3, name: "Work Permit" },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
// start::ActivitiesWithPPEIssues
export const ActivitiesWithPPEIssues = {
  color: ["#c13018", "#f36d12", "#ebcb37", "#a0b967", "#0d94bc", "#04a9f4"],
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  tooltip: {
    show: true,
    backgroundColor: "rgba(0, 0, 0, .8)",
  },
  xAxis: [
    {
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],

  series: [
    {
      name: "Activities with PPE Issues",
      type: "pie",
      radius: "50%",
      center: "50%",
      data: [
        {
          value: 11,
          name: "Painting",
        },
        {
          value: 6,
          name: "Working Overside",
        },
        {
          value: 4,
          name: "Working Aloft",
        },
        {
          value: 8,
          name: "Chemical Handling",
        },
        {
          value: 5,
          name: "Buffing/Grinding",
        },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
