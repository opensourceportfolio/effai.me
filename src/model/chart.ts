// @flow
export interface ChartSize {
  width: number,
  height: number,
};

export interface Dataset {
  label: string,
  data: number[],
};

export interface Data {
  labels: string[],
  datasets: Dataset[],
};

export interface TooltipItem {
  // X Value of the tooltip as a string
  xLabel: string,

  // Y value of the tooltip as a string
  yLabel: string,

  // Index of the dataset the item comes from
  datasetIndex: number,

  // Index of this data item in the dataset
  index: number,

  // X position of matching point
  x: number,

  // Y position of matching point
  y: number,
};

export type TooltipItems = TooltipItem[];
