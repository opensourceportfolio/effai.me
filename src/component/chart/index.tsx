import { Chart, ChartOptions } from 'chart.js';
import debounce from 'debounce';
import { TooltipItem, TooltipItems } from 'model/chart';
import { identity } from 'ramda';
import * as React from 'react';
import { toModel } from 'service/chart';

export interface Tooltips {
  title: (t: TooltipItems) => string;
  label: (t: TooltipItem) => string;
}

export interface Plot {
  x: number[];
  y: number[][];
}

export interface Formatter {
  x?: (v: number) => number | string;
  y?: (v: number) => number;
}

export interface ChartText {
  title: string;
  tooltips: Tooltips;
  legend: string[];
}

export interface Props {
  type: 'bar' | 'line';
  plot: Plot;
  formatter: Formatter;
  text: ChartText;
}

export default class ChartComponent extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.update = debounce(() => {
      const { plot, text } = this.props;
      const data = this.deriveData(plot, text);

      if (this.chart && this.chart.data && this.chart.data.datasets) {
        this.chart.data.datasets.forEach((dataset, i) => {
          dataset.data = data.datasets[i].data;
        });
        this.chart.data.labels = data.labels;
        this.chart.update();
      }
    }, 350);
  }

  private update: () => void;

  private chart?: Chart = undefined;

  private chartEl: HTMLCanvasElement | null | undefined;

  public componentDidMount(): void {
    const $chart = this.chartEl;
    const { type, plot, text } = this.props;
    const overridden = this.override(this.props);
    const data = this.deriveData(plot, text);

    if ($chart) {
      this.chart = new Chart($chart, {
        type,
        data,
        options: overridden,
      });
    }
  }

  public componentDidUpdate(): void {
    this.update();
  }

  private deriveData(plot: Plot, text: ChartText) {
    const xval = plot.x.map((item) => item.toString());
    const yval = plot.y;

    return toModel(xval, yval, text.legend);
  }

  private override({ text, formatter }: Props): ChartOptions {
    return {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: text.title,
      },
      tooltips: {
        callbacks: text.tooltips,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: formatter.y,
            },
          },
        ],
        xAxes: [
          {
            ticks: { callback: formatter.x || identity },
          },
        ],
      },
    };
  }

  public render() {
    return (
      <canvas style={{ height: '100%' }} ref={(e) => (this.chartEl = e)} />
    );
  }
}
