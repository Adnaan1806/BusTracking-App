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

      const currentStop = route.stops[bus.latestStop];
      const stoppingPoint = (bus.latestStop + 1) % route.stops.length;
      const nextStop = route.stops[stoppingPoint];

      
      const progress = Math.random() * 0.3 + 0.3; //calculations to keep the location changing by small degree
      const latestLat = currentStop.lat + (nextStop.lat - currentStop.lat) * progress;
      const latestLng = currentStop.lng + (nextStop.lng - currentStop.lng) * progress;

     
      const distanceToNextStop = Math.abs(latestLat - nextStop.lat) + Math.abs(latestLng - nextStop.lng);
      const reachedNextStop = distanceToNextStop < 0.01;

      if (reachedNextStop) {
        bus.latestStop = stoppingPoint;
      }

      bus.currentLat = latestLat;
      bus.currentLng = latestLng;
      bus.lastUpdated = new Date();
      await bus.save();

      
      await Location.create({
        busId: trip.busId,
        tripId: trip._id,
        latitude: latestLat,
        longitude: latestLng,
        date: new Date(),
      });

    }

    console.log("Updating Bus locations...");
  } catch (err) {
    console.error("Error updating bus locations:", err);
  }
};

export default BusLiveMovement;
