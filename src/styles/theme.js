// Import necessary dependencies
import { extendTheme } from "@chakra-ui/react";
// import {getThemeFromLocalStorage} from "../utility/utility"
// const themeValue = getThemeFromLocalStorage()

const theme = extendTheme({
  config: {
    initialColorMode: undefined,
    useSystemColorMode: false,
  }
});



export default theme;
