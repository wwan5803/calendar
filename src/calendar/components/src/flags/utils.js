import au_flag from "./au.jpg";
import ca_flag from "./ca.jpg";
import cn_flag from "./cn.jpg";
import eu_flag from "./eu.jpg";
import fr_flag from "./fr.jpg";
import ge_flag from "./ge.jpg";
import it_flag from "./it.jpg";
import jp_flag from "./jp.jpg";
import nz_flag from "./nz.jpg";
import sp_flag from "./sp.jpg";
import sw_flag from "./sw.jpg";
import uk_flag from "./uk.jpg";
import us_flag from "./us.jpg";

export function getFlagByCountryCode(countryCode) {
  switch (countryCode) {
    case "JP":
      return jp_flag;
    case "AU":
      return au_flag;
    case "GB":
      return uk_flag;
    case "CA":
      return ca_flag;
    case "DE":
      return ge_flag;
    case "IT":
      return it_flag;
    case "FR":
      return fr_flag;
    case "ERL":
      return eu_flag;
    case "NZ":
      return nz_flag;
    case "CN":
      return cn_flag;
    case "US":
      return us_flag;
    case "CH":
      return sw_flag;
    default:
      return;
  }
}
