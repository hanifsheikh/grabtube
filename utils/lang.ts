import { franc } from "franc";
const isArabic = (text:string) : boolean => {
  const languageCode = franc(text);
  if (languageCode === 'arb') {
    return true;
  } else {
    return false;
  }
}
export {isArabic}