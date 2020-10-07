import React, { useState, useEffect } from "react";
import rawData from "./data2.json";
import { Radar } from "react-chartjs-2";
import styles from "./Timeline.module.css";
import video from "./cam.mov";
import video2 from "./screen.mov";

let loopIndex = 0;

const labels = [
  "ANGRY",
  "CALM",
  "CONFUSED",
  "DISGUSTED",
  "FEAR",
  "HAPPY",
  "SAD",
  "SURPRISED",
];

const confidence = rawData.Faces.map((x) =>
  x.Face.Emotions.sort((a, b) => (a.Type > b.Type ? 1 : -1)).map(
    (emotion) => emotion.Confidence
  )
);
const dataPoints = rawData.Faces.length;

const options = {
  legend: {
    display: false,
  },
  scale: {
    ticks: {
      suggestedMin: 100,
      suggestedMax: 100,
      fontSize: 8,
    },
    pointLabels: {
      fontSize: 15,
    },
  },
};

const data = rawData.Faces;
const Timeline = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData({
        labels,
        datasets: [
          {
            // label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: confidence[loopIndex],
          },
        ],
      });
      loopIndex++;
      if (loopIndex > dataPoints - 1) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.videoContainer}>
          <video width='500px' height='760' controls autoPlay>
            <source src={video} type='video/mp4'></source>
          </video>
          <video width='500px' height='760' controls autoPlay>
            <source src={video2} type='video/mp4'></source>
          </video>
        </div>
        {chartData !== null && (
          <div className={styles.flexContainer}>
            <Radar data={chartData} options={options} />
          </div>
        )}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>TIME</th>
              <th>AGE RANGE</th>
              <th>SMILE</th>
              <th>ANGRY</th>
              <th>CALM</th>
              <th>CONFUSED</th>
              <th>DISGUSTED</th>
              <th>FEAR</th>
              <th>HAPPY</th>
              <th>SAD</th>
              <th>SURPRISED</th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((x, index) => {
                return (
                  <tr key={index}>
                    <td>{(x.Timestamp / 1000).toFixed(1)}s</td>
                    <td>
                      {x.Face.AgeRange.Low} - {x.Face.AgeRange.High}
                    </td>
                    <td>{x.Face.Smile.Value.toString()}</td>
                    {x.Face.Emotions.sort((a, b) =>
                      a.Type > b.Type ? 1 : -1
                    ).map((emotion, index) => {
                      return (
                        <td key={index}>{emotion.Confidence.toFixed(2)}%</td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>TIME</th>
              <th>AGE RANGE</th>
              <th>SMILE</th>
              <th>MUSTACHE</th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((x, index) => {
                return (
                  <tr key={index}>
                    <td>{(x.Timestamp / 1000).toFixed(1)}s</td>
                    <td>
                      {x.Face.AgeRange.Low} - {x.Face.AgeRange.High}
                    </td>
                    <td>{x.Face.Smile.Value.toString()}</td>
                    <td>{x.Face.Mustache.Value.toString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Timeline;
