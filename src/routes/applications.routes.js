import express from "express";
import {
  deleteApplication,
  getAllApplications,
  updateApplication,
  updateStatus,
} from "../controllers/applications.controller.js"; //imported the function defined in the controllers

import {createApplication} from "../controllers/applications.controller.js";

const router = express.Router(); //created a router

router.get("/", getAllApplications); //get request to fetch the applications

router.post("/", createApplication); //create a new application

router.delete("/:id", deleteApplication); //delete an application

router.put("/:id", updateApplication); //update an application

router.patch("/:id/status", updateStatus); //updating status

export default router;
