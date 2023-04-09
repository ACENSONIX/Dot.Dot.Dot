import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme, Box, Typography } from "@mui/material";

const RiskChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      id: "RED",
      label: "RED",
      value: 79,
      color: colors.redAccent[500],
    },
    {
      id: "ORANGE",
      label: "ORANGE",
      value: 343,
      color: colors.orangeAccent[500],
    },
    {
      id: "YELLOW",
      label: "YELLOW",
      value: 266,
      color: colors.yellowAccent[500],
    },
    {
      id: "GREEN",
      label: "GREEN",
      value: 270,
      color: colors.greenAccent[500],
    },
  ];
  const color_scheme = data.map(d => d.color);
  return (
    <>
      <Typography variant='h1' padding='1rem'>
        Risk Distribution
      </Typography>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        // enableArcLabels={false}

        innerRadius={0.25}
        activeOuterRadiusOffset={8}
        colors={color_scheme}
        borderWidth={1}
        borderColor='#fff'
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor='#fff'
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor='#fff'
        arcLabelsSkipAngle={10}
        arcLabelsTextColor='#fff'
        transitionMode='middleAngle'
        radialLabelsTextColor='#fff'
        slicesLabelsTextColor='#000'
        animate={true}
        tooltip={data => (
          <Box display='grid' gridAutoFlow='column' alignItems='center' gap='0.25em'>
            <Box backgroundColor={data.color} height='1rem' width='1rem'></Box>
            <Typography color='#000'>
              {data.value} {data.id}
            </Typography>
          </Box>
        )}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 10,
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
                  itemTextColor: "#aaa",
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
                fontSize: "2rem",
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
      />
    </>
  );
};

export default RiskChart;
