function size(list) {
  return list.constructor.name === "List" ? list.size : list.length;
}

function get(obj, attr) {
  return obj.get ? obj.get(attr) : obj[attr];
}

export default function customisedSuggestionsFilter(searchValue, suggestions, amount) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function(suggestion) {
    return !value || get(suggestion, "name").toLowerCase().indexOf(value) > -1;
  });
  var length =
    size(filteredSuggestions) < amount ? size(filteredSuggestions) : amount;
  return filteredSuggestions.slice(0, length);
}
