import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import { destinationStyles } from '../styles';

import DestinationItem from '../components/Destination';

const destinations = [
  {
    title: 'New York',
    image: require('../images/new york/newyork.png'),
    uris: [
      require('../images/new york/broadway2.jpg'),
      require('../images/new york/timessquare2.jpg'),
      require('../images/new york/centralpark2.jpg')
    ],

    locations: [
      { name: 'Times Square', description: 'Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, New York, U.S. It is formed by the junction of Broadway, Seventh Avenue, and 42nd Street.', 
                latitude: 40.758896, longitude: -73.985130 },
      { name: 'Central Park', description: 'Its 843 acres include sweeping lawns, picturesque woodlands, meandering streams, and broad lakes, all experienced by moving through the Park along winding paths, a carriage drive, and a bridle path',
              latitude: 40.785091, longitude: -73.968285 },
      { name: 'Broadway', description: 'Broadway theatre, or Broadway, is a theatre genre that consists of the theatrical performances presented in 41 professional theaters, each with 500 or more seats, in the Theater District and Lincoln Center along Broadway, in Midtown Manhattan, New York City.',
              latitude: 40.790886, longitude: -73.974709 },
      ]
  },
  
 

    {
      title: 'Las Vegas',
      image: require('../images/las vegas/lasvegas.jpg'),
      uris: [
        require('../images/las vegas/theStrip2.jpg'),
        require('../images/las vegas/helicopterTour2.jpg'),
        require('../images/las vegas/grandCanyon2.jpg')
      ],      
      locations: [
        {name: 'The Strip', description: 'The Las Vegas Strip might just be the most renowned nightlife quarter in the USA. This 4-mile run of neon-lit resort hotels, malls and looping rollercoaster rides packs some serious punch when the sun dips low behind the red rock canyons of Nevada. Casinos are, obviously, the first port of call for most.',
                 latitude: 36.11470, longitude: -115.20146 },
        {name: 'Helicopter Ride', description: 'This ultimate flight over Las Vegas is a 12-15 minute experience offering stunning views above this iconic destination. Fly in a luxury Airbus helicopter featuring leather theater-style seating and wrap-around glass for enhanced visibilit',
                latitude: 36.11470 , longitude: -115.20146 },
        {name: 'Grand Canyon Tour', description: 'The tours travel to the South and West Rim of the canyon as well as the Hoover Dam and Zion National Park. All of the tour experiences travel in a well-equipped and comfortable fleet of tour buses or Sprinter vans',
                  latitude: 36.05659 , longitude: -112.12509 },
      ]
    },
    {
      title: 'Los Angeles',
      image: require('../images/Los Angeles/losangeles.jpg'),
      
      uris: [
        require('../images/Los Angeles/observatory2.jpg'),
        require('../images/Los Angeles/universal2.jpg'),
        require('../images/Los Angeles/hollywood2.jpg')
      ], 
      
      locations:[
        {name:'Griffith Observatory', description: 'Griffith Observatory is a unique hybrid of public observatory, planetarium, and exhibition space. It was constructed with funds from the bequest of Griffith J. Griffith (who donated the land for Griffith Park in 1896), who specified the purpose, features, and location of the building in his 1919 will.',
          latitude: 44.46044, longitude: -110.82828},
        {name:'Universal Studios Hollywood' , description: 'Universal Studios Hollywood™ , The Entertainment Capital of L.A.SM, includes a full-day, movie-based Theme Park and Studio Tour plus Universal CityWalk®, our entertainment, shopping and dining complex, which includes the Universal Cinema and the “5 Towers” state-of-the-art outdoor concert venue.',
          latitude: 44.71972, longitude: -110.48536},
        {name: 'Hollywood Sign' , description: 'The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood, Los Angeles, California. Originally the Hollywoodland Sign, it is situated on Mount Lee, in the Beachwood Canyon area of the Santa Monica Mountains.',
            latitude: 44.52496, longitude: -110.83829},
      ]
    },


    {
      title: 'Yellowstone',
      image: require('../images/yellowstone/yellowstone.jpg'),
      uris: [
        require('../images/yellowstone/oldFaithful2.jpg'),
        require('../images/yellowstone/yellowstoneCanyon2.jpg'),
        require('../images/yellowstone/prismaticSpring2.jpg')
      ], 
      locations:[
        {name:'Old Faithful', description: 'Old Faithful is a cone geyser in Yellowstone National Park in Wyoming, United States. It was named in 1870 during the Washburn–Langford–Doane Expedition and was the first geyser in the park to be named. It is a highly predictable geothermal feature and has erupted every 44 minutes to two hours since 2000',
          latitude: 44.46044, longitude: -110.82828},
        {name:'Grand Canyon of the Yellowstone' , description: 'The Grand Canyon of the Yellowstone is the first large canyon on the Yellowstone River downstream from Yellowstone Falls in Yellowstone National Park in Wyoming. The canyon is approximately 24 miles (39 km) long, between 800 and 1,200 ft (240 and 370 m) deep and from 0.25 to 0.75 mi (0.40 to 1.21 km) wide',
          latitude: 44.71972, longitude: -110.48536},
        {name: 'Grand Prismatic Spring' , description: 'Grand Prismatic Spring, located in Midway Geyser Basin, has the distinction of being the parks largest hot spring. It measures approximately 370 feet (112.8 m) in diameter and is over 121 feet (37 m) deep.',
            latitude: 44.52496, longitude: -110.83829},
      ]
    },
  ]

  const destinationsOverseas = [
    {
      title: 'London',
      image: require('../images/london/london.jpg'),
      uris: [
        require('../images/london/towerOfLondon2.jpg'),
        require('../images/london/theBritishMuseum2.jpg'),
        require('../images/london/theLondonEye2.jpg')
      ],      

      locations: [
        {name: 'Tower of London', description: 'The Tower of London is an internationally famous monument and one of Englands most iconic structures. William the Conqueror built the White Tower in 1066 as a demonstration of Norman power, siting it strategically on the River Thames to act as both fortress and gateway to the capital.', 
                  latitude: 51.508530, longitude: -.076132},
        {name : 'The British Museum', description: 'The first national public museum of the world. The British Museum is unique in bringing together under one roof the cultures of the world, spanning continents and oceans. No other museum is responsible for collections of the same depth and breadth, beauty and significance.', 
                  latitude: 51.518757, longitude: -.126168},
        {name : 'London Eye' , description: 'At 135m, The London Eye is the worlds largest cantilevered observation wheel. It was conceived and designed by Marks Barfield Architects and was launched in 2000. It has won over 85 awards for national and international tourism, outstanding architectural quality and engineering achievement.', 
                  latitude: 51.503399, longitude: -.119519},
      ]
    },

    {
      title: 'Fiji',
      image: require('../images/Fiji/fiji.jpg'),
      uris: [
        require('../images/Fiji/scubaBula2.jpg'),
        require('../images/Fiji/portDenarau2.jpg'),
        require('../images/Fiji/jetSki2.jpg')
      ],       
      locations:[
        {name: 'Scuba Bula Dive Centre', description: 'Offering 22 Dive Sites – all with moorings, so no anchoring on the reef! There is a wide variety of dive sites to enjoy, including, wall dives, swim-throughs, caves, and canyons.',
            latitude: -17.94544 , longitude: 177.25866},
        {name: 'Port Denarau Marina', description: 'Port Denarau Marina is also the epicentre of the booming yachting activity in Fiji. With 52 fully serviced berths, 16 swing moorings and 20 berths capable of taking Superyachts up to 85, Port Denarau Marina is the perfect stopover for rest, restock and play, during your ocean exploration of the Fijian Islands',
            latitude: -17.77250 , longitude: 177.38084},
        {name: 'Jet Ski Island Aventures Fiji', description: 'Jet Ski Island Adventures offer the most thrill-seeking tours around the Mamanuca Islands! Providing a range of different tours designed to suit everyones taste for adventure. Suitable for all ages, families, groups, couples and individuals. Explore the beautiful islands and zoom over the crystal clear waters of Fiji', 
             latitude: -17.77250, longitude: 177.38084},
      ]
    },
    {
      title: 'Abu Dhabi',
      image: require('../images/Abu Dhabi/abudhabi.jpg'),
      uris: [
        require('../images/Abu Dhabi/privateTour2.jpg'),
        require('../images/Abu Dhabi/aquarium2.jpg'),
        require('../images/Abu Dhabi/clymb2.jpg')
      ],  
      locations: [
        {name: 'Private Tour', description: 'Explore Abu Dhabis top sights on a guided tour of the city. Visit the Etihad Towers, learn about the government of the UAE at the Presidential Palace, and marvel at the beauty of the Sheikh Zayed Grand Mosque. Get picked up by your driver from your hotel or selected location in Abu Dhabi',
             latitude: 24.496437, longitude: 54.379612 },
        {name: 'The National Aquarium of Abu Dhabi', description: 'The National Aquarium Abu Dhabi is one of the largest aquariums in the Middle East and is home to 46,000 animals spread across 10 zones. The aquarium houses more than 200 sharks and rays, representing 25 different species. All of the animals are cared for by a team of 80 sea-life experts.',
                latitude: 24.40224 , longitude: 54.49540},
        {name: 'CLYMB Abu Dhabi', description: 'The worlds ultimate adventure hub that will revolutionize indoor skydiving and climbing. Housing the worlds biggest indoor skydiving flight chamber with a record breaking width of 32 feet and height of 104 feet, and the regions tallest indoor climbing wall, measuring a mountainous 138 feet in height',
              latitude: 24.48598 , longitude: 54.60677},
      ]
    },

    {
    title: 'Japan',
    image: require('../images/Japan/japan.jpg'),
    
    uris: [
      
      require('../images/Japan/kink2.jpg'),
      require('../images/Japan/shin2.jpg'),
      require('../images/Japan/doto2.jpg')
      
    ],
      
    locations: [
      {name: 'Kinkaku-ji Temple', description: 'Kinkakuji (金閣寺, Golden Pavilion) is a Zen temple in northern Kyoto whose top two floors are completely covered in gold leaf. Formally known as Rokuonji, the temple was the retirement villa of the shogun Ashikaga Yoshimitsu, and according to his will it became a Zen temple of the Rinzai sect after his death in 1408.',
           latitude: 24.496437, longitude: 54.379612 },
      {name: 'Shinjuku Gyoen National Garden', description: 'With 58.3 ha(144 acres) in size and a circumference of 3.5 km, Shinjuku Gyoen, the representative modern western-style garden in Meiji era, blends three distinct styles, Formal Garden, Landscape Garden and Japanese Traditional Garden, and is considered to be one of the most important gardens from the Meiji era.',
              latitude: 24.40224 , longitude: 54.49540},
      {name: 'Dotombori District', description: 'Dotonbori is the symbolic business and shopping district of Minami, Osaka, lined with giant three-dimensional signs of everything from the Shochikuza theater, the Kani-Doraku (crab restaurant), Glico, etc.',
            latitude: 24.48598 , longitude: 54.60677},
    ]
  },


  ]


const DestinationRecommendations = ({ navigation }) => {
  const navigateToDestinationDetails = (destination) => {
    navigation.navigate('Destination Info', { destination });
  };

  return (
    <ScrollView contentContainerStyle={destinationStyles.scrollView}>
      <View style={{ marginVertical: 5 }} />
      <View style={destinationStyles.destinationContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 22 }}>Domestic</Text>
        {destinations.map((destination, index) => (
          index % 2 === 0 && (
            <View key={destination.title} style={destinationStyles.destinationRow}>
              <DestinationItem destination={destination} onPress={navigateToDestinationDetails} />
              {destinations[index + 1] && (
                <DestinationItem destination={destinations[index + 1]} onPress={navigateToDestinationDetails} />
              )}
            </View>
          )
        ))}
      </View>
      <View style={destinationStyles.destinationContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Overseas</Text>
        {destinationsOverseas.map((destination, index) => (
          index % 2 === 0 && (
            <View key={destination.title} style={destinationStyles.destinationRow}>
              <DestinationItem destination={destination} onPress={navigateToDestinationDetails} />
              {destinationsOverseas[index + 1] && (
                <DestinationItem destination={destinationsOverseas[index + 1]} onPress={navigateToDestinationDetails} />
              )}
            </View>
          )
        ))}        

      </View>
    </ScrollView>
  );
};

export default DestinationRecommendations;
