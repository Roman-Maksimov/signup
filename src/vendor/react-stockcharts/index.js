const {series, ...ReStockOriginal} = require("react-stockcharts");
const {...ReStockSeriesOriginal} = require("react-stockcharts").series;
const {...ReStockSeriesCustom} = require("./series");

const _series = {...ReStockSeriesOriginal, ...ReStockSeriesCustom};

export const ReStock = {...ReStockOriginal, series: _series};

export default ReStock;