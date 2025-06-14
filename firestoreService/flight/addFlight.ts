import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { type FlightData } from "../types";

export function addFlight(
  tripId: string,
  flightDetails: Omit<FlightData, 'userId' | 'tripId' | 'createdAt' | 'updatedAt'> & {
    departureTime: Date | Timestamp;
    arrivalTime: Date | Timestamp;
  }
): Promise<string | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("Error adding flight: No user logged in.");
    return Promise.resolve(null);
  }

  const departureTimestamp = flightDetails.departureTime instanceof Date
    ? Timestamp.fromDate(flightDetails.departureTime)
    : flightDetails.departureTime;

  const arrivalTimestamp = flightDetails.arrivalTime instanceof Date
    ? Timestamp.fromDate(flightDetails.arrivalTime)
    : flightDetails.arrivalTime;

  const newFlightData: FlightData = {
    ...flightDetails,
    tripId: tripId,
    airline: flightDetails.airline,
    userId: currentUser.uid,
    flightCode: flightDetails.flightCode,
    departureTime: departureTimestamp,
    arrivalTime: arrivalTimestamp,
    isBooked: flightDetails.isBooked || false,
    cost: flightDetails.cost,
    departureLocation: flightDetails.departureLocation,
    arrivalLocation: flightDetails.arrivalLocation,
    stops: flightDetails.stops,
    bookingLink: flightDetails.bookingLink,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    // added for return flights
    isReturnFlight: flightDetails.isReturnFlight || false,
    returnFlightDetails: flightDetails.returnFlightDetails || undefined,
  };


  const flightsColRef = collection(db, "flights");

  return addDoc(flightsColRef, newFlightData)
    .then((docRef) => {
      console.log(`New flight added with ID: ${docRef.id}`);
      return docRef.id;
    })
    .catch((error) => {
      console.error(`Error adding flight for trip ID ${tripId}: `, error);
      return null;
    });
}