// Generated by CoffeeScript 1.9.0
HTMLWidgets.widget({
  name: "iplotRF",
  type: "output",
  initialize: function(el, width, height) {
    return d3.select(el).append("svg").attr("class", "qtlcharts");
  },
  renderValue: function(el, x) {
    return iplotRF(el, x.rfdata, x.genodata, x.chartOpts);
  },
  resize: function(el, width, height) {
    return null;
  }
});
