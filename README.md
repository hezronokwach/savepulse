# SavePulse

SavePulse is a web and mobile application designed to enhance trust and transparency in the blood donation process. By keeping donors informed at every stage, SavePulse aims to boost donor confidence and encourage voluntary blood donations.

## Features

1. **User Registration**
   - Users can register voluntarily on the platform.
   - Each user is assigned a unique ID upon registration.

2. **Appointment Booking**
   - Donors can book appointments at their nearest donation satellite centers or regional blood banks.

3. **Donation Process**
   - At the donation point, an attendant enters the donor's unique ID to link the blood donation to the donor.
   - Donors receive a thank-you note after donating blood.

4. **Blood Status Tracking**
   - Donors can track the status of their donated blood through their dashboard:
     - **Screening:** Blood is undergoing screening.
     - **Discarded:** If the blood does not pass screening, the donor is notified and recommended to visit the nearest health center for further tests.
     - **Good:** If the blood passes screening, its status changes and the facility is updated from "Satellite" to "Regional."

5. **Hospital Requests and Notifications**
   - When a hospital requests blood from the regional blood bank, the system:
     - Matches the blood serial to the donor's unique ID.
     - Updates the facility status in the donor dashboard to "Hospital."
     - Notifies the donor with a thank-you message, acknowledging their role in saving a life.
   - The blood serial is then removed from the system.

6. **Admin Onboarding**
   - Hospitals, satellite centers, and regional blood banks are onboarded through the admin interface.

## Goals
- Build trust in the blood donation system.
- Provide transparency and traceability for donors.
- Encourage voluntary blood donation through effective communication and acknowledgment.

## Technologies
- **Frontend:** Built using Next.js for web platforms.
- **Backend:** Powered by the Gin framework for robust API development.
- **Database:** Securely stores donor information and blood serial tracking (for demo: SQLite).
- **Notifications:** Integration with SMS or email services for donor communication.

## Getting Started
### Prerequisites
- Install the required development tools (e.g., Node.js, npm, Android Studio for mobile testing).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/akothouma/SavePulse.git
   ```
2. Navigate to the project directory:
   ```bash
   cd SavePulse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
1. Start the Gin backend server:
   ```bash
   go run main.go
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. For mobile, use an emulator or connect a physical device to run the application:
   ```bash
   npm run android
   npm run ios
   ```

## Contributing
We welcome contributions to make SavePulse better! Please follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## License
This project is licensed under the MIT License. See the [LICENCE](LICENCE) file for details.

## Contact
For questions or support, please contact us at support@savepulse.org.

