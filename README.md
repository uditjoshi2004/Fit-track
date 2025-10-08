# Fit-Track: A Full-Stack Fitness Dashboard

Fit-Track is a modern, full-stack fitness dashboard application that syncs with the Google Fit API to provide users with a rich visualization of their personal health data.

*(Suggestion: Take a nice screenshot of your dashboard, upload it to a site like [Imgur](https://imgur.com/upload), and paste the link here)*
`![Fit-Track Dashboard](https://i.imgur.com/YOUR_IMAGE_URL_HERE.png)`

---
## ## Prerequisites

Before you begin, ensure you have the following installed on your system:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (v18 or later recommended)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* A **MongoDB** database (You can use a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud instance)

---
## ## Getting Started

Follow these steps to get your local development environment running.

### ### 1. Clone the Repository
```bash
git clone [https://github.com/uditjoshi2004/Fit-track.git](https://github.com/uditjoshi2004/Fit-track.git)
cd Fit-track
```

### ### 2. Backend Setup (`fit-track-api`)

First, set up and run the backend server.

1.  **Navigate to the backend folder:**
    ```bash
    cd fit-track-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:** Create a new file named `.env` in the `fit-track-api` directory and add the following, filling in your own secret keys.

    ```
    NODE_ENV=development
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

    # Google OAuth Credentials
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    # Nodemailer for password resets
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_gmail_app_password
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server should now be running on `http://localhost:3000`.

### ### 3. Frontend Setup (`fit-track`)

Open a **new, separate terminal** for the frontend.

1.  **Navigate to the frontend folder (from the root):**
    ```bash
    cd fit-track
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the environment:** Open the file `src/environments/environment.ts` and ensure the `GOOGLE_CLIENT_ID` matches the one you used in the backend's `.env` file.

4.  **Start the frontend server:**
    ```bash
    ng serve
    ```

### ### 4. Access the Application
Open your browser and navigate to **`http://localhost:4200`**. You should now be able to register and use the application.
