import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

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
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
      animate={true}
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
                itemTextColor: "#aaa",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RiskChart;
