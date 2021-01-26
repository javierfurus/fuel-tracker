import { database } from "../../lib/database"
import { Table } from "../../lib/table"

namespace TrackService {
  export const getLastTripState = () => {
    return database.select('tripState').from(Table.track).orderBy('id', 'desc').first();
  }
}

export {
  TrackService
}