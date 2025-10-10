import Bus from "../models/BusModel.js";
import Trip from "../models/TripModel.js";
import Location from "../models/LocationModel.js";

const BusLiveMovement = async () => {
  try {
    const trips = await Trip.find({ status: "enroute" })
      .populate("routeId");

    for (const trip of trips) {
      const route = trip.routeId;

      if (!route || !route.stops || route.stops.length === 0) continue;

      const bus = await Bus.findById(trip.busId);
      if (!bus) continue;

      const currentStop = route.stops[bus.currentStopIndex];
      const nextStopIndex = (bus.currentStopIndex + 1) % route.stops.length;
      const nextStop = route.stops[nextStopIndex];

      
      const progress = Math.random() * 0.3 + 0.3; //calculations to keep the location changing by small degree
      const newLat = currentStop.lat + (nextStop.lat - currentStop.lat) * progress;
      const newLng = currentStop.lng + (nextStop.lng - currentStop.lng) * progress;

     
      const distanceToNextStop = Math.abs(newLat - nextStop.lat) + Math.abs(newLng - nextStop.lng);
      const reachedNextStop = distanceToNextStop < 0.01;

      if (reachedNextStop) {
        bus.currentStopIndex = nextStopIndex;
      }

      bus.currentLat = newLat;
      bus.currentLng = newLng;
      bus.lastUpdated = new Date();
      await bus.save();

      
      await Location.create({
        busId: trip.busId,
        tripId: trip._id,
        latitude: newLat,
        longitude: newLng,
        date: new Date(),
      });

    }

    console.log("Updating Bus locations...");
  } catch (err) {
    console.error("Error updating bus locations:", err);
  }
};

export default BusLiveMovement;
