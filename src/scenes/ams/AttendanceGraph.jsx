import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { colors } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const AttendanceGraph = () => {
  const id = JSON.parse(localStorage.getItem("profile")).id;
  const [employee, setEmployee] = useState();
  useEffect(() => {
    const getEmployeeData = async () => {
      const { data } = await axios.get(`http://192.168.208.132:4000/user/employee/${id}`);
      console.log(data);
      setEmployee(
        data.user.map(e => ({
          Name: e.firstName + e.lastName,
          present: Math.ceil(Math.random() * 20),
          absent: Math.ceil(Math.random() * 20),
        }))
      );
    };
    getEmployeeData();
  }, [id]);

  const data = [
    {
      name: "Jane Doe",
      present: 20,
      absent: 2,
    },
    {
      name: "John Smith",
      present: 22,
      absent: 0,
    },
    {
      name: "Mason Gray",
      present: 21,
      absent: 1,
    },
    {
      name: "Emily Peterson",
      present: 19,
      absent: 3,
    },
    {
      name: "Olivia Reed",
      present: 18,
      absent: 4,
    },
    {
      name: "Charlotte Ellis",
      present: 22,
      absent: 0,
    },
  ];

  // if (!employee) return null;

  return (
    <ResponsiveBar
      data={data}
      keys={["present", "absent"]}
      indexBy='name'
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={["#00C49F", "#FFBB28"]}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "name",
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
    />
  );
};
export default AttendanceGraph;

/* 
[
    {
      name: "January",
      present: 20,
      absent: 2,
    },
    {
      name: "February",
      present: 22,
      absent: 0,
    },
    {
      name: "March",
      present: 21,
      absent: 1,
    },
    {
      name: "April",
      present: 19,
      absent: 3,
    },
    {
      name: "May",
      present: 18,
      absent: 4,
    },
    {
      name: "June",
      present: 22,
      absent: 0,
    },
  ];

<ResponsiveBar
        data={data}
        keys={["present", "absent"]}
        indexBy='name'
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={["#00C49F", "#FFBB28"]}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "name",
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
