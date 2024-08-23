import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getDB } from "../db/connectDB.js";
import { ObjectId } from "mongodb";

// method for create event --------
const createEvent = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image file uploaded' });
    }

    const filePath = `/public/uploads/${req.file.filename}`;
    // console.log('File Path:', filePath);

    const {
        uid,
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees,
    } = req.body;



    // Validate required fields
    if (!uid || !name || !schedule || !moderator || !category || !rigor_rank) {
        throw new ApiError(400, "All feilds are required")
    }


    try {
        const db = await getDB();

        const eventData = {
            type: 'event',
            uid: parseInt(uid), // Convert to integer if needed
            name,
            tagline,
            schedule: new Date(schedule), // Convert schedule to Date object
            description,
            files: { image: filePath }, // Store the image path
            moderator,
            category,
            sub_category,
            rigor_rank: parseInt(rigor_rank), // Convert rigor_rank to integer
            attendees: attendees ? attendees.split(',').map(Number) : [], // Convert attendees to array of integers
        };

        const result = await db.insertOne(eventData);
        // console.log("insert result::", result);

        if (!result || !result.insertedId) {
            throw new ApiError(400, "Something went wrong while inserting the data");
        }

        return res.status(200).json(new ApiResponse(200, result, "Event Created"));

    } catch (error) {
        throw new ApiError(400, "Failed to insert data , details :: ", error)
    }

});

// method for get Event ---
const getEvent = async (req, res ,next) => {

    // Get Id if available then get event and if not exists pass to next handler
    if(!(req.query && req.query.id)){
        next();
    }
    const eventId = req.query.id;

    if (!eventId) {
        res.status(404).json({ message: 'Event Id Missing'});
    };

    try {
        const db = await getDB();

        // Find event by its ID
        const event = await db.findOne(
            {
                _id: new ObjectId(eventId)
            }
        );

        if (!event) {
            res.status(404).json({ message: 'Event Not Found'});
        };

        // return response
        res.status(200).json({
            message: 'Event retrieved successfully',
            event,
        });

    } catch (error) {
        console.log("Details ::", error);
        res.status(500).json({ message: 'Failed To Fetch Event'});
    }
};

// method for update event ----
const updateEvent = asyncHandler(async (req, res) => {
    const eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) {
        throw new ApiError(400, "Invalid Id Format")
    }

    try {
        const db = await getDB();

        const event = await db.findOne({
            _id: new ObjectId(eventId)
        });

        if (!event) {
            throw new ApiError(404, "Event Not Found")
        }
        // console.log(event);

        const updateEvent = { ...req.body }; // fields for update
        console.log("updated Feilds: ", updateEvent);

        if (req.file) {
            const newFilePath = `/public/uploads/${req.file.filename}`;
            console.log("New Image Path:", newFilePath);
            updateEvent.image = newFilePath;  // Add new image path to update fields
        }

        // update the event in to databsase
        const result = await db.updateOne(
            { _id: new ObjectId(eventId) },
            { $set: updateEvent }
        )

        if (result.matchedCount === 0) {
            throw new ApiError(404, "Event not exists")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, result, "Event Updated")
            )
    } catch (error) {
        console.log("something wrong while updating the event Data", error);
        throw new ApiError(400, "Unable to update Event")
    }

});


// Paginates And Limits Method
const paginationLimitEvent = asyncHandler(async (req, res) => {
    const { limit=5, page=1 } = req.query;

    try {
        const db = await getDB();

        // calculate paginate parameter
        const limitNumber = parseInt(limit, 10);
        const skip = (parseInt(page, 10) - 1) * limitNumber;

        // Retreive events from the database sorted by recency
        const events = await db.find({}).sort({ schedule: -1 }).skip(skip).limit(limitNumber).toArray();

        // Get the total documents
        const totalDocuments = await db.countDocuments();

        const totalpages = Math.ceil(totalDocuments / limitNumber);

        // Create the response object
        const response = {
            events,
            pagination: {
                totalItems: totalDocuments,
                totalpages,
                currentPage: parseInt(page, 10),
                limit: limitNumber,
            },
        };

        // Send the response
        return res.status(200).json(new ApiResponse(200, response, "Events Retrieved Successfully"));

    } catch (error) {
        console.error("Error fetching events:", error);
        throw new ApiError(500, "Unable to retrieve events");
    }
})

// method for delete event
const deleteEvent = asyncHandler(async (req, res) => {
    const eventId = req.params;

    if (!ObjectId.isValid(eventId)) {
        throw new ApiError(400, "Invalid Event ID Format")
    }

    try {
        const db = await getDB();

        // Attempt to delete event
        const result = db.deleteOne({
            _id: new ObjectId(eventId)
        });

        // check event deleted or not
        if (result.deleteCount === 0) {
            throw new ApiError(404, "Event Not Found")
        }

        // send response
        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "Event Deleted Successfully ")
            )

    } catch (error) {
        console.log("Unable to delete event ", error);
        throw new ApiError(500, "Failed to delete event")
    }
});

export {
    createEvent,
    getEvent,
    deleteEvent,
    paginationLimitEvent,
    updateEvent
}