import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { colors } from "@mui/material";

const AttendanceGraph = () => {
  const data = [
    {
      id: "present",
      data: [
        { x: "Jan", y: 20 },
        { x: "Feb", y: 22 },
        { x: "Mar", y: 21 },
        { x: "Apr", y: 19 },
        { x: "May", y: 18 },
        { x: "Jun", y: 22 },
      ],
    },
    {
      id: "absent",
      data: [
        { x: "Jan", y: 2 },
        { x: "Feb", y: 0 },
        { x: "Mar", y: 1 },
        { x: "Apr", y: 3 },
        { x: "May", y: 4 },
        { x: "Jun", y: 0 },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: 25, stacked: true, reverse: false }}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Attendance",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      curve='monotoneX'
      enableGridX={false}
      enableGridY={true}
      colors={["#00C49F", "#FFBB28"]}
      lineWidth={3}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemWidth: 80,
          itemHeight: 20,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          itemOpacity: 0.75,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ point, color }) => {
        if (!point) {
          return null;
        }
        return (
          <div
            style={{
              background: "#fff",
              borderRadius: "4px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "12px",
              color: "#000",
              display: "grid",
              gridAutoFlow: "column",
              alignItems: "center",
              gap: "0.5em",
            }}>
            <div
              className='color'
              style={{ backgroundColor: color, height: "1em", width: "1em" }}></div>
            <span style={{ paddingRight: "12px" }}>{point.id}:</span>
            <span style={{ fontWeight: "600" }}>{point.data.y}</span>
          </div>
        );
      }}
    />
  );
};
export default AttendanceGraph;

/* 
[
    {
      month: "January",
      present: 20,
      absent: 2,
    },
    {
      month: "February",
      present: 22,
      absent: 0,
    },
    {
      month: "March",
      present: 21,
      absent: 1,
    },
    {
      month: "April",
      present: 19,
      absent: 3,
    },
    {
      month: "May",
      present: 18,
      absent: 4,
    },
    {
      month: "June",
      present: 22,
      absent: 0,
    },
  ];

<ResponsiveBar
        data={data}
        keys={["present", "absent"]}
        indexBy='month'
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={["#00C49F", "#FFBB28"]}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 32,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Attendance",
            legendPosition: "middle",
            legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor='#000'
        legends={[
            {
            dataFrom: "keys",
            anchor: "top-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            itemTextColor: colors.grey[200],
            effects: [
                {
                on: "hover",
                style: {
                    itemOpacity: 1,
                },
                },
            ],
            },
        ]}
        tooltip={data => (
            <div
            style={{
                background: "#fff",
                borderRadius: "4px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "12px",
                color: "#000",
                display: "grid",
                gridAutoFlow: "column",
                alignItems: "center",
                gap: "0.5em",
            }}>
            <div
                className='color'
                style={{ backgroundColor: data.color, height: "1em", width: "1em" }}></div>
            <span style={{ paddingRight: "12px" }}>{data.indexValue}:</span>
            <span style={{ fontWeight: "600" }}>{data.value}</span>
            </div>
        )}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        /> */
