const moment = require('moment');
const propertyTypes = require('./propertyTypes');

module.exports = self = {

  destructureProperties: function (obj) {
    const { state, allStatuses, allTypes } = obj;
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
      resolve({ details, ammenities, state, allStatuses, allTypes })
    });
  },




  formatQuery: async query => {
    let queryObj = await self.destructureProperties(query)
    const { details, ammenities } = queryObj;

    const queryParams = [];

    // COUNTRY AND STATE
    queryParams.push("country:US");
    queryParams.push(`province:${queryObj.state}`)


    // CITY
    if (details.citiesSelected && details.citiesSelected.length) {
      if (details.citiesSelected.length > 1) {
        queryParams.push(`city:(${[...details.citiesSelected].join(' OR ')})`)
      } else {
        queryParams.push(`city:${details.citiesSelected}`)
      }
    }


    // STATUS
    let status = ''
    if (details.forRent && details.forSale || queryObj.allStatuses) {
      status = `statuses.type:(\"For Sale\" OR \"Short Term Rental\" OR Rental OR \"Rent To Own\")`;
    } else if (details.forRent) {
      status = `statuses.type:(\"Short Term Rental\" OR Rental OR \"Rent To Own\")`;
    } else if (details.forSale) {
      status = `statuses.type:(\"For Sale\" OR \"Rent To Own\")`;
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
    const selectedTypes = [];

    if (queryObj.allTypes) {
      queryParams.push(`propertyType:*`);

    } else {
      if (details.singleFamily) propertyTypes.singleFamVals.forEach(e => selectedTypes.push(e));
      if (details.condoOrTownhome) propertyTypes.condoVals.forEach(e => selectedTypes.push(e));
      if (details.apartment) propertyTypes.aptVals.forEach(e => selectedTypes.push(e));
      if (details.newBuild) propertyTypes.newVals.forEach(e => selectedTypes.push(e));
      if (details.commercialOrInvestment) propertyTypes.rentalVals.forEach(e => selectedTypes.push(e));
      if (details.land) propertyTypes.landVals.forEach(e => selectedTypes.push(e));
      if (details.vacationOrOther) propertyTypes.otherVals.forEach(e => selectedTypes.push(e));

      queryParams.push(`propertyType:(${selectedTypes.join(' OR ')})`);
    }



    // PRICE
    const minPrice = details.minPrice ? formatPrice(details.minPrice) : null;
    const maxPrice = details.maxPrice ? formatPrice(details.maxPrice) : null;

    function formatPrice(str) {
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


    return queryParams.join(' AND ');
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



// country:US AND 
// province:CO AND 
// statuses.type:("For Sale" OR "Short Term Rental" OR Rental OR "Rent To Own") AND 
// propertyType:(House OR Home OR "Single Family Dwelling" OR Residential OR Condo OR Townhouse OR Apartment OR Apartments OR Dorm OR Hostel* OR Motels OR "Rental Unit" OR Room OR Unit OR "Manufactured Home" OR "Mobile Home" OR "Apartment Building" OR "Bed Breakfast" OR Building OR Commercial* OR "Condo Building" OR Duplex OR Industrial OR Inns OR "Multi-Family Dwelling" OR Quadruplex OR "Rental Unit Building" OR Triplex OR Land OR Farm OR Island OR Boat* OR Bungalow OR Cabin OR Camper/RV OR Campgrounds OR Castle OR Cave OR Cottages OR "Development Site" OR Igloo OR Lodges OR Nature Lodge OR Resorts OR Tent OR Tipi OR Vacation Rental OR Villa*) AND 
// prices:*