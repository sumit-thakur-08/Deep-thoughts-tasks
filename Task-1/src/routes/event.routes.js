import { Router } from "express";
import { createEvent, getEvent, deleteEvent, updateEvent, paginationLimitEvent } from "../controllers/event.controler.js";
import { upload } from "../middleware/multer.middleware.js"

const router = Router();

router.route("/events")
    .get(getEvent)
    .get(paginationLimitEvent)
    .post(upload.single('file'), createEvent);
router.route("/events/:id")
    .put(upload.single('file'), updateEvent)
    .delete(deleteEvent)


export default router;