module.exports = {
  formatQuery: queryObj => {
    let returnError = false;
    const queryParams = [];

    const details = queryObj.details.map(e => {
      const key = e[0];
      const value = typeof e[1] === 'object' ? [...e[1]] : e[1];
      return { [key]: value }
    })

    // const ammenities = queryObj.ammenities.map(e => {
    //   const key = e[0];
    //   const value = typeof e[1] === 'object' ? [...e[1]] : e[1];
    //   return { [key]: value }
    // })


    // COUNTRY
    queryParams.push("country:US");

    // CITY
    if (details[0].citiesSelected) {
      queryParams.push(details[0].citiesSelected.length > 1 ?
        `city:(${[...details[0].citiesSelected].join(' OR ')})`
        :
        `city:${details[0].citiesSelected}`);
    } else returnError = true;

    // STATUS
    if (details[0].forRent && details[0].forSale) {
      queryParams.push(`status.type:(${details[0].forRent} OR ${details[0].forSale})`);
    } else if (details[0].forRent) {
      queryParams.push(`status.type:(${details[0].forRent})`);
    } else if (details[0].forSale) {
      queryParams.push(`status.type:(${details[0].forRent})`);
    } else returnError = true;

    return queryParams.join(' AND ');
  }
}


// const testQuery = {
//   ammenities: [
//     ["bedsMinIndex", 2],
//     ["bedsMin", "2"],
//     ["bedsMaxIndex", 4],
//     ["baths", "1.25"],
//     ["sqftMinIndex", 3],
//     ["sqftMin", "800"],
//     ["sqftMaxIndex", 6],
//     ["lotSizeMinIndex", 1],
//     ["lotSizeMin", "4,000 sq ft"],
//     ["lotSizeMaxIndex", 5],
//     ["parkingSpaces", "1"],
//     ["pets", true],
//     ["fees", "100"],
//     ["bedsMax", "4"],
//     ["sqftMax", "1,250"],
//     ["lotSizeMax", ".5 acres"]],
//   details: [
//     // ["citiesSelected", ["Antonito", "Alma"]], 
//     // ["forSale", true],
//     // ["forRent", true],
//     ["singleFamily", true],
//     ["condoOrTownhome", true],
//     ["apartment", true],
//     ["newBuild", true],
//     ["commercialOrInvestment", true],
//     ["vacationOrOther", true],
//     ["minPrice", "50,000"],
//     ["maxPriceIndex", 5],
//     ["maxPrice", "175,000"],
//     ["dateListed", "week"],
//     ["locationSet", true],
//     ["statusSet", true],
//     ["typeSet", true],
//     ["priceRangeSet", true],
//     ["land", true]
//   ]
// }