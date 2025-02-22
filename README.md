[Live:](https://joseph1997-eng.github.io/LoveCollectorGame/)

# LoveCollectorGame – Save Queen Barbie

**LoveCollectorGame** is a responsive web game where you rescue Queen Barbie from captivity by collecting falling hearts and avoiding harmful items. The game is designed with HTML, CSS, and JavaScript and features smooth animations, interactive gameplay, and mobile-friendly controls.

---

## Table of Contents

- [Overview](#overview)
- [Gameplay](#gameplay)
- [Features](#features)
- [Installation & Usage](#installation--usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Customization](#customization)
- [License](#license)

---

## Overview

In LoveCollectorGame, the player takes on the role of a brave hero tasked with saving Queen Barbie, who has been captured during a war. By maneuvering the character using drag-and-drop controls, you must collect falling hearts to fill a progress bar and restore hope, all while avoiding bombs and other harmful items that reduce your lives.

---

## Gameplay

- **Objective:** Rescue Queen Barbie by collecting falling hearts and filling the collection bar.
- **Controls:**  
  - **Desktop:** Click and drag the player to move them horizontally across the canvas.  
  - **Mobile:** Touch and drag the player to control movement.
- **Mechanics:**  
  - Collect hearts to gain points and fill the progress bar.
  - Avoid bombs and broken hearts, which reduce your lives.
  - You have 5 lives, and the game ends when your lives run out or the progress bar is completely filled.
- **Victory:** When the progress bar is filled, the game displays a victory scene with celebratory animations.

---

## Features

- **Responsive Design:** The game adapts to various screen sizes (desktop and mobile).
- **Smooth Animations:** Includes preloader animations, falling object animations, and celebratory effects using JSConfetti.
- **Interactive UI:** A story section with a typewriter effect introduces the plot, along with a Swiper slider for additional visuals.
- **Mobile-Friendly Controls:** Drag-and-drop functionality for player movement on both touch and mouse devices.

---

## Installation & Usage

1. **Download/Clone the Repository:**  
   Clone the repository to your local machine or download the ZIP file.
   
2. **Open the Game:**  
   Open the `index.html` file in your preferred web browser.
   
3. **Start Playing:**  
   Follow the on-screen instructions to begin the game. The preloader will display a loading screen, then the game scene will appear where you can start your mission to save Queen Barbie.

---

## Project Structure

```
LoveCollectorGame/
├── index.html      # Main HTML file with game structure and UI
├── scripts.js      # JavaScript file containing game logic, player controls, and animations
├── styles.css      # CSS file for styling and ensuring responsiveness
├── assets/         # (Optional) Directory for images, audio, and other media assets
└── README.md       # This readme file
```

---

## Dependencies

- **Google Fonts:** Fonts such as "Kufam", "Share Tech Mono", and "Bigshot One" are used for the game’s typography.
- **Swiper:** For creating image sliders in the story section.
- **AOS (Animate On Scroll):** For scroll-based animations.
- **JSConfetti:** For the celebratory confetti effects upon victory.
- **External Assets:**  
  - Images (e.g., castle, queen, victory, captive scenes)  
  - Audio (background music and sound effects)  
  These are referenced via URLs within the HTML and JavaScript files.

---

## Customization

- **Game Logic:** Modify `scripts.js` to adjust gameplay mechanics such as falling object speeds, collision detection, or scoring.
- **Styling:** Use `styles.css` to change the look and feel of the game, including colors, fonts, and layout.
- **Assets:** Replace or update the images and audio files by updating the source URLs in the HTML and JS files.
- **Responsive Behavior:** The canvas size and element positions adjust dynamically; you can further fine-tune this in `scripts.js` and `styles.css`.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Feel free to update this README with any additional details specific to your project. Enjoy developing and playing LoveCollectorGame – may you succeed in saving Queen Barbie!
