🌍 Geo Link Sender App

A simple and powerful web application that allows users to generate and share a geo-location tracking link. When the recipient opens the link and grants permission, their location details are captured and displayed.

🔗 Live Demo: https://geo-link-sender-app.vercel.app/

📦 GitHub Repo: https://github.com/Dastagiri3/Geo-Link-Sender-App.git

🚀 Features
📍 Generate unique geo-tracking links
🔗 Share links via WhatsApp, SMS, or any platform
📡 Capture user location (with permission)
🗺️ Display latitude and longitude
⚡ Lightweight and fast web app
🌐 Works on mobile and desktop browsers
🛠️ Tech Stack

Frontend:

HTML5
CSS3
JavaScript

APIs & Browser Features:

Geolocation API
URL parameters handling

Deployment:

Vercel
📂 Project Structure
Geo-Link-Sender-App/
│── index.html        # Main UI
│── style.css         # Styling
│── script.js         # Core logic
│── receiver.html     # Handles location capture
│── README.md         # Documentation
⚙️ How It Works
User opens the app
Clicks Generate Link
App creates a unique tracking URL
User shares the link with someone
When the receiver opens the link:
Browser asks for location permission
If allowed → location is captured
Coordinates are displayed or stored

👉 This works using the browser’s Geolocation API, which requires user consent before sharing location data

🧑‍💻 Installation & Setup
1. Clone the Repository
git clone https://github.com/Dastagiri3/Geo-Link-Sender-App.git
cd Geo-Link-Sender-App
2. Run Locally

Simply open index.html in your browser

OR use Live Server (recommended):

# VS Code Live Server extension
Right click → Open with Live Server
🌐 Deployment

You can deploy easily using:

Vercel (recommended)
Netlify
GitHub Pages
Deploy on Vercel:
npm install -g vercel
vercel
🔐 Privacy & Security
Location is only shared after user permission
No background tracking
No data stored without consent
Works purely on client-side (no backend required)


🚧 Future Improvements
📊 Store location history
🔐 Authentication system
📍 Map integration (Google Maps / Leaflet)
📡 Real-time tracking
☁️ Backend database (Firebase / MongoDB)
🤝 Contributing

Contributions are welcome!

Fork the repo
Create a new branch
Make changes
Submit a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Dastagiri Jillela

GitHub: https://github.com/Dastagiri3
⭐ Support

If you like this project, give it a ⭐ on GitHub!

💡 Tip (for your resume)

This is a great beginner-to-intermediate project demonstrating:

Real-world API usage
Frontend logic
User permission handling
Deployment skills
