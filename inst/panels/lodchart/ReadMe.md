### Reusable LOD score chart

A reusable chart for plotting LOD curves
across a genome, following
[Mike Bostock](http://bost.ocks.org/mike)'s
[Towards Reuseable Charts](http://bost.ocks.org/mike/chart/).

For an illustration of its use, see [test_lodchart.coffee](https://github.com/kbroman/qtlcharts/blob/master/inst/panels/lodchart/test/test_lodchart.coffee).

Add see it in action [here](http://www.biostat.wisc.edu/~kbroman/D3/panels/lodchart/test).

Here are all of the options:

```coffeescript
mychart = lodchart().lodvarname("lod")                                       # variable containing LOD to plot
                    .width(800)                                              # internal width of chart
                    .height(500)                                             # internal height
                    .margin({left:60, top:40, right:40, bottom:40, inner:5}) # margins
                    .axispos({xtitle:25, ytitle:30, xlabel:5, ylabel:5})     # spacing for axis titles and labels
                    .titlepos(20)                                            # spacing for panel title
                    .ylim(null)                                              # y-axis limits
                    .nyticks(5)                                              # no. y-axis ticks
                    .yticks(null)                                            # locations of y-axis ticks
                    .chrGap(8)                                               # gap between chromosomes in pixels
                    .darkrect(d3.rgb(200,200,200))                           # even chr rectangle color
                    .lightrect(d3.rgb(230,230,230))                          # odd chr rectangle color
                    .linecolor("darkslateblue")                              # color for LOD curves
                    .linewidth(2)                                            # width of LOD curves
                    .pointcolor("#E9CFEC")                                   # color of points a markers
                    .pointsize(0)                                            # radius of points at markers (0=hidden)
                    .title("")                                               # panel title
                    .xlab("Chromosome")                                      # x-axis label
                    .ylab("LOD score")                                       # y-axis label
```

Additional accessors:

```coffeescript
# x-axis scale
xscale = mychart.xscale()
xscale[chrname](pos)

# y-axis scale
yscale = mychart.yscale()
yscale(lod)

# function for plotting LOD curves, using 'path'
lodcurve = mychart.lodcurve()

# selection of points at markers, to add .on("click", ...)
markerSelect = mychart.markerSelect()
```
