import { Track } from "../models/track";

interface TrackSerializer {
  id: number,
  date: string;
  tripState: number;
  roadType: string;
  gasType: string;
  amountFilled: number;
}

const show = (track: Track): TrackSerializer => {
  return {
    id: track.id,
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