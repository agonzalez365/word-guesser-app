export async function getWordDetails(word) {
  try {
    const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const response = await fetch(`${baseURL}${word}`);

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

//the api returns a lone object if it finds nothing, and an array of objects if it finds something
//from this we can tell if a valid word was entered by the user
export function validResponse(value) {
  if (Array.isArray(value)) {
    return true;
  }
  return false;
}
