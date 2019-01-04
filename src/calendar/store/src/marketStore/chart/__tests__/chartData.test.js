/*
import source from '../source';
import { chooseClosePrice, sliceAndSortList, minAndMaxOfList, nextTimeUpdateDelay } from '../utils';

it ( `can parse source data to target format correctly`, () => {
  const sortedList = sliceAndSortList ( source );
  // if list length not equals 96, then it's not enough to draw a chart
  expect ( sortedList.length ).toBe ( 96 );

  // every close price should not be empty(null, undefined, 0....)
  const result = (() => {
    const filteredList = chooseClosePrice ( sortedList );
    for ( let i = 0; i < filteredList.length; i++ ) {
      if ( !filteredList[ i ] )return false;
    }
    return true;
  }) ();
  expect ( result ).toBe ( true );
} );

it ( `get next update delay correctly`, () => {
  const nextMoment = nextTimeUpdateDelay ();
  expect ( nextMoment >= 0 && nextMoment <= 900000 ).toBe ( true );
} );
*/
