import TimelineItem from "./TimelineItem";

type Country = {
  code: string;
  name: string;
  latest: {
    confirmed: number;
    deceased: number;
    lastUpdated: string | null;
  };
  timeline: TimelineItem[];
};

export default Country;
