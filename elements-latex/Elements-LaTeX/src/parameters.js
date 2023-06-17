const AUTOSAVE_INTERVAL = 5*60*1000; // 5 minutes

/* DEBUG */
const IS_DEVELOPEMENT_ENVIRONEMENT = process.env.NODE_ENV === "development";
const STARTUP_INSPECTOR = true && IS_DEVELOPEMENT_ENVIRONEMENT;

module.exports = { AUTOSAVE_INTERVAL, STARTUP_INSPECTOR, IS_DEVELOPEMENT_ENVIRONEMENT };