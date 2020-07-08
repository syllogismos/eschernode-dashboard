/* eslint-disable prefer-rest-params */
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { ThemeColors } from '../../helpers/ThemeColors';

const TimeSeries = ({ data, shadow = false }) => {
  const chartContainer = useRef(null);
  const [, setChartInstance] = useState(null);

  useEffect(() => {
    const clicks = {
      label: 'Clicks',
      borderColor: ThemeColors().primaryColor,
      data: data.clicks,
    };
    const conversions = {
      label: 'Conversions',
      borderColor: ThemeColors().themeColor1,
      data: data.conversions,
    };
    const dms = {
      label: 'Messages',
      borderColor: ThemeColors().themeColor2,
      data: data.dms,
    };

    // const s2 = {
    //   label: 's2',
    //   borderColor: 'red',
    //   data: [
    //     { x: '2017-01-07 18:00:00', y: 90 },
    //     { x: '2017-01-08 18:00:00', y: 105 },
    //   ],
    // };
    if (chartContainer && chartContainer.current) {
      const context = chartContainer.current.getContext('2d');
      const newChartInstance = new Chart(context, {
        type: shadow ? 'lineWithShadow' : 'line',
        options: {
          scales: {
            xAxes: [
              {
                type: 'time',
              },
            ],
          },
        },
        data: { datasets: [dms, clicks, conversions] },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, data, shadow]);

  return <canvas ref={chartContainer} />;
};

export default TimeSeries;
