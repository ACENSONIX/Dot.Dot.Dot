import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "sass",
    label: "sass",
    value: 79,
    color: "hsl(138, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 343,
    color: "hsl(290, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 266,
    color: "hsl(330, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 278,
    color: "hsl(314, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 439,
    color: "hsl(204, 70%, 50%)",
  },
];

const RiskChart = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.25}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "nivo" }}
    borderWidth={1}
    borderColor={{ from: "color" }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor='#fff'
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    transitionMode='middleAngle'
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 80,
        itemHeight: 18,
        itemTextColor: "#fff",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#eee",
            },
          },
        ],
      },
    ]}
  />
);

export default RiskChart;
