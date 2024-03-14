import { Router } from "express";
import * as controller from "../controller/controllers.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

/** POST Methods */

router.route("/admin").post(controller.createVendor); // upload ventors details in the app
router.route("/ventor").post(controller.ventorLogIn); // ventors login route

/** GET Methods */
router.route("/ventors/:id").get(authenticateToken, controller.getVentors); // retrieveupload ventors details in the app
router.route("/ventors").get(controller.getAllVentors); // retrieveupload ventors details in the app

/** PUT Methods */
router.route("/ventors/:id").put(controller.editVendor); // edit data entries

/** DELETE Methods */
router.route("/ventors/:id").delete(controller.deleteVendor); // delete data entries

// mailer route
router.route("/mailer").post(controller.sendMassMail);

router.route("/appointment").post(controller.createAppointment);
router.route("/appointment").put(controller.updateAppointment);
router.route("/getAppointments").post(controller.getAppointments);
router.route("/deleteAppointment").post(controller.deleteAppointment);
router.route("/updateAppointee").put(controller.updateAppointee);

router.route("/student:id").get(controller.getStudent);

export default router;
