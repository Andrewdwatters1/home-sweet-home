const moment = require('moment');
const propertyTypes = require('./propertyTypes');

module.exports = self = {

  destructureProperties: function (obj) {
    return new Promise(resolve => {
      const details = {};
      if (obj.details) {
        for (let i = 0; i < obj.details.length; i++) {
          details[obj.details[i][0]] = obj.details[i][1];
        }
      }
      const ammenities = {};
      if (obj.ammenities) {
        for (let i = 0; i < obj.ammenities.length; i++) {
          ammenities[obj.ammenities[i][0]] = obj.ammenities[i][1];
        }
      }
      resolve({ details, ammenities })
    });
  },

  formatQuery: async query => {
    let queryObj = await self.destructureProperties(query)
    const { details, ammenities } = queryObj;
    let returnError = false;
    const queryParams = [];
    // console.log(this);
    // console.log(destructureProperties);

    console.log(queryObj);

    // COUNTRY
    queryParams.push("country:US");


    // CITY
    if (details.citiesSelected) {
      queryParams.push(details.citiesSelected.length > 1 ?
        `city:(${[...details.citiesSelected].join(' OR ')})`
        :
        `city:${details.citiesSelected}`);
    } else returnError = true;


    // STATUS
    let status = ''
    if (details.forRent && details.forSale) {
      status = `statuses.type:(\"For Sale\" OR \"Short Term Rental\" OR Rental OR \"Rent To Own\")`;
    } else if (details.forRent) {
      status = `statuses.type:(\"Short Term Rental\" OR Rental OR \"Rent To Own\")`;
    } else if (details.forSale) {
      status = `statuses.type:(\"For Sale\" OR \"Rent To Own\")`;
    } else {
      returnError = true;
    }
    queryParams.push(status);


    // DATE ADDED
    if (details.dateListed === "today") {
      const now = new moment();
      queryParams.push(`dateAdded:[${now.subtract(1, 'day').format("YYYY-MM-DD")} TO *]`)
    } else if (details.dateListed === "week") {
      const now = new moment();
      queryParams.push(`dateAdded:[${now.subtract(7, 'days').format("YYYY-MM-DD")} TO *]`)
    } else if (details.dateListed === "month") {
      const now = new moment();
      queryParams.push(`dateAdded:[${now.subtract(30, 'days').format("YYYY-MM-DD")} TO *]`)
    }


    // TYPE
    const allTypes = [];
    if (details.singleFamily) propertyTypes.singleFamVals.forEach(e => allTypes.push(e));
    if (details.condoOrTownhome) propertyTypes.condoVals.forEach(e => allTypes.push(e));
    if (details.apartment) propertyTypes.aptVals.forEach(e => allTypes.push(e));
    if (details.newBuild) propertyTypes.newVals.forEach(e => allTypes.push(e));
    if (details.commercialOrInvestment) propertyTypes.rentalVals.forEach(e => allTypes.push(e));
    if (details.land) propertyTypes.landVals.forEach(e => allTypes.push(e));
    if (details.vacationOrOther) propertyTypes.otherVals.forEach(e => allTypes.push(e));

    queryParams.push(`propertyType:(${allTypes.join(' OR ')})`);


    // PRICE
    const minPrice = details.minPrice ? makeNumber(details.minPrice) : null;
    const maxPrice = details.maxPrice ? makeNumber(details.maxPrice) : null;

    function makeNumber(str) {
      if (str[str.length - 1] === "+") {
        return 10000000;
      } else if (str[str.length - 1] === "M") {
        str = str.slice(0, str.length - 1)
        return (+str) * (1000000)
      } else {
        str = str.slice(0, str.length - 4);
        return (+str) * (1000);
      }

    }
    if (maxPrice && minPrice) {
      queryParams.push(`prices.amountMax:>${minPrice} AND prices.amountMax:<${maxPrice}`)
    } else if (maxPrice && !minPrice) {
      queryParams.push(`prices.amountMax:<${maxPrice}`)
    } else if (minPrice && !maxPrice) {
      queryParams.push(`prices.amountMax:>${minPrice}`)
    } else {
      queryParams.push("prices:*")
    }
    if (details.isAvailable) queryParams.push('statuses.isUnderContract:false');


    // BEDROOMS
    const formatBedsVal = str => str[str.length - 1] === "+" ? str.slice(0, str.length - 1) : str;

    if (ammenities.bedsMin) {
      if (ammenities.bedsMin !== "Studio") {
        queryParams.push(`numBedroom:>=${formatBedsVal(ammenities.bedsMin)}`);
      }
    }
    if (ammenities.bedsMax) {
      if (ammenities.bedsMin !== "Studio") {
        queryParams.push(`numBedroom:<=${formatBedsVal(ammenities.bedsMax)}`);
      }
    }


    // BATHROOMS
    if (ammenities.baths) {
      queryParams.push(`numBathroom:>=${ammenities.baths}`);
    }


    // SQUARE FEET
    if (ammenities.sqftMin) {
      queryParams.push(`floorSizeValue:>=${formatSqftVal(ammenities.sqftMin)}`);
      queryParams.push('floorSizeUnit:\"Sq. ft\"');
    }
    if (ammenities.sqftMax) {
      queryParams.push(`floorSizeValue:<=${formatSqftVal(ammenities.sqftMax)}`);
      queryParams.push('floorSizeUnit:\"Sq. ft\"');
    }

    function formatSqftVal(str) {
      if (str[str.length - 1] === "+") str = str.slice(0, str.length - 1);
      if (Number.isNaN(+str)) {
        let strArr = str.split('');
        strArr.splice(1, 1);
        return +strArr.join('');
      }
      else return +str
    }


    // PARKING 
    if (ammenities.parking) {
      queryParams.push("parking:*");
    }


    // FEES 
    if (ammenities.fees) {
      queryParams.push(`fees.amountMax:>${(+ammenities.fees) - .1}`);
    }







    // KEYWORDS 
    // features.key
    // brokers.agent
    // brokers.company 
    // listingName
    // nearbySchools.name
    // neighborhoods
    // reviews.text
    // descriptions.value


    // FINAL ERROR CHECK AND RETURN
    if (returnError) return "Error, query not contructed properly"
    else return queryParams.join(' AND ');
  }
}


// ------ GOOD QUERY ---------- // 
// country:US AND 
// city:Denver AND 
// statuses.type:("For Sale" OR "Rent To Own") AND 
// dateAdded:[2018-10-28 TO *] AND 
// propertyType:(House OR Home OR "Single Family Dwelling" OR Residential) AND 
// prices.amountMax:>125000 AND 
// prices.amountMax:<425000 AND 
// statuses.isUnderContract:false AND 
// numBathroom:>=1.25 AND 
// floorSizeValue:>=1000 AND 
// floorSizeUnit:"Sq. ft" AND 
// floorSizeValue:<=5000 AND 
// floorSizeUnit:"Sq. ft" AND 
// parking:* AND 
// fees.amountMax:>-1



//   ammenities: [
//     ["pets", true],
//     ["fees", "100"],
//     ["bedsMax", "4"],
//     ["sqftMax", "1,250"],
//     ["lotSizeMax", ".5 acres"]
//   ]
// }
// details = {
//   citiesSelected: ['Amherst'],
//   forSale: true,
//   singleFamily: true,
//   apartment: true,
//   newBuild: true,
//   minPriceIndex: 5,
//   minPrice: '175,000',
//   dateListed: 'week',
//   locationSet: true,
//   statusSet: true,
//   typeSet: true,
//   priceRangeSet: true
// }



// propertyTypes = {
//   singleFamVals: ['House', 'Home', 'Single Family Dwelling', 'Residential'],
//   condoVals: ['Condo', 'Townhouse'],
//   aptVals: ['Apartment', 'Apartments', 'Dorm', 'Hostel*', 'Motels', 'Rental Unit', 'Room', 'Unit'],
//   newVals: ['Manufactured Home', 'Mobile Home'],
//   rentalVals: ['Apartment Building', 'Bed Breakfast', 'Building', 'Commercial*', 'Condo Building', 'Duplex', 'Industrial', 'Inns', 'Multi-Family Dwelling', 'Quadruplex', 'Rental Unit Building', 'Triplex'],
//   landVals: ['Land', 'Farm', 'Island'],
//   otherVals: ['Boat', 'Boat Slip', 'Bungalow', 'Cabin', 'Camper/RV', 'Campgrounds', 'Castle', 'Cave', 'Cottages', 'Development Site', 'Igloo', 'Lodges', 'Nature Lodge', 'Resorts', 'Tent', 'Tipi', 'Vacation Rental', 'Villa*']
// }

// const prices = [ '50,000', '75,000', '100,000', '125,000', '150,000', '175,000', '200,000', '225,000', '250,000', '275,000', '300,000', '325,000', '350,000', '375,000', '400,000', '425,000', '450,000', '475,000', '500,000', '550,000', '600,000', '650,000', '700,000', '750,000', '800,000', '850,000', '900,000', '950,000', '1M', '1.25M', '1.5M', '1.75M', '2M', '2.25M', '2.5M', '2.75M', '3M', '3.5M', '4M', '4.5M', '5M', '6M', '7M', '8M', '9M', '10M+'];