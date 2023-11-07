

interface ParkingSpot {
  ownerFirstName: string,
  ownerLastName: string,
  spotID: string,
  longitude: number,
  latitude: number,
  street: string,
  city: string,
  state: string,
  zip: number,
  hourly: number,
  daily: number,
  distanceFromCurrentLocation: number,
  description: string,
  //timeWhenSpotIsAvailable: Array<Object>,
  //timeWhenSpotIsBooked: Array<string>, //should be object
  spotlightImage: string,
  images: Array<string>,
  reviews: Array<Object>
}

const mockParkingSpot: ParkingSpot = {
  spotID: '44bee3cc-d8d0-45cb-b7b4-db09a3f6eac8',
  longitude: 2.35993,
  latitude: -63.70153,
  ownerFirstName: 'RJ',
  ownerLastName: 'Witschger',
  street: '123 1st Street',
  city: 'Hoboken',
  state: 'New Jersey',
  zip: 08810,
  hourly: 12.50,
  daily: 22.40,
  distanceFromCurrentLocation: 0.2,
  description: 'description about this spot from the owner',
  spotlightImage: '',
  reviews: [],
  images: [],
  // ownerAvailability: {
  //   'datetimeobject' : {
  //       9:false,
  //       10:false,
  //       11:false
  //   }
  // },
  // timeWhenSpotIsBooked: [
  //   //will have to be a further discussion about this
  //   //Month,Day,Year,hour or full day for daily
  //   '09/11/2021/23', // sept 11, 2021 at 11pm
  //   '09/12/2021/day' // sept 12, 2021 daily parking
  //   //this should probably only return the current week of bookings.
  //   //We will have to have another query we can make from the frontend for
  //   //when the user searches for a time later in the future. We can at that
  //   //point get the data for the specific date they searched.
  // ],
}


//owner 

const ownerAvailability = {
  days: ['monday', 'tuesday', 'wednesday'],
  hours: [
    {
      monday: [9,10,11,12,13,14,15,16,17],
      tuesday: [9,10,11,12,13,14,15,16,17],
      wednesday: [9,10,11,12,13],
    }
  ]
}
