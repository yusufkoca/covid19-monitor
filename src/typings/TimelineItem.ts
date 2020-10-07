type TimelineItem = {
  date: string;
  confirmed: number;
  deltaConfirmed: number | null;
  deceased: number;
  deltaDeceased: number | null;
  recovered: number;
  deltaRecovered: number | null;
};

export default TimelineItem;
