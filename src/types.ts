import dayjs, { Dayjs } from "dayjs";
export type Task = {
  name: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  color: string;
};
