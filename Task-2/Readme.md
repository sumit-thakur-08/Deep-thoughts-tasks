# *Nudge Creation API Documentation*

## *Table 1: API Structure*

| *Widget* | *Request Type* | *Base URL*        | *API Endpoint*                    | *Payload*                                                                                                  | *Description*                                        |
|------------|------------------|---------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| Nudge      | GET              | /api/v1/nudge     | /nudges?id=:nudge_id              | -                                                                                                            | Retrieves a nudge by its unique ID.                    |
| Nudge      | GET              | /api/v1/nudge     | /nudges?type=latest&limit=5&page=1| -                                                                                                            | Retrieves the latest nudges with pagination.           |
| Nudge      | POST             | /api/v1/nudge     | /nudges                           | type, title, image_url, scheduled_date, timing, description, invitation_text, icon_url                      | Creates a new nudge and returns its ID.                |
| Nudge      | PUT              | /api/v1/nudge     | /nudges/:id                       | Same as POST payload                                                                                         | Updates an existing nudge by its unique ID.            |
| Nudge      | DELETE           | /api/v1/nudge     | /nudges/:id                       | -                                                                                                            | Deletes a nudge based on its unique ID.                |

---

## *Object Data Model of a Nudge*

```json
{
  "type": "string",              // Type of nudge (e.g., event, article)
  "id": "integer",               // Unique ID of the nudge
  "title": "string",             // Title of the nudge (60 characters max)
  "image_url": "string",         // URL of the image
  "scheduled_date": "string",    // Date and time (format: dd/mm/yyyy)
  "timing": "string",            // Timing (format: hh:mm-hh:mm)
  "description": "string",       // Description of the nudge
  "invitation_text": "string",   // One-line invitation text
  "icon_url": "string",          // URL of the icon
  "status": "string"             // Status of the nudge (e.g., active, inactive)
}