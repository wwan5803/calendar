
// import source from '../sourceData';
// import {
//   getDataListFromSource,
//   reduceFiledFromSource,
//   sourceDateStringToTime,
//   sortDataByTime,
//   addStartTimeInUTCMSField,
//   groupDataListByDay,
//   groupDataListByCountry,
//   filterDataList,
// } from '../sourceDataParser';

// it ( `can get data list from source data`, () => {
//   expect ( Array.isArray ( getDataListFromSource ( (source) ) ) ).toBe ( true );
// } );

// it ( `can get reduced data list from source data`, () => {
//   expect ( Array.isArray ( reduceFiledFromSource ( (source) ) ) ).toBe ( true );
// } );

// it ( `can parse time string correctly`, () => {
//   expect ( sourceDateStringToTime ( '2017-07-11 01:30:00' ) ).toBe ( 1499736600000 );
// } );

// it ( `sort data by time correctly`, () => {
//   const result = (() => {
//     const list = sortDataByTime ( addStartTimeInUTCMSField ( reduceFiledFromSource ( (source) ) ) );
//     for ( let i = 0; i < list.length - 1; i++ ) {
//       if ( list[ i + 1 ].startTimeInUTCMS < list[ i ].startTimeInUTCMS )return false;
//     }
//     return true;
//   }) ();
//   expect ( result ).toBe ( true );
// } );

// const list         = sortDataByTime ( addStartTimeInUTCMSField ( reduceFiledFromSource ( (source) ) ) );
// const filteredList = filterDataList ( {
//   list,
//   start    : Date.UTC ( 2017, 3, 10 ),
//   end      : Date.UTC ( 2017, 3, 25 ),
//   timezone : 0
// } );

// console.log ( groupDataListByDay ( filteredList ).map ( listByDate => groupDataListByCountry ( listByDate ) ) );

