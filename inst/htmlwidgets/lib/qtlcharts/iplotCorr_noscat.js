// Generated by CoffeeScript 2.1.1
var iplotCorr_noscat;

iplotCorr_noscat = function(widgetdiv, data, chartOpts) {
  var cells, chartdivid, corXscale, corYscale, corZscale, corcolors, corr, corr_tip, corrplot, cortitle, height, i, j, margin, min_paneldim, ncorrX, ncorrY, nind, nvar, panelheight, panelwidth, pixel_height, pixel_width, rectcolor, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, svg, widgetdivid, width, zlim;
  // data is an object with 7 components
  //   data.indID  vector of character strings, of length n, with IDs for individuals
  //   data.var    vector of character strings, of length p, with variable names
  //   data.corr   matrix of correlation values, of dim q x r, with q and r each <= p
  //   data.rows   vector of indicators, of length q, with values in {0, 1, ..., p-1},
  //                  for each row in data.corr, it says which is the corresponding column in data.dat
  //   data.cols   vector of indicators, of length r, with values in {0, 1, ..., p-1}
  //                  for each column in data.corr, it says which is the corresponding column in data.dat

  // chartOpts start
  height = (ref = chartOpts != null ? chartOpts.height : void 0) != null ? ref : 560; // height of each panel in pixels
  width = (ref1 = chartOpts != null ? chartOpts.width : void 0) != null ? ref1 : 1050; // total width of panels
  margin = (ref2 = chartOpts != null ? chartOpts.margin : void 0) != null ? ref2 : {
    left: 70,
    top: 40,
    right: 5,
    bottom: 70,
    inner: 5 // margins in pixels (left, top, right, bottom, inner)
  };
  corcolors = (ref3 = chartOpts != null ? chartOpts.corcolors : void 0) != null ? ref3 : [
    "darkslateblue",
    "white",
    "crimson" // heat map colors (same length as `zlim`)
  ];
  zlim = (ref4 = chartOpts != null ? chartOpts.zlim : void 0) != null ? ref4 : [
    -1,
    0,
    1 // z-axis limits
  ];
  rectcolor = (ref5 = chartOpts != null ? chartOpts.rectcolor : void 0) != null ? ref5 : "#E6E6E6"; // color of background rectangle
  cortitle = (ref6 = chartOpts != null ? chartOpts.cortitle : void 0) != null ? ref6 : ""; // title for heatmap panel
  // chartOpts end
  chartdivid = (ref7 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? ref7 : 'chart';
  // make sure list args have all necessary bits
  margin = d3panels.check_listarg_v_default(margin, {
    left: 70,
    top: 40,
    right: 5,
    bottom: 70,
    inner: 5
  });
  panelheight = height - margin.top - margin.bottom;
  panelwidth = width - margin.left - margin.right;
  // force panelheight == panelwidth by taking minimum of the two
  min_paneldim = d3.min([panelheight, panelwidth]);
  panelheight = min_paneldim;
  panelwidth = min_paneldim;
  widgetdivid = d3.select(widgetdiv).attr('id');
  svg = d3.select(widgetdiv).select("svg");
  // panel for correlation image
  corrplot = svg.append("g").attr("id", "corplot").attr("transform", `translate(${margin.left},${margin.top})`);
  // no. data points
  nind = data.indID.length;
  nvar = data.var.length;
  ncorrX = data.cols.length;
  ncorrY = data.rows.length;
  corXscale = d3.scaleBand().domain(d3.range(ncorrX)).range([0, panelwidth]);
  corYscale = d3.scaleBand().domain(d3.range(ncorrY)).range([panelheight, 0]);
  corZscale = d3.scaleLinear().domain(zlim).range(corcolors);
  pixel_width = corXscale(1) - corXscale(0);
  pixel_height = corYscale(0) - corYscale(1);
  // create list with correlations
  corr = [];
  for (i in data.corr) {
    for (j in data.corr[i]) {
      corr.push({
        row: i,
        col: j,
        value: data.corr[i][j]
      });
    }
  }
  corr_tip = d3.tip().attr('class', `d3-tip ${widgetdivid}`).html(function(d) {
    return d3.format(".2f")(d.value);
  }).direction('e').offset([0, 10]);
  corrplot.call(corr_tip);
  cells = corrplot.selectAll("empty").data(corr).enter().append("rect").attr("class", "cell").attr("x", function(d) {
    return corXscale(d.col);
  }).attr("y", function(d) {
    return corYscale(d.row);
  }).attr("width", Math.abs(corXscale(1) - corXscale(0))).attr("height", Math.abs(corYscale(0) - corYscale(1))).attr("fill", function(d) {
    return corZscale(d.value);
  }).attr("stroke", "none").attr("stroke-width", 2).on("mouseover", function(d) {
    d3.select(this).attr("stroke", "black");
    corr_tip.show(d);
    corrplot.append("text").attr("class", "corrlabel").attr("x", corXscale(d.col) + pixel_width / 2).attr("y", panelheight + margin.bottom * 0.2).text(data.var[data.cols[d.col]]).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
    return corrplot.append("text").attr("class", "corrlabel").attr("y", corYscale(d.row) + pixel_height / 2).attr("x", -margin.left * 0.1).text(data.var[data.rows[d.row]]).attr("dominant-baseline", "middle").attr("text-anchor", "end");
  }).on("mouseout", function(d) {
    corr_tip.hide(d);
    d3.selectAll("text.corrlabel").remove();
    return d3.select(this).attr("stroke", "none");
  });
  // boxes around panels
  corrplot.append("rect").attr("height", panelheight).attr("width", panelwidth).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1).attr("pointer-events", "none");
  // text above
  corrplot.append("text").text(cortitle).attr("id", "corrtitle").attr("x", panelwidth / 2).attr("y", -margin.top / 2).attr("dominant-baseline", "middle").attr("text-anchor", "middle");
  if (chartOpts.heading != null) {
    d3.select("div#htmlwidget_container").insert("h2", ":first-child").html(chartOpts.heading).style("font-family", "sans-serif");
  }
  if (chartOpts.caption != null) {
    d3.select("body").append("p").attr("class", "caption").html(chartOpts.caption);
  }
  if (chartOpts.footer != null) {
    return d3.select("body").append("div").html(chartOpts.footer).style("font-family", "sans-serif");
  }
};
