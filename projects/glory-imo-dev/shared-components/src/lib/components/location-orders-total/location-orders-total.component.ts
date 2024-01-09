import { Component, Input, OnInit } from "@angular/core";
import { ApexAxisChartSeries, ApexDataLabels } from "ng-apexcharts";
import {
  ChartOptions,
  DEFAULT_COLOR_TEXT,
  DEFAULT_OPTIONS_CHART,
  FONT_SIZE_LABEL,
  FONT_SIZE_NUMBER,
  FONT_WEIGHT,
  SVGNS,
} from "./location-orders-total.constant";
import { ILabelColor } from "./location-orders-total.i";

@Component({
  selector: "imo-location-orders-total",
  templateUrl: "./location-orders-total.component.html",
  styleUrls: ["./location-orders-total.component.scss"],
})
export class LocationOrdersTotalComponent implements OnInit {
  ngOnInit(): void {
    this.options.chart.events = {
      animationEnd: this.animationEnd,
    };
    this.options.tooltip.y = {
      formatter: this.handleFormatLabels,
    };
  }

  @Input() titleChart: string;
  @Input() set data(data: ILabelColor[]) {
    this.dataLocationOrdersWeekToDate = [];
    const updatedProducts = [];
    const colors = [];
    data.forEach((item) => {
      updatedProducts.push({ x: item.label, y: item.value });
      colors.push(item.bgColor);
      this.dataLocationOrdersWeekToDate.push({
        ...item,
        label: (item.label.length <= 13 && item.label) || `${item.label.slice(0, 13)}...`,
      });
    });
    this.series = [
      {
        data: updatedProducts,
      },
    ];
    this.colors = colors;
  }
  public dataLocationOrdersWeekToDate: ILabelColor[] = [];
  public series: ApexAxisChartSeries;
  public colors: string[];
  public options: ChartOptions = DEFAULT_OPTIONS_CHART;
  public dataLabels: ApexDataLabels;

  animationEnd = (chartContext) => {
    setTimeout(() => {
      const nativeElement = chartContext.el;
      const element = nativeElement.querySelectorAll(".apexcharts-treemap-series rect");
      element.forEach((item, index) => {
        const { x, y, width, height } = item.getBBox();
        const SVG = document.createElementNS(SVGNS, "svg");
        const parentSVG = document.createElementNS(SVGNS, "g");
        const childSVG1 = document.createElementNS(SVGNS, "text");
        const childSVG2 = document.createElementNS(SVGNS, "text");
        const stepX = 8;
        const stepY = 22;
        SVG.setAttributeNS(null, "x", x.toString());
        SVG.setAttributeNS(null, "y", y.toString());
        const { twoDSeriesX } = chartContext.data;
        const locationName =
          (twoDSeriesX[index]?.length &&
            ((twoDSeriesX[index].length <= 13 && twoDSeriesX[index]) || `${twoDSeriesX[index].slice(0, 13)}...`)) ||
          "";
        const textNode = document.createTextNode(locationName);
        childSVG1.setAttributeNS(null, "x", stepX.toString());
        childSVG1.setAttributeNS(null, "y", stepY.toString());

        childSVG1.setAttributeNS(null, "font-size", FONT_SIZE_LABEL);
        childSVG1.setAttributeNS(null, "fill", DEFAULT_COLOR_TEXT);
        childSVG1.setAttributeNS(null, "font-weight", FONT_WEIGHT);
        childSVG1.appendChild(textNode);

        const tempNumber = this.handleFormatLabels(chartContext.data.twoDSeries[index]);

        const numberNode = document.createTextNode(tempNumber);
        childSVG2.setAttributeNS(null, "x", stepX.toString());
        childSVG2.setAttributeNS(null, "y", (stepY * 2).toString());
        childSVG2.setAttributeNS(null, "font-size", FONT_SIZE_NUMBER);
        childSVG2.setAttributeNS(null, "fill", DEFAULT_COLOR_TEXT);
        childSVG2.setAttributeNS(null, "font-weight", FONT_WEIGHT);
        childSVG2.appendChild(numberNode);
        parentSVG.appendChild(childSVG1);
        parentSVG.appendChild(childSVG2);
        SVG.appendChild(parentSVG);
        item.after(SVG);
        const { width: maxWidth, height: maxHeight } = parentSVG.getBBox();
        const innerWidth = maxWidth + stepX * 2;
        const innerHeight = maxHeight + stepX * 2;

        let scaleMin = 0;
        const transform = [];

        if (innerWidth > width && width < height) {
          transform.push("rotate(90deg)");
          childSVG1.setAttributeNS(null, "x", "8");
          childSVG1.setAttributeNS(null, "y", "-30");
          childSVG2.setAttributeNS(null, "x", "8");
          childSVG2.setAttributeNS(null, "y", "-8");
          let scaleMin1 = 1,
            scaleMin2 = 1;
          if (innerHeight > width) {
            scaleMin1 = width / innerHeight;
          }
          if (innerWidth > height) {
            scaleMin2 = height / innerWidth;
          }
          scaleMin = Math.min(scaleMin1, scaleMin2);
          transform.push(`scale(${scaleMin})`);
        } else {
          let scaleMin1 = 1,
            scaleMin2 = 1;
          if (innerHeight > height) {
            scaleMin1 = height / innerHeight;
          }
          if (innerWidth > width) {
            scaleMin2 = width / innerWidth;
          }
          scaleMin = Math.min(scaleMin1, scaleMin2);
          transform.push(`scale(${scaleMin})`);
        }
        parentSVG.style.transform = transform.join(" ");
      });
    }, 100);
  };
  public handleFormatLabels = (value) => {
    return this.dataLocationOrdersWeekToDate.find((item) => item.value === value)?.current || "";
  };
}
