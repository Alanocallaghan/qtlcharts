# iplotCorr: heatmap of correlation matrix linked to scatterplots
# Karl W Broman

HTMLWidgets.widget({

    name: "iplotCorr",
    type: "output",

    initialize: (widgetdiv, width, height) ->
        # prefer aspect ratio width/height = 2
        height = width/2 if height > width/2
        d3.select(widgetdiv).append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "qtlcharts")
        {x: null}

    renderValue: (widgetdiv, x, instance) ->
        this.doRenderValue(widgetdiv, x, instance)

    doRenderValue: (widgetdiv, x, instance) ->

        instance.x = x

        svg = d3.select(widgetdiv).select("svg")

        # clear svg and remove tool tips
        svg.selectAll("*").remove()
        widgetid = d3.select(widgetdiv).attr('id')
        d3.selectAll("div.d3-tip." + widgetid).remove()

        chartOpts = x.chartOpts ? [ ]
        width = chartOpts?.width ? widgetdiv.clientWidth
        height = chartOpts?.height ? widgetdiv.clientHeight

        # revise size of svg and div container
        svg.attr("width", width)
        svg.attr("height", height)

        if x.data.scatterplots
            iplotCorr(widgetdiv, x.data, chartOpts)
        else
            iplotCorr_noscat(widgetdiv, x.data, chartOpts)

    resize: (widgetdiv, width, height, instance) ->
        if (instance.x) 
            this.doRenderValue(widgetdiv, instance.x, instance)

})
