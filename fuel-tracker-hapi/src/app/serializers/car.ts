import { Car } from "../models/car";

interface CarSerializer {
  id: number;
  name: string;
  tankSize: number;
  currentFuelLevel: number;
  tripState: number;
  fuelPercent: number;
}

const show = (car: Car): CarSerializer => {
  return {
    id: car.id,
    name: car.name,
    tankSize: car.tankSize,
    currentFuelLevel: car.currentFuelLevel,
    tripState: car.tripState,
    fuelPercent: car.fuelPercent
  };
};

const index = (cars: Array<Car>): Array<CarSerializer> => {
  return cars.map(car => show(car));
};

export default {
  show,
  index
};