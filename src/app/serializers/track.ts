import { Track } from "../models/track";

interface TrackSerializer {
  date: string;
  tripState: number;
  roadType: string;
  gasType: string;
  amountFilled: number;
}

const show = (track: Track): TrackSerializer => {
  return {
    date: track.date,
    tripState: track.tripState,
    roadType: track.roadType,
    gasType: track.gasType,
    amountFilled: track.amountFilled
  };
};

const index = (tracks: Array<Track>): Array<TrackSerializer> => {
  return tracks.map(track => show(track));
};

export default {
  show,
  index
};