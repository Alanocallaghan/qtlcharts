// Generated by CoffeeScript 1.12.5
HTMLWidgets.widget({
  name: "iplotScanone",
  type: "output",
  initialize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).append("svg").attr("width", width).attr("height", height).attr("class", "qtlcharts");
  },
  renderValue: function(widgetdiv, x) {
    var chartOpts, ref, ref1, ref2, svg, widgetid;
    svg = d3.select(widgetdiv).select("svg");
    svg.selectAll("*").remove();
    widgetid = d3.select(widgetdiv).attr('id');
    d3.selectAll("div.d3-tip." + widgetid).remove();
    chartOpts = (ref = x.chartOpts) != null ? ref : [];
    chartOpts.width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : svg.attr("width");
    chartOpts.height = (ref2 = chartOpts != null ? chartOpts.height : void 0) != null ? ref2 : svg.attr("height");
    svg.attr("width", chartOpts.width);
    svg.attr("height", chartOpts.height);
    if (x.pxg_type === "ci") {
      return iplotScanone_ci(widgetdiv, x.scanone_data, x.pxg_data, chartOpts);
    } else if (x.pxg_type === "raw") {
      return iplotScanone_pxg(widgetdiv, x.scanone_data, x.pxg_data, chartOpts);
    } else {
      return iplotScanone_noeff(widgetdiv, x.scanone_data, chartOpts);
    }
  },
  resize: function(widgetdiv, width, height) {
    return d3.select(widgetdiv).select("svg").attr("width", width).attr("height", height);
  }
});
