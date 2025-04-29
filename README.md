# Piano Heartbeat Blossom 🎹🌸💖

**A web sanctuary for autistic children and families, blending practical support with a unique, calming sensory experience.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <!-- Optional: Choose a license -->
<!-- Add other badges if desired (e.g., build status, deployed link) -->

This project was created solo for the [Name of Hackathon, e.g., LAHacks 2024] hackathon. It represents a fusion of personal passion, technical exploration, and a deep commitment to supporting the autism community.

---

## 🌱 About the Project

Piano Heartbeat Blossom aims to be a comprehensive, empathetic, and accessible web platform designed to support autistic children and their families. It combines practical organizational tools and resources ("Blossom") with a unique, interactive sensory module focused on sound and visual harmony ("Piano Heartbeat").

The platform seeks to provide:

*   **A Centralized Hub:** Bringing together progress tracking, learning resources, community connections, and help access in one intuitive interface.
*   **A Calming Sensory Outlet:** Offering a beautiful, non-demanding space for sensory exploration, emotional expression, and finding moments of peace through interactive sound and generative visuals.
*   **An Empathetic Approach:** Designing features and interactions with neurodiversity and sensory sensitivities at the forefront.

## ✨ Key Features (Hackathon Scope)

*   **Blossom Dashboard Concept:** ✅ Visual layout for tracking progress, viewing events, and seeing tips (UI prototype).
*   **Core Navigation Structure:** ✅ Sidebar navigation linking to planned sections (Home, Help, Learning, Community, Piano Heartbeat, Settings).
*   **Piano Heartbeat Sensory Module:** ✅ Interactive visual generation (using p5.js) triggered by user clicks/taps.
    *   ✅ Custom piano sound playback synchronized with visuals (using Web Audio API).
    *   ✅ Basic implementation of selectable sound/visual environments.
*   **AI-Powered Sensory Story Snippets:** ✅ Integration with Groq API to generate short, imaginative text snippets based on user interaction patterns in Piano Heartbeat.
*   **Responsive Design Foundation:** ✅ Basic structure adapts to different screen sizes.

*(Note: Features like full Learning Center content, Community forums, advanced Piano Heartbeat features (MIDI, recording, collaboration, detailed Emotional Resonance Mapping), and comprehensive Help Center functionality are part of the future vision beyond the initial hackathon prototype.)*

## 💻 Technology Stack

*   **Frontend Framework:** Next.js 15 (with React)
*   **Visual Generation:** p5.js
*   **Audio Engine:** Web Audio API
*   **AI Integration:** Groq API
*   **Styling:** CSS Modules / Tailwind CSS / [Specify your choice]
*   **Languages:** TypeScript / JavaScript [Specify your choice], HTML, CSS

##💖 Inspiration

This project stems from a personal intersection:

*   **15 Years of Piano:** Music as a lifelong sanctuary and language.
*   **Living with ADHD:** Understanding sensory needs, focus challenges, and the importance of calming digital environments.
*   **Co-founding Crystar:** A student-run non-profit dedicated to supporting autistic children, providing firsthand insight into the needs of the community.

Piano Heartbeat Blossom is an attempt to channel these experiences into a tool that offers both practical help and moments of genuine beauty and understanding.

## 🚀 Getting Started

To run this project locally:

1.  **Prerequisites:**
    *   Node.js (Version [e.g., 18.x or later])
    *   npm or yarn

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/[Your-GitHub-Username]/piano-heartbeat-blossom.git
    cd piano-heartbeat-blossom
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Set up environment variables:**
    *   Create a file named `.env.local` in the root directory.
    *   Add the necessary environment variables. You will definitely need:
        ```
        GROQ_API_KEY=your_groq_api_key_here
        # Add any other required environment variables here
        ```
    *   **Important:** Make sure `.env.local` is listed in your `.gitignore` file to avoid committing secrets.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎮 Usage

*   Navigate through the different sections using the left sidebar.
*   Explore the "Piano Heartbeat" module by clicking or tapping within the main interactive area to generate sound and visuals.
*   If implemented, try selecting different "environments" to change the sound/visual theme.
*   Interact for a short period within Piano Heartbeat to potentially trigger the AI "Sensory Story Snippets" (requires valid Groq API key).

Check out the deployed demo here: [Link to your Vercel or other deployment, e.g., https://v0-blossom-web-design.vercel.app/]

## 🔮 Future Plans

*   Fully implement all core "Blossom" features (Learning, Community, Help).
*   Enhance "Piano Heartbeat" with MIDI input, recording, collaboration, and more environments.
*   Refine AI features and explore "Emotional Resonance Mapping".
*   Conduct thorough user testing with the target audience.
*   Perform a full accessibility audit and implement improvements.
*   Explore integration with Crystar's initiatives.

## 🤝 Contributing

This project was initially developed solo for a hackathon. While contributions are not actively solicited at this moment, feel free to open an Issue if you have suggestions or find bugs. Future collaboration opportunities may arise as the project evolves.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details (or choose another license and update accordingly).

## ✨ Author

*   **[Your Name]** - [Your GitHub Profile Link]
*   Inspired by the mission of **Crystar**

---

Thank you for checking out Piano Heartbeat Blossom!
