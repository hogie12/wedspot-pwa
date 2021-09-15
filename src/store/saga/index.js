import { all } from "@redux-saga/core/effects";
import { watchLogin, watchRegister, watchGetVendor, watcheditVendor } from "./auth";
import { watchAllQuotations, watchQuotationsById, watchPostQuotation } from "./quotations";
import { watchAllPackage, watchPackageById, watchCreatePackage, watchEditPackage, watchDeletePackage } from "./package";
import {watchGetVenue, watchGetLocation, watchGetOrganizer} from './config'

export default function* rootSaga() {
  // function generator
  yield all([
    watchLogin(),
    watchRegister(),
    watchGetVendor(),
    watchAllQuotations(),
    watchQuotationsById(),
    watchAllPackage(),
    watchPackageById(),
    watchPostQuotation(),
    watchCreatePackage(),
    watchEditPackage(),
    watcheditVendor(),
    watchGetOrganizer(),
    watchGetLocation(),
    watchGetVenue(),
    watchDeletePackage(),
  ]);
}
